// pages/check/check.js
const util = require('../../utils/util.js')
const app = getApp()
import Dialog from '@vant/weapp/dialog/dialog';
Page({

      /**
       * 页面的初始数据
       */
      data: {
        islogin: false,
        show: false, //默认隐藏支付框
        radio: '1',
        imageURL: 'https://bk.bklei.com/img/uimg2.jpg',
        arr: [],
        total: 0,
        price: [],
        sites: '',
        openid: '',
        order: '' //订单号

      },
      onChange(event) {
        this.setData({
          radio: event.detail
        });
      },
      onSubmit: function() {
        if (!this.data.arr) {
          wx.showToast({
            title: '没有商品',
          })
          return;
        }
        if (!this.data.sites) {
          wx.showToast({
            title: '请添加收货地址',
          })
        } else {
          this.setData({
            show: true
          })
          // 生成订单
          let url = app.globalData.URL + '/product/add/orderFrom'
          let time = util.formatTime(new Date()) //获取时间
          let time2 = time.replace(/[^0-9]/ig, "") //去除 -- 等 时间的格式符号
          let randomNum = Math.floor(Math.random() * 10000 * 10); // 可均衡获取0到9的随机整数。
          let oderNumber = time2 + randomNum; //订单号
          let openid = this.data.openid; //用户id
          let site = this.data.sites[0].user_site + this.data.sites[0].site_detail
          let arr = this.data.arr
          let total=this.data.total
          this.setData({
            order: oderNumber
          })
          wx.request({
            url: url,
            method: "post",
            data: {
              order: {
                openid: openid,
                from_number: oderNumber,
                from_site: site,
                from_date: time,
                total:total
              },
              arr

            },
            success: res => {
              if (res.data.code == 200) {
                console.log('生成订单 ')
                this.delcart()
                // // 插入商品到订单里
                // wx.request({
                //   url: app.globalData.URL+'',
                // })
              }
            }
          })

        }


      },
      myClickIcon: function() {

        this.setData({
          show: false
        })
        Dialog.alert({
          title: '支付取消',
          message: '支付失败'
        }).then(() => {
          wx.redirectTo({ //关闭当前页面，跳转到应用内的某个页面

            url: '../../pages/roderForm/roderForm',

          })
        });

      },
      myClickPay: function() {
        let url = app.globalData.URL + '/product/api/pay'
        let openid = this.data.openid
        let total = this.data.total
        let order = this.data.order
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
                  this.setData({
                    show: false
                  })
                  Dialog.alert({
                 
                    message: '支付失败,余额不足'
                  }).then(() => {
                    wx.redirectTo({ //关闭当前页面，跳转到应用内的某个页面
                      url: '../../pages/roderForm/roderForm',
                    })
                  });
                } else if (res.data.code == 200) {
                    this.setData({
                      show: false
                    })
                    Dialog.alert({
                      message: '支付成功'
                    }).then(() => {
                      wx.redirectTo({ //关闭当前页面，跳转到应用内的某个页面

                        url: '../../pages/roderForm/roderForm',

                      })
                    });
                  }
                }

              })
          },
          delcart(){
            let arr = this.data.arr
            let that = this
            if (arr[0].cart_id) {
              let cart_ids = []
              for (let i = 0; i < arr.length; i++) {
                cart_ids.push(arr[i].cart_id)
              }
              if (cart_ids.length > 0) {

                let url = app.globalData.URL + '/product/delete/cart'
                wx.request({
                  url: url,
                  method: 'post',
                  data: cart_ids,
                  success: res => {
                    if (res.data.code == 200) {
                      console.log('删除成功')
                    } else {
                      console.log('删除失败')
                    }
                  }

                })
              }
            }
          },
          /**
           * 生命周期函数--监听页面加载
           */
          onLoad: function(options) {
            let arr = app.globalData.cart
            let total = app.globalData.total
            this.setData({
              arr: arr,
              total: total
            })
            for (let i = 0; i < arr.length; i++) {
              let dan = arr[i].good_price * arr[i].good_num
              let price = dan.toFixed(2)
              let arrPrice = 'price[' + i + ']'
              this.setData({
                [arrPrice]: price
              })
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
            let that = this
            wx.getStorage({
              key: 'Token',
              success: function(res) {
                let openid = res.data.openid
                that.setData({
                  openid: openid
                })
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