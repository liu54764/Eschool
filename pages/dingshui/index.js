Page({
  data: {
    buildingNumbers: ['1', '2', '3', '4', '5'],  // 可选的楼号
    selectedBuildingNumber: '',  // 选择的楼号
    dormitoryNumbers: ['101', '102', '201', '202', '301'],  // 可选的寝室号
    selectedDormitoryNumber: '',  // 选择的寝室号
    waterTypes: ['农夫山泉', '莫干山泉', '百岁山', '怡宝'],  // 可选的桶装水类型
    selectedWaterType: '',  // 选择的桶装水类型
    quantity: 0,  // 购买数量
    name: '',  // 姓名
    phone: '',  // 电话
    showRecordModal: false,  // 是否显示购买记录对话框
    purchaseRecords: []  // 购买记录
  },
  showPurchaseHistory: function () {
    this.setData({
      showRecordModal: true
    });
  },
  hideRecordModal: function () {
    this.setData({
      showRecordModal: false
    });
  },
  handleNameInput: function (event) {
    this.setData({
      name: event.detail.value
    });
  },
  handlePhoneInput: function (event) {
    this.setData({
      phone: event.detail.value
    });
  },
  handleBuildingSelect: function (event) {
    const selectedBuildingNumber = this.data.buildingNumbers[event.detail.value];
    this.setData({
      selectedBuildingNumber: selectedBuildingNumber
    });
  },
  handleDormitorySelect: function (event) {
    const selectedDormitoryNumber = this.data.dormitoryNumbers[event.detail.value];
    this.setData({
      selectedDormitoryNumber: selectedDormitoryNumber
    });
  },
  handleWaterTypeSelect: function (event) {
    const selectedWaterType = this.data.waterTypes[event.detail.value];
    this.setData({
      selectedWaterType: selectedWaterType
    });
  },
  decreaseQuantity: function () {
    if (this.data.quantity > 0) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },
  increaseQuantity: function () {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },
  purchaseWater: function () {
    if ( this.data.phone&&this.data.name&&this.data.selectedBuildingNumber && this.data.selectedDormitoryNumber && this.data.selectedWaterType && this.data.quantity > 0) {
      // 处理购买桶装水的逻辑

      wx.showToast({
        title: '购买成功',
      })
      // console.log(this.data.selectedWaterType)
      // 添加购买记录
      this.addPurchaseRecord();

      // 清空表单数据
      this.resetForm();
    } else {
      // 表单信息不完整，进行相应处理
      wx.showToast({
        title: '购买失败',
        icon:'error'
      })

    }
  },
  addPurchaseRecord: function () {
    const timestamp = new Date().toLocaleString();
    const record = `购买 ${this.data.quantity} 桶 ${this.data.selectedWaterType} - ${timestamp}`;

    const purchaseRecords = this.data.purchaseRecords;
    purchaseRecords.unshift(record);  // 将记录添加到数组开头
    if (purchaseRecords.length > 7) {
      purchaseRecords.splice(7);  // 保留最近的五条记录
    }

    this.setData({
      purchaseRecords: purchaseRecords
    });
  },
  resetForm: function () {
    this.setData({
      address: '',
      name: '',
      phone: '',
      selectedBuildingNumber: '',
      selectedDormitoryNumber: '',
      selectedWaterType: '',
      quantity: 0
    });
  }
});
