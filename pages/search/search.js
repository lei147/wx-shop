// pages/search/search.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    active:0,
    record:[],
    goodArr:[],
    isgood:true
  },
  oncChange(e){
    this.setData({
      value:e.detail
    })
    if(e.detail==""){
      this.setData({
        goodArr:[],
        isgood:true,

      })
    }
  },
  onClickSearch(){
    let that=this
    let value=this.data.value
    let url = app.globalData.URL +'/product/api/query/good?keyword='+value
    if(!value){
      wx.showToast({
        title: '请输入搜索关键词',
        icon:'none'
      })
    }else{
      this.getRecord(value)
      wx.request({
        url:url,
        method:'get',
        success:res=>{
          if(res.data.code==200){
            that.setData({
              goodArr:res.data.data,
              isgood: true
            })
          }else{
            that.setData({
              goodArr:[],
              isgood:false
            })
          }
        }
      })
    }
  
  },
  getRecord(value){
    let that=this
    let arr=this.data.record
    if(arr==""){
      arr.push(value)
      that.setData({
        record: arr
      })
    }else{
      let is=true
      arr.map(x=>{
        if(x===value){
          is=false
        }
      })
      if(is){
        arr.push(value)
      }
      that.setData({
        record:arr
      })

    }
  },
  onrecordClick(e){
    this.setData({
      value:e.currentTarget.id
    })
    this.onClickSearch()
  },
  // 删除历史记录
  ondelRecord(){
    wx.removeStorage({
      key: 'record',
      success(res) {
      }
    })
    this.setData({
      record:[]
    })
    if(this.data.record==""){
      wx.showToast({
        title: '已删除记录',
        icon:'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this;
    wx.getStorage({
      key: 'record',
      success: function (res) {
        if (res.data) {//如果存在历史记录把值存到record里
          that.setData({
            record:res.data
          })
        } 

      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let that = this;
    let arr =this.data.record
    if(arr){
      wx.setStorage({
        key: 'record',
        data: arr,
      })
    }

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})