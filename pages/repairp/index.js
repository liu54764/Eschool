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
  },
  onLoad: function () {
    this.getRecord();
  },
  getRecord(){
    const token = wx.getStorageSync('token');
    const name = token.data.sname;
    const studentID = token.data.sid;
    this.setData({
      name:name,  // 示例楼号
      studentID: studentID, 
      phoneNumber:token.data.phone
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

  submitRepair() {
    // 进行报修提交逻辑
    const record = `姓名：${this.data.name}，学号：${this.data.studentID}，报修物品：${this.data.selectedRepairItem}，报修原因：${this.data.reason}，联系电话：${this.data.phoneNumber}`;

    // 模拟报修提交成功后更新记录
    const repairRecords = this.data.repairRecords;
    repairRecords.unshift(record);  // 将记录添加到数组开头
    if (repairRecords.length > 7) {
      repairRecords.splice(7);  // 保留最近的七条记录
    }

    this.setData({
      repairRecords: repairRecords
    });

    wx.showToast({
      title: '报修成功',
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
