Page({
  data: {
    buildingNumbers: ['1', '2', '3', '4'], // 示例楼号数据
    dormitoryNumbers: ['101', '102', '103', '104'], // 示例寝室号数据
    repairItems: ['电器', '水管', '家具', '其他'], // 示例报修物品数据
    selectedBuildingNumber: '', // 选中的楼号
    selectedDormitoryNumber: '', // 选中的寝室号
    selectedRepairItem: '电器', // 选中的报修物品
    phoneNumber: '', // 联系电话
    showRecordModal: false, // 是否显示报修记录对话框
    repairRecords: [], // 报修记录数据
    text: '',
  },

  onLoad: function () {
    this.getRecord();
  },

  getRecord: function () {
    const token = wx.getStorageSync('token');
    const room = token.data.room;
    const building = token.data.building;
    this.setData({
      selectedBuildingNumber: building,
      selectedDormitoryNumber: room,
      phoneNumber: token.data.phone,
    });
    const postData = {
      building: this.data.selectedBuildingNumber,
      room: this.data.selectedDormitoryNumber,
    };

    wx.request({
      url: 'http://localhost:8088/dormMaintenance/list',
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

  showRepairRecord() {
    this.setData({
      showRecordModal: true,
    });
  },

  hideRecordModal: function () {
    this.setData({
      showRecordModal: false,
    });
  },

  handleBuildingSelect: function (event) {
    const selectedBuildingNumber = this.data.buildingNumbers[event.detail.value];
    this.setData({
      selectedBuildingNumber: selectedBuildingNumber,
    });
  },

  handleDormitorySelect: function (event) {
    const selectedDormitoryNumber = this.data.dormitoryNumbers[event.detail.value];
    this.setData({
      selectedDormitoryNumber: selectedDormitoryNumber,
    });
  },

  handleRepairItemSelect: function (event) {
    const selectedRepairItem = this.data.repairItems[event.detail.value];
    this.setData({
      selectedRepairItem: selectedRepairItem,
    });
  },

  handlePhoneInput: function (event) {
    const phoneNumber = event.detail.value;
    this.setData({
      phoneNumber: phoneNumber,
    });
  },

  submitRepair: function () {
    const {
      selectedBuildingNumber,
      selectedDormitoryNumber,
      selectedRepairItem,
      phoneNumber,
      text
    } = this.data;

    if (!selectedBuildingNumber || !selectedDormitoryNumber || !selectedRepairItem || !phoneNumber) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }

    const postData = {
      building: selectedBuildingNumber,
      room: selectedDormitoryNumber,
      item: selectedRepairItem,
      phone: phoneNumber,
      description: text,
    };

    wx.request({
      url: 'http://localhost:8088/dormMaintenance/add',
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
});
