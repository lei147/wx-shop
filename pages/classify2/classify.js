// pages/classify/classify.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  productInfo: function(id) {
    let that = this
    let url = app.globalData.URL + '/product/query/product?id=' + id
    wx.request({
      url: url,
      method: 'get',
      success: function(res) {
        if(res.data.code!=1){
          return
        }
        if (id == 1) {
          that.setData({
            oneList: res.data.data
          })
        } else if (id == 2) {
          that.setData({
            twoList: res.data.data
          })
        } else if (id == 3) {
          that.setData({
            threeList: res.data.data
          })
        } else if (id == 4) {
          that.setData({
            fourList: res.data.data
          })
        } else if (id == 5) {
          that.setData({
            five: res.data.data
          })
        } else if (id == 6) {
          that.setData({
            sixList: res.data.data
          })
        } else if (id == 7) {
          that.setData({
            sevenList: res.data.data
          })
        } else if (id == 8) {
          that.setData({
            eightList: res.data.data
          })
        } else if (id == 9) {
          that.setData({
            nineList: res.data.data
          })
        } else if (id == 10) {
          that.setData({
            tenList: res.data.data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  
    let nav = parseInt(options.nav)
    if (nav) {
      this.setData({
        active: nav - 1
      })
    }
    for (let i = 1; i <= 10; i++) {
      this.productInfo(i)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

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