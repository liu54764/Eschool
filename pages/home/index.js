// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  out(){
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/login/index',
      })
    }, 500);
  },
  navigateToFunctionPage1()
  {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/shuifei/index',
      })
    }, 500);
  },
  navigateToFunctionPage2()
  {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/dianfei/index',
      })
    }, 500);
  },
  navigateToFunctionPage3()
  {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/yikatong/index',
      })
    }, 500);
  },
  navigateToFunctionPage4()
  {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/reshui/index',
      })
    }, 500);
  },
  navigateToFunctionPage5()
  {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/dingshui/index',
      })
    }, 500);
  },
  navigateToFunctionPage6()
  {
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/buy/index',
      })
    }, 500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})