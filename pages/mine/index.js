Page({
  data: {
    showRecordModal: false,
    newSid: "",
    newSname: "",
   
    newBuilding: "",
    newRoom: "",
    newCardAmount: "",
    newHotWater: "",
    newPhone: "",
  },

  showPurchaseHistory: function () {
    const token = wx.getStorageSync('token');
    const name = token.data.sname;
    const studentID = token.data.sid;
    const room = token.data.room;
    const building = token.data.building;
    const card = token.data.cardAmount;
    const hot = token.data.hotWater;
    const password = token.data.password;
    this.setData({
      showRecordModal: true,
      newSname: name,
      newSid: studentID,
      newPhone: token.data.phone,
      newBuilding: building,
     newRoom: room,
     newCardAmount:card ,
     newHotWater: hot,
     newPassword: password,
    });
  },

  hideRecordModal: function () {
    this.setData({
      showRecordModal: false,
    });
  },

  inputSid: function (event) {
    this.setData({
      newSid: event.detail.value,
    });
  },

  inputSname: function (event) {
    this.setData({
      newSname: event.detail.value,
    });
  },

  inputPassword: function (event) {
    this.setData({
      newPassword: event.detail.value,
    });
  },

  inputBuilding: function (event) {
    this.setData({
      newBuilding: event.detail.value,
    });
  },

  inputRoom: function (event) {
    this.setData({
      newRoom: event.detail.value,
    });
  },

  inputCardAmount: function (event) {
    this.setData({
      newCardAmount: event.detail.value,
    });
  },

  inputHotWater: function (event) {
    this.setData({
      newHotWater: event.detail.value,
    });
  },

  inputPhone: function (event) {
    this.setData({
      newPhone: event.detail.value,
    });
  },

  updateUserInfo: function () {
    const newSid = this.data.newSid;
    const newSname = this.data.newSname;
    const newPassword = this.data.password;
    const newBuilding = this.data.newBuilding;
    const newRoom = this.data.newRoom;
    const newCardAmount = this.data.newCardAmount;
    const newHotWater = this.data.newHotWater;
    const newPhone = this.data.newPhone;
    // 将新的个人信息发送给后端进行修改
    wx.request({
      url: "http://localhost:8088/student/editInformation",
      method: "POST",
      data: {
        sid: newSid,
        sname: newSname,
        password: newPassword,
        building: newBuilding,
        room: newRoom,
        cardAmount: newCardAmount,
        hotWater: newHotWater,
        phone: newPhone,
      },
      success: (res) => {
        wx.showToast({
          title: '个人信息修改成功',
          icon: 'none',
        });
        wx.setStorageSync('token', res.data);
        // console.log("个人信息修改成功:", res.data);
        // 在此可以执行其他逻辑，如更新页面显示等
      },
      fail: (error) => {
        console.error("个人信息修改失败:", error);
        // 在此可以执行错误处理逻辑
      },
    });

    this.setData({
      showRecordModal: false,
    });
  },
});
