// pages/user/user.js
const util = require('../../utils/util.js')
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishide: false,
    islogin: false,
    name: '',
    avatar: "",
    walletInfo:''

  },
  myunhide(){
    // 不授权
    this.setData({
      ishide:false
    })
  },
  bindGetUserInfo(res){
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        ishide: false
      });
      this.logn();//用户授权向后端发送code
      this.myUserInfo() //调用用户信息
    } 
  },
  mylogin: function() {
   

  },
  logn(){
    let that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发送res.code 到后台
          let url=app.globalData.URL+'/shopuser/wxlogin'
          let user_name=this.data.name
          let user_avatar=this.data.avatar
          wx.request({
            url: url,
            method: 'POST',
            data: {
              code: res.code,
              user_name:user_name,
              user_avatar:user_avatar
            },
            success(res) {
              //成功返回数据后，将token值存储到localStorage中
              that.setData({
                islogin: true
              })
              console.log(res.data.data)
              wx.setStorage({
                key: 'Token',
                data: res.data.data
              });
              app.globalData.isLogin=true
              this.myIsLogin()
            }
          })
        }
      }
    })
  },
  myIsLogin: function() {
    let that = this;
    // 判断一下是否授权了
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 查看token登录状态是否存在
          var navfalged = wx.getStorageSync("Token")
          if (navfalged) {
            // 存在显示登录 //调用用户信息
            that.myUserInfo()
          } else {
            //不存在就登录
            that.logn()
          }
          console.log(navfalged)
        } else {
          //用户没有授权
          that.setData({
            ishide: true
          })
        }
      }
    });
  },
  myUserInfo() {
    // 获取用户函数  //前提是授权了才能调用  and  登录后
    let that = this;
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo //用户所有信息
        var nickName = userInfo.nickName //用户名
        var avatarUrl = userInfo.avatarUrl //用户头像
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province //用户所在省
        var city = userInfo.city //用户所在市
        var cousntry = userInfo.country //用户所在国家
        that.setData({
          name: nickName,
          avatar: avatarUrl,
          islogin: true
        })
        wx.setStorage({
          key: 'user',
          data: { nickName, nickName,avatarUrl},
        })
      }
    })
  },
  // 查询用户 余额 积分
  queryWallet(){
    let that=this
    let url = app.globalData.URL +'/product/query/wallet'
    if(app.globalData.isLogin){
      wx.getStorage({
        key: 'Token',
        success: function(res) {
          console.log(res.data.openid)
          wx.request({
            url: url,
            method:'post',
            data:{
              openid:res.data.openid
            },
            success:res=>{
              if(res.data.code==200){
                that.setData({
                  walletInfo:res.data.data[0]
                })
                console.log(res)
              }
            }
          })
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.myIsLogin()
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
    this.queryWallet()
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