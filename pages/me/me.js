// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  toadd(e){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },
  tomgn(e){
    wx.navigateTo({
      url: '/pages/mgn/mgn',
    })
  }
})