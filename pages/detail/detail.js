// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    lunbo: "",
    good: "",
    comment: "",
    value: 1,
    isComment: true,
    openid: ''

  },
  onChange: function(event) {
    this.setData({
      value: event.detail
    })
  },
  // 加入购物车
  onClickCart: function() {
    let isShow = this.data.isShow;
    if (isShow) {
      this.setData({
        isShow: false
      })
      if (app.globalData.isLogin == false) {
        wx.showToast({
          title: '你还未登录，请在个人中心登录',
          icon: 'none',
          duration: 2000
        })
      } else {
        let url = app.globalData.URL + '/product/addCart'
        let openid = this.data.openid;
        let good_id = this.data.good.good_id;
        let good_num = this.data.value;
        let good_name = this.data.good.good_name;
        let good_cover = this.data.good.good_cover;
        let good_price = this.data.good.good_price;
        wx.request({
          url: url,
          method: 'post',
          data: {
            openid: openid,
            good_id: good_id,
            good_name: good_name,
            good_banner: good_cover,
            good_price: good_price,
            good_num: good_num,
            good_select: 1
          },
          success: res => {
            wx.showToast({
              title: '添加购物车成功',
              icon: 'success',
              duration: 2000
            })
          }

        })

      }

    } else {
      this.setData({
        isShow: true
      })
    }
  },
  //立即购买
  onClickBuy: function() {
    let id = this.data.good.good_id
    let num = this.data.value
    let isShow = this.data.isShow;
    if (isShow) {
      if (app.globalData.isLogin === false) {
        wx.showToast({
          title: '你还未登录，请在个人中心登录',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.navigateTo({
          url: '/pages/check/check?id=' + id + '&num=' + num,
        })
        let good_id = this.data.good.good_id;
        let good_num = this.data.value;
        let good_name = this.data.good.good_name;
        let good_banner = this.data.good.good_cover;
        let good_price = this.data.good.good_price;
        let total = good_num * good_price;
        app.globalData.cart = ""
        app.globalData.total = ""
        app.globalData.total = total.toFixed(2)
        app.globalData.cart = [{
          goog_id: good_id,
          good_num: good_num,
          good_name: good_name,
          good_banner: good_banner,
          good_price: good_price
        }]

      }

    } else {
      this.setData({
        isShow: true
      })
    }
  },
  //点击遮罩层关闭上拉菜单
  onClose: function() {
    this.setData({
      isShow: false
    })
  },
  onClickIcon: function() {
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let id = parseInt(options.id) //当前商品id
    let url = app.globalData.URL + '/product/query/good?id=' + id;
    wx.request({
      url: url,
      method: 'get',
      success: res => {
        if (res.data[2].code == 1) {
          that.setData({
            isComment: false
          })
        }
        that.setData({
          good: res.data[0][0],
          lunbo: res.data[1],
          comment: res.data[2].data
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this
    if (app.globalData.isLogin) {
      wx.getStorage({
        key: 'Token',
        success: function(res) {
          that.setData({
            openid: res.data.openid
          })
        },
      })
    }
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