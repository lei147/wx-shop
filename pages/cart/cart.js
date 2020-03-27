// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    isCart: false,
    isShow: true,
    imageURL: 'https://bk.bklei.com/img/uimg2.jpg',
    cart: '',
    arr: '',
    selectAllStatus: false, // 全选状态，默认
    total: 0
  },
  delCart(){
    let arr=this.data.cart
    let that = this
    if(arr){
      let cart_ids = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].good_select == 1) {
          cart_ids.push(arr[i].cart_id)
        }
      }
      if(cart_ids.length>0){
   
        let url=app.globalData.URL+'/product/delete/cart'
        wx.request({
          url: url,
          method:'post',
          data:cart_ids,
          success:res=>{
            if(res.data.code==200){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              that.setData({
                cart:''
              })
              that.queryCart(this.data.openid)
              that.checkxuan()
            }else{

              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 2000
              })
            }
          }

        })
      }else{
        wx.showToast({
          title: '请选择商品',
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: '你的购物车还没添加商品',
        icon: 'none',
        duration: 2000
      })
    }
  },

  onChangeNum(e) {
    let arr = this.data.cart
    let id = e.currentTarget.dataset.index;
    let value = e.detail
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].good_id == id) {
        let cart = 'cart[' + i + '].good_num'
        this.setData({
          [cart]: value
        })
        this.totalPrice() //更改商品数量后再次调用商家总计计算
        this.updateCart(arr[i])
      }
    }
  },
  updateCart(data) {
    let url = app.globalData.URL + '/product/update/cart'
    wx.request({
      url: url,
      method: 'post',
      data: data,
      success: res => {
        console.log(res)
      }

    })
  },
  totalPrice() {
    //计算所有选中商品的总计
    let arr = this.data.cart
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].good_select == 1) {
        let dan = arr[i].good_price * arr[i].good_num
        total += dan
      }
    }
    this.setData({
      total: total.toFixed(2)
    })
  },
  clickQuan() { //点击全选将所有的购物车商品选中
    let arr = this.data.cart
    for (let i = 0; i < arr.length; i++) {
      let cart = "cart[" + i + "].good_select"
      this.setData({
        [cart]: 1
      })
      this.updateCart(arr[i])
    }
  },
  checkxuan() {
    //检查商品是否都在选中状态 如果是勾上全选
    let arr = this.data.cart
    if (arr) {
      let is = true
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].good_select == 0) {
          is = false
        }
      }
      if (is) {
        this.setData({
          selectAllStatus: true
        })
      } else {
        this.setData({
          selectAllStatus: false
        })
      }

    }else{
      this.setData({
        selectAllStatus: false
      })
    }
  },
  onChange(e) {
    let arr = this.data.cart
    let index = e.currentTarget.dataset.index
    if (index == 'quan') {
      if (this.data.selectAllStatus == false) {
        this.setData({
          selectAllStatus: true
        })
        this.clickQuan()
        this.totalPrice()
      } else {
        this.setData({
          selectAllStatus: false
        })
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].good_id == index) {
          let cart = 'cart[' + i + '].good_select'
          if (arr[i].good_select == 1) {
            this.setData({
              [cart]: 0,
              selectAllStatus: false
            })
            this.totalPrice() //取消选中再次计算价格
            this.updateCart(arr[i])//更新购物车
          } else {
            this.setData({
              [cart]: 1
            })
            this.checkxuan()
            this.totalPrice() //选中再次计算价格
            this.updateCart(arr[i])//更新购物车
          }
        }
      }
    }
  },
  // 编辑删除切换显示隐藏
  onToggle: function () {
    let isShow = this.data.isShow;
    if (isShow) {
      this.setData({
        isShow: false
      })
    } else {
      this.setData({
        isShow: true
      })
    }
  },
  oncheck: function () {
    let arr = this.data.cart
    let that = this
    if (arr) {
      let cart_ids = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].good_select == 1) {
          cart_ids.push(arr[i])
        }
      }
      if (cart_ids.length > 0) {
        app.globalData.cart=cart_ids;
        app.globalData.total=that.data.total
        wx.navigateTo({
          url: '../check/check'
        })
 
      } else {
        wx.showToast({
          title: '请选择商品',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '你的购物车还没添加商品',
        icon: 'none',
        duration: 2000
      })
    }

  },

  queryCart(openid) {
    let that = this
    that.setData({
      openid:openid
    })
    if (openid) {
      let url = app.globalData.URL + '/product/query/cart?openid=' + openid
      wx.request({
        url: url,
        method: 'get',
        success: res => {
          if (res.data.code == 200) {
            that.setData({
              cart: res.data.data
            })
            this.totalPrice()
            this.checkxuan()
          } else {
            that.setData({
              cart: ""
            })
            this.checkxuan()
            this.totalPrice()
          }
        }
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


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    if (app.globalData.isLogin) {
      wx.getStorage({
        key: 'Token',
        success: function (res) {
          that.queryCart(res.data.openid)
        },
      })
    }
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