// pages/addsite/addsite.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    name: "",
    phone: '',
    region: [],
    site: '',
    site_id:''
  },
  onChange(e){
    let index = e.currentTarget.dataset.index
    if(index==1){
      this.setData({
        name:e.detail
      })
    }else if(index==2){
      this.setData({
        phone: e.detail
      })
    }else if(index==3){
      this.setData({
        site: e.detail
      })
    }
  },
  onClick(){
    let that=this
    let region=this.data.region
    let user_name=this.data.name
    let user_phone=this.data.phone
    let user_site=''
    let site_detail=this.data.site
    let openid=this.data.openid
    for(let i=0;i<region.length;i++){
      if(i<region.length-1){
        user_site+=region[i]+','
      }else{
        user_site += region[i]
      }
    }
   if(!user_name){
     wx.showToast({
       title: '请填写完整',
     })
   }else if(!user_phone){
     wx.showToast({
       title: '请填写完整',
     })
   }else if(!user_site){
     wx.showToast({
       title: '请填写完整',
     })
   }else if(!site_detail){
     wx.showToast({
       title: '请填写完整',
     })
   }else if(!openid){
     wx.showToast({
       title: '请填写完整',
     })
   }else if(!this.data.site_id){
     let url=app.globalData.URL+'/product/addsite'
     wx.request({
       url: url,
       method:'post',
       data:{
         openid:openid,
         user_name:user_name,
         user_phone:user_phone,
         user_site:user_site,
         site_detail:site_detail
       },
       success:res=>{
         if(res.data.code==200){
           wx.showToast({
             title: '保存成功',
             icon: 'success',
             duration: 2000
           })
          //  wx.navigateBack({
          //    delta: 1
          //  })
         }else{
           wx.showToast({
             title: '保存失败',
             icon: 'none',
             duration: 2000
           })
         }
       }
     })
   }else{
     let url = app.globalData.URL + '/product/updateId/site'
     wx.request({
       url: url,
       method:"post",
       data:{
         site_id:that.data.site_id,
         user_name: user_name,
         user_phone: user_phone,
         user_site: user_site,
         site_detail: site_detail
       },
       success:res=>{
         if(res.data.code==200){
           wx.showToast({
             title: '修改成功',
             icon: 'success',
             duration: 2000
           })
         }else{
           wx.showToast({
             title: '修改失败',
             icon: 'none',
             duration: 2000
           })
         }
       }
     })
   }
   
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this
    let url = app.globalData.URL +'/product/queryId/site?site_id='+options.site_id
    if(options.site_id){
      this.setData({
        site_id:options.site_id
      })
      wx.request({
        url:url,
        method:'get',
        success:res=>{
          console.log(res)
          let s = res.data.data[0].user_site
          let arr=s.split(',')
          that.setData({
            name:res.data.data[0].user_name,
            phone: res.data.data[0].user_phone,
            region: arr,
            site: res.data.data[0].site_detail,
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that=this
    if(app.globalData.isLogin){
      wx.getStorage({
        key: 'Token',
        success: function(res) {
          that.setData({
            openid:res.data.openid
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