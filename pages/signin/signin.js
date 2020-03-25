// pages/signin/signin.js
import Toast from '@vant/weapp/toast/toast';
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    checked: true,
    cur_year: 0,
    cur_month: 0,
    days: [],
    count: 0,
    sign: '',
    signUp: [],
    isbtn:false
  },
  onClickSign(){
    console.log('测试')
    if(app.globalData.isLogin){

      let openid=this.data.openid
      let date = util.formatTime(new Date())
      let url = app.globalData.URL +'/product/api/addSginIn'
      wx.request({
        url: url,
        method:'post',
        data:{
          openid:openid,
          date:date
        },
        success:res=>{
          if(res.data.code==-1){
            wx.showToast({
              title: '已经签到过了',
              icon:'none'
            })
          }else if(res.data.code==200){
            wx.showToast({
              title: '签到成功',
              icon:'succeed',

            })
          }else{
            wx.showToast({
              title: '好像出了差错 -----',
              icon:'none'
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '你还未登录',
        icon:'none'
      })
    }
  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  // 切换控制年月，上一个月，下一个月
  handleCalendar: function(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignInTime()
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignInTime()
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
    console.log(this.data.days)
  },
  // 获取当月共多少天
  getThisMonthDays: function(year, month) {
    return new Date(year, month, 0).getDate()
  },
  // 获取当月第一天星期几
  getFirstDayOfWeek: function(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays: function(year, month) {
    var that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var obj = {
        date: i,
        isSign: false
      }
      that.data.days.push(obj);
    }
    this.setData({
      days: that.data.days
    });
  },
  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids: function(year, month) {
    var that = this;
    //计算每个月时要清零
    that.setData({
      days: []
    });
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        var obj = {
          date: null,
          isSign: false
        }
        that.data.days.push(obj);
      }
      this.setData({
        days: that.data.days
      });
      //清空
    } else {
      this.setData({
        days: []
      });
    }
  },
  //匹配判断当月与当月哪些日子签到打卡
  onJudgeSign: function() {
    Toast.loading({
      mask: true,
      message: '加载中...'
    })
    let that = this;
    let signs = that.data.signUp;
    let daysArr = that.data.days;
    if (signs) {
      for (let i = 0; i < signs.length; i++) {
        let current = new Date(signs[i].lastModifyTime);
        let year = current.getFullYear();
        let month = current.getMonth() + 1;
        let day = current.getDate();
        day = parseInt(day);
        let date = new Date()
        let year1=date.getFullYear();
        let month1=date.getMonth() + 1;
        let day1=date.getDate();
        for (let j = 0; j < daysArr.length; j++) {
          //年月日相同并且已打卡
          if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day) {
            daysArr[j].isSign = true;
          }
        }
        if(year==year1&&month==month1&&day==day1){
          that.setData({
            isbtn:true
          })
        }
      }
      
    }

    that.setData({
      days: daysArr
    });
  },
  onGetSignInTime() { //请求用户已经签到的数据
    
    let openid = wx.getStorageSync('Token')
    let that = this;
    if (app.globalData.isLogin) {
      let url = app.globalData.URL + '/product/api/query/sgin?openid=' + openid.openid
      wx.request({
        url: url,
        method: 'get',
        success: res => {
          if (res.data.code == 200) {
            that.setData({
              signUp: res.data.data.result,
              sign: res.data.data.sign,
              openid:openid
            })
            that.onJudgeSign();
          } else {
            console.log("没有签到数据")
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    const date = new Date();
    const cur_year = date.getFullYear(); //当前年份
    const cur_month = date.getMonth() + 1; //当前月份
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month
    })
    if (app.globalData.isLogin) {

      that.onGetSignInTime()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})