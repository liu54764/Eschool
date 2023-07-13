// app.js
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null
  },
  "usingComponents": {
    "van-button": "/vant/button/index",
    "van-cell": "/vant/cell/index",
    "van-toast": "/vant/toast/index",
    "van-radio": "/vant/radio/index",
    "van-radio-group": "/vant/radio-group/index"
  }
})
