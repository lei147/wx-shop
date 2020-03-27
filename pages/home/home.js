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
      icon: 'shuiguo',
        name: '产地水果'
      },
      {
        nav: '2',
        icon: 'shucai',
        name: '新鲜蔬菜'
      },
      {
        nav: '3',
        icon: 'haixian1',
        name: '海鲜水产'
      },
      {
        nav: '4',
        icon: 'yinliao1',
        name: '酒水饮料'
      },
      {
        nav: '5',
        icon: 'ICON_gaodian-',
        name: '熟食糕点'
      },
      {
        nav: '6',
        icon: 'roulei',
        name: '肉禽蛋品'
      },
      {
        nav: '7',
        icon: 'niunai',
        name: '乳品素食'
      },
      {
        nav: '8',
        icon: 'liangyoutiaowei',
        name: '粮油调味'
      },
      {
        nav: '9',
        icon: 'weibiaoti-',
        name: '休闲食品'
      },
      {
        nav: '10',
        icon: 'meizhuang1',
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
    // 判断一下是否授权了
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']){
          wx.getStorage({
            key: 'Token',
            success: function(res) {
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