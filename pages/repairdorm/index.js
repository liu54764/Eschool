// 页面逻辑部分的 JavaScript 文件

Page({
  data: {
    buildingNumbers: ['1号楼', '2号楼', '3号楼', '4号楼'], // 示例楼号数据
    dormitoryNumbers: ['101', '102', '103', '104'], // 示例寝室号数据
    repairItems: ['电器', '水管', '家具', '其他'], // 示例报修物品数据
    selectedBuildingNumber: '', // 选中的楼号
    selectedDormitoryNumber: '', // 选中的寝室号
    selectedRepairItem: '', // 选中的报修物品
    phoneNumber: '', // 联系电话
    showRecordModal: false, // 是否显示报修记录对话框
    repairRecords: [], // 报修记录数据
    text:'',
  },

  showRepairRecord() {
    // TODO: 根据需要从后端获取报修记录数据，并存储到 repairRecords 中
    // 示例代码，你需要根据实际情况进行调整
    const records = ['2022-01-01 10:00:00 - 电器报修', '2022-01-02 11:00:00 - 水管报修'];
    this.setData({
      repairRecords: records,
      showRecordModal: true,
    });
  },

  hideRecordModal() {
    this.setData({
      showRecordModal: false,
    });
  },

  handleBuildingSelect(event) {
    const selectedBuildingNumber = this.data.buildingNumbers[event.detail.value];
    this.setData({
      selectedBuildingNumber: selectedBuildingNumber,
    });
  },

  handleDormitorySelect(event) {
    const selectedDormitoryNumber = this.data.dormitoryNumbers[event.detail.value];
    this.setData({
      selectedDormitoryNumber: selectedDormitoryNumber,
    });
  },

  handleRepairItemSelect(event) {
    const selectedRepairItem = this.data.repairItems[event.detail.value];
    this.setData({
      selectedRepairItem: selectedRepairItem,
    });
  },

  handlePhoneInput(event) {
    const phoneNumber = event.detail.value;
    this.setData({
      phoneNumber: phoneNumber,
    });
  },

  submitRepair() {
    // TODO: 提交报修申请的逻辑
    const {
      selectedBuildingNumber,
      selectedDormitoryNumber,
      selectedRepairItem,
      phoneNumber
    } = this.data;

    if (!selectedBuildingNumber || !selectedDormitoryNumber || !selectedRepairItem || !phoneNumber) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }
    
    // 示例代码，你需要根据实际情况进行调整
    const repairInfo = {
      building: selectedBuildingNumber,
      dormitory: selectedDormitoryNumber,
      item: selectedRepairItem,
      phone: phoneNumber,
    };
    console.log(repairInfo)
    // 提示报修申请提交成功
    wx.showToast({
      title: '报修申请提交成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        // 清空表单数据
        this.setData({
          selectedBuildingNumber: '',
          selectedDormitoryNumber: '',
          selectedRepairItem: '',
          phoneNumber: '',
          text: '',
        });
      },
    });
  },
});
