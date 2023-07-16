// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedValue: '',  // 选择的值
     stuId:'',
     password:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handleRadioChange: function(event) {
    const value = event.detail.value;
    this.setData({
      selectedValue: value
    });
    wx.setStorageSync('Identity', value);
    console.log('选择的值：', value);
  },
  onLoad(options) {

  },
  login() {
    const identity = this.data.selectedValue;
    const postData = {
      sid: this.data.stuId,
      password: this.data.password
    };
  
    let url = '';
    if (identity === '0') {
      url = 'http://localhost:8088/student/login';
    } else if (identity === '1') {
      url = 'http://localhost:8088/business/login';
    }
  
    if (url !== '') {
      wx.request({
        url: url,
        data: postData,
        method: 'POST',
        success(res) {
          console.log(res);
          if (res.data.msg === '登陆成功') {
            // 密码正确，登录成功
            wx.setStorageSync('token', res.data);
            wx.showToast({
              title: '登录成功',
              icon: 'none'
            });
            // 延迟跳转到首页页面（以达到显示 Toast 的效果）
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/home/index'
              });
            }, 500);
          } else {
            // 密码错误或其他登录失败的情况
            wx.showToast({
              title: '登录失败，请检查用户名和密码',
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
  regist(){
    setTimeout(() => {
      wx.redirectTo({
        url: '/pages/regist/index',
      })
    }, 500);
  },
  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady() {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow() {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide() {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload() {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh() {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom() {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage() {

  // }
})