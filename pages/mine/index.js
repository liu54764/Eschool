Page({
  data: {
    showRecordModal: false,
    newSid: "",
    newSname: "",
    newPassword: "",
    newBuilding: "",
    newRoom: "",
    newCardAmount: "",
    newHotWater: "",
    newPhone: "",
  },

  showPurchaseHistory: function () {
    this.setData({
      showRecordModal: true,
      newSid: "",
      newSname: "",
      newPassword: "",
      newBuilding: "",
      newRoom: "",
      newCardAmount: "",
      newHotWater: "",
      newPhone: "",
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
    // const newSid = this.data.newSid;
    const newSname = this.data.newSname;
    const newPassword = this.data.newPassword;
    const newBuilding = this.data.newBuilding;
    const newRoom = this.data.newRoom;
    const newCardAmount = this.data.newCardAmount;
    const newHotWater = this.data.newHotWater;
    const newPhone = this.data.newPhone;

    const token = wx.getStorageSync('token');
    const name = token.data.sname;
    const newSid  = token.data.sid;
    const room = token.data.room;
    const building = token.data.building;
    this.setData({
      name: name,
      studentID: studentID,
      phone: token.data.phone,
      selectedBuildingNumber: building,
      selectedDormitoryNumber: room,
    });
    // 将新的个人信息发送给后端进行修改
    wx.request({
      url: "http://localhost:8088/student/editinformation",
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
        console.log("个人信息修改成功:", res.data);
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
