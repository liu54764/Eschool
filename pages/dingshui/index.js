Page({
  data: {
    buildingNumbers: ['1', '2', '3', '4', '5'],  // 可选的楼号
    selectedBuildingNumber: '',  // 选择的楼号
    dormitoryNumbers: ['101', '102', '201', '202', '301'],  // 可选的寝室号
    selectedDormitoryNumber: '',  // 选择的寝室号
    waterTypes: ['农夫山泉', '莫干山泉', '百岁山', '怡宝'],  // 可选的桶装水类型
    selectedWaterType: '农夫山泉',  // 选择的桶装水类型
    quantity: 0,  // 购买数量
    name: '',  // 姓名
    phone: '',  // 电话
    showRecordModal: false,  // 是否显示购买记录对话框
    purchaseRecords: []  // 购买记录
  },
  onLoad: function () {
    this.getRecord();
  },
  getRecord: function () {
    const token = wx.getStorageSync('token');
    const name = token.data.sname;
    const studentID = token.data.sid;
    const room = token.data.room;
    const building = token.data.building;
    this.setData({
      name: name,
      studentID: studentID,
      phone: token.data.phone,
      selectedBuildingNumber: building,
      selectedDormitoryNumber: room,
    });
    const postData = {
      building: building,
      room: room,
    };
    wx.request({
      url: 'http://localhost:8088/orderWaterRecord/list',
      method: 'POST',
      data: postData,
      success: (res) => {
        console.log(res);
        if (res.data.msg === '查询成功') {
          const purchaseRecords = res.data.data;
          this.setData({
            purchaseRecords: purchaseRecords,
          });
          console.log('历史记录：', purchaseRecords);
        } else {
          wx.showToast({
            title: '获取历史记录失败',
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
  showPurchaseHistory: function () {
    this.setData({
      showRecordModal: true,
    });
  },
  hideRecordModal: function () {
    this.setData({
      showRecordModal: false,
    });
  },
  handleNameInput: function (event) {
    this.setData({
      name: event.detail.value,
    });
  },
  handlePhoneInput: function (event) {
    this.setData({
      phone: event.detail.value,
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
  handleWaterTypeSelect: function (event) {
    const selectedWaterType = this.data.waterTypes[event.detail.value];
    this.setData({
      selectedWaterType: selectedWaterType,
    });
  },
  decreaseQuantity: function () {
    if (this.data.quantity > 0) {
      this.setData({
        quantity: this.data.quantity - 1,
      });
    }
  },
  increaseQuantity: function () {
    this.setData({
      quantity: this.data.quantity + 1,
    });
  },
  purchaseWater: function () {
    if (this.data.phone && this.data.name && this.data.selectedBuildingNumber && this.data.selectedDormitoryNumber && this.data.selectedWaterType && this.data.quantity > 0) {
      const postData = {
        buyer: this.data.name,
        phone: this.data.phone,
        building: this.data.selectedBuildingNumber,
        room: this.data.selectedDormitoryNumber,
        type: this.data.selectedWaterType,
        number: this.data.quantity
      };

      wx.request({
        url: 'http://localhost:8088/orderWaterRecord/add',
        method: 'POST',
        data: postData,
        success: (res) => {
          console.log(res);
          if (res.data.msg === '新增成功') {
            wx.showToast({
              title: '购买成功',
            });
            this.addPurchaseRecord();
            this.resetForm();
          } else {
            wx.showToast({
              title: '购买记录插入失败',
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
    } else {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
      });
    }
  },
  addPurchaseRecord: function () {
    const token = wx.getStorageSync('token');
    const buyer = token.data.sname;
    const timestamp = new Date().toLocaleString();
    const record = {
      type: this.data.selectedWaterType,
      time: timestamp,
      number: this.data.quantity,
      buyer: buyer
    };
    const purchaseRecords = this.data.purchaseRecords;
    purchaseRecords.unshift(record);
    if (purchaseRecords.length > 7) {
      purchaseRecords.splice(7);
    }
    this.setData({
      purchaseRecords: purchaseRecords
    });
  },
  resetForm: function () {
    this.setData({
      quantity: 0,
    });
  },
});
