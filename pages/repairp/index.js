// index.js
Page({
  data: {
    name: '',
    studentID: '',
    repairItems: ['自行车', '电动车', '电脑', '手机'],
    selectedRepairItem: '自行车',
    reason: '',
    phoneNumber: '',
    showRecordModal: false,
    repairRecords: [],
    text:'',
  },
  onLoad: function () {
    this.getRecord();
  },
  getRecord(){
    const token = wx.getStorageSync('token');
    const name = token.data.sname;
    const studentID = token.data.sid;
    this.setData({
      name:name, 
      studentID: studentID, 
      phoneNumber:token.data.phone
    });
    const postData = {
      sid: studentID,
    };
    wx.request({
      url: 'http://localhost:8088/personMaintenance/list',
      method: 'POST',
      data: postData,
      success: (res) => {
        // console.log(res);
        if (res.data.msg === '查询成功') {
          const repairRecords = res.data.data;
          this.setData({
            repairRecords: repairRecords,
          });
          // console.log('报修记录：', repairRecords);
        } else {
          wx.showToast({
            title: '获取报修记录失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败，请检查网络连接',
          icon: 'none',
        });
      },
    });
  },
  handleNameInput(event) {
    this.setData({
      name: event.detail.value
    });
  },

  handleStudentIDInput(event) {
    this.setData({
      studentID: event.detail.value
    });
  },

  handleRepairItemSelect(event) {
    const index = event.detail.value;
    const selectedRepairItem = this.data.repairItems[index];
    this.setData({
      selectedRepairItem: selectedRepairItem
    });
  },

  handleReasonInput(event) {
    this.setData({
      reason: event.detail.value
    });
  },

  handlePhoneInput(event) {
    this.setData({
      phoneNumber: event.detail.value
    });
  },

  
  submitRepair: function () {
    const {
      name,
      studentID,
      selectedRepairItem,
      phoneNumber,
      text
    } = this.data;

    if (!name || !studentID || !selectedRepairItem || !phoneNumber) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }

    const postData = {
      sname: name,
      sid: studentID,
      item: selectedRepairItem,
      phone: phoneNumber,
      description: text,
    };

    wx.request({
      url: 'http://localhost:8088/personMaintenance/add',
      method: 'POST',
      data: postData,
      success: (res) => {
        // console.log(res);
        if (res.data.msg === '新增成功') {
          this.getRecord();
          wx.showToast({
            title: '报修申请提交成功',
            icon: 'success',
            duration: 2000,
            success: () => {
              this.setData({
                text: '',
              });
            },
          });
        } else {
          wx.showToast({
            title: '报修申请提交失败',
            icon: 'none',
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败，请检查网络连接',
          icon: 'none',
        });
      },
    });
  },
  showRepairRecord() {
    this.setData({
      showRecordModal: true
    });
  },

  hideRecordModal() {
    this.setData({
      showRecordModal: false
    });
  }
});
