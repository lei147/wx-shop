// pages/estimate/estimate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      //{ url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
    ],
    action:1
  },
  afterRead(event){
    let length=this.data.fileList.length
    let img=event.detail.file.path
    let obj=[{url:img}];
    let arr={url:img}
    if(length==0){
      this.setData({
        fileList: obj
      })
    }else{
      let item ="fileList["+length+"]" 
      this.setData({
        [item]: arr
      })
    }
  },
  chao(){
    wx.showToast({
      title: '图片不能大于100kb',
      icon: 'none',
      duration: 2000
    })
  },
  myclick(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      action:index
    })
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