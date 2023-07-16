// pages/regist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId: '',
    password: '',
    password1: '',
    selectedValue: '',  // 选择的值
  },
  handleRadioChange: function(event) {
    const value = event.detail.value;
    this.setData({
      selectedValue: value
    });
    console.log('选择的值：', value);
  },
 goback(){
  setTimeout(() => {
    wx.redirectTo({
      url: '/pages/login/index',
    })
  }, 1000);
 },
 register() {
  const identity = this.data.selectedValue;
  const postData = {
    sid: this.data.stuId,
    password: this.data.password,
  };

  let url = '';
  if (identity === '0') {
    url = 'http://localhost:8088/student/register';
  } else if (identity === '1') {
    url = 'http://localhost:8088/business/register';
  }
  if (url !== '') {
    wx.request({
      url: url,
      data: postData,
      method: 'POST',
      success(res) {
        if (res.data.msg === '成功') {
          // 注册成功
          wx.showToast({
            title: '注册成功',
            icon: 'success'
          });
          // 注册成功后进行其他操作，例如跳转到登录页面
          wx.navigateTo({
            url: '/pages/login/index'
          });
        } else {
          // 注册失败
          wx.showToast({
            title: '注册失败，请稍后重试',
            icon: 'none'
          });
        }
      },
      fail() {
        wx.showToast({
          title: '请求失败，请检查网络连接',
          icon: 'none'
        });
      }
    });
  } else {
    wx.showToast({
      title: '请选择身份',
      icon: 'none'
    });
  }
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