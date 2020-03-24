// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jkUrl: ' https://blog.cross.echosite.cn',
    classInfo: [{
        nav: '1',
        url: 'https://bk.bklei.com/shop/2.png',
        name: '产地水果'
      },
      {
        nav: '2',
        url: 'https://bk.bklei.com/shop/4.png',
        name: '新鲜蔬菜'
      },
      {
        nav: '3',
        url: 'https://bk.bklei.com/shop/6.png',
        name: '海鲜水产'
      },
      {
        nav: '4',
        url: 'https://bk.bklei.com/shop/10.png',
        name: '酒水饮料'
      },
      {
        nav: '5',
        url: 'https://bk.bklei.com/shop/7.png',
        name: '熟食糕点'
      },
      {
        nav: '6',
        url: 'https://bk.bklei.com/shop/9.png',
        name: '肉禽蛋品'
      },
      {
        nav: '7',
        url: 'https://bk.bklei.com/shop/8.png',
        name: '乳品素食'
      },
      {
        nav: '8',
        url: 'https://bk.bklei.com/shop/1.png',
        name: '粮油调味'
      },
      {
        nav: '9',
        url: 'https://bk.bklei.com/shop/3.png',
        name: '休闲食品'
      },
      {
        nav: '10',
        url: 'https://bk.bklei.com/shop/5.png',
        name: '美妆百货'
      }
    ]
  },
  myclass: function() {
    wx.switchTab({
      url: '../classify/classify'
    })
  },
  myClickTiao: function(e) {
    let index = e.currentTarget.dataset.click
    wx.navigateTo({
      url: '../classify2/classify?nav=' + index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let url = app.globalData.URL + "/shopuser/check/login"
    console.log(url)
    // 判断一下是否授权了
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getStorage({
            key: 'Token',
            success: function(res) {
              console.log(res)
              app.globalData.isLogin = true
            },
            fail: function() {
              app.globalData.isLogin = false
            }
          })

        }
      }
    });
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