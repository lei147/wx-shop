// pages/site/site.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sites:''
  },
  mybtn: function(e) {
    let that=this
    let url = app.globalData.URL +'/product/update/siteDefault'
    let site_id=e.currentTarget.dataset.id
    let openid= e.currentTarget.dataset.openid
    wx.request({
      url: url,
      method:'post',
      data:{
        site_id:site_id,
        openid:openid
      },
      success:res=>{
        if(res.data.code==200){
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          })
          this.querySites()
        }else{
          wx.showToast({
            title: '设置失败 -200',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    //设置指定地址为默认
    console.log(e)
  },
  querySites(){
    let that = this
    wx.getStorage({
      key: 'Token',
      success: function (res) {
        let openid = res.data.openid
        let url = app.globalData.URL + '/product/query/site?openid=' + openid
        wx.request({
          url: url,
          method: 'get',
          success: res => {
            that.setData({
              sites: res.data.data
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.querySites()
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