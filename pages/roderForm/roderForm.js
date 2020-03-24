// pages/roderForm/roderForm.js
const app=getApp()
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    active: 0,
    arrOrder:[],
    show:false   //支付弹出层 默认不显示
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none'
    });
  },
  updateOrder(e){
    let url = app.globalData.URL +'/product/update/orderState'
    let from_number = e.currentTarget.dataset.order.from_number
    let good_state = parseInt(e.currentTarget.dataset.order.good_state) + 1
    wx.request({
      url: url,
      method:'post',
      data:{
        from_number:from_number,
        good_state:good_state
      },
      success:res=>{
        if(res.data.code==200){
          Dialog.alert({
            message: '成功'
          }).then(() => {
            this.orderData()//调用新的数据
          });
        }else{
          Dialog.alert({
            message: 'err'
          }).then(() => {
          });
        }
      }
    })
  },
  onClickSign(e){//确认收货事件  调用函数修改订单状态为已收货
    this.updateOrder(e)
  },
  onClickPay(e){//调用支付事件
    let good=e.currentTarget.dataset.order
    let openid=good.openid
    let order = good.from_number
    let total=good.total
    let url = app.globalData.URL + '/product/api/pay'
    wx.request({
      url: url,
      method: "post",
      data: {
        openid: openid,
        total: total,
        order: order
      },
      success: res => {
        if (res.data.code == -200) {
          Dialog.alert({
            message: '支付失败,余额不足'
          }).then(() => {
          });
        } else if (res.data.code == 200) {
          Dialog.alert({
            message: '支付成功'
          }).then(() => {
            this.orderData()//支付成功 调用新的数据
          });
        }
      }

    })
  },
  orderData(){
    let that = this
    if (app.globalData.isLogin) {
      wx.getStorage({
        key: 'Token',
        success: function (res) {
          that.setData({
            openid: res.data.openid
          })
          let openid = res.data.openid
          let url = app.globalData.URL + '/product/query/orderForm'
          wx.request({
            url: url,
            method: 'post',
            data: {
              openid: openid
            },
            success: res => {
              if (res.data.code == 200) {
                that.setData({
                  arrOrder: res.data.data
                })
              } else {
                console.log('没有数据')
              }
              console.log(that.data.arrOrder)
            }
          })
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let num = parseInt(options.index)
    this.setData({
      active: num
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.orderData()
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