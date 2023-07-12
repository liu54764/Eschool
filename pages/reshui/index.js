Page({
  data: {
    studentName: '张三',
    studentID: '20070114',
    balance: 0,
    rechargeAmountOptions: ['10', '20', '50', '100'],  // 充值金额选项
    rechargeAmount: '10' , // 默认充值金额
    rechargeRecords: [],  // 充值记录
    showRecordList: false  // 是否显示充值记录列表
  },
  onLoad: function () {
    this.loadBalance();
  },
  // setRechargeAmountRange: function () {
  //   const rechargeAmountRange = [];
  //   for (let i = 10; i <= 100; i += 10) {
  //     rechargeAmountRange.push(i.toString());
  //   }
  //   this.setData({
  //     rechargeAmountRange: rechargeAmountRange
  //   });
  // },
  loadBalance: function () {
    // 从后端或其他数据源加载学生热水卡的余额
    // 示例：假设余额为 50.4 元
    this.setData({
      balance: 50.4
    });
  },
  // handleAmountSelect: function (event) {
  //   const rechargeAmount = this.data.rechargeAmountRange[event.detail.value];
  //   this.setData({
  //     rechargeAmount: rechargeAmount
  //   });
  // },
  handleAmountChange: function (event) {
    const index = event.detail.value;
    const rechargeAmount = this.data.rechargeAmountOptions[index];
    this.setData({
      rechargeAmount: rechargeAmount
    });
  },
  confirmRecharge: function () {
    if (this.data.rechargeAmount) {
      // 处理充值金额的逻辑
      wx.showToast({
        title: '充值成功',
      })
      console.log(this.data.rechargeAmount)
      // 模拟充值成功后更新余额
      const newBalance = this.data.balance + parseFloat(this.data.rechargeAmount);
      this.setData({
        balance: newBalance
      });

      // 添加充值记录
      this.addRechargeRecord(this.data.rechargeAmount);
    } else {
      // 未选择充值金额，进行相应处理
    }
  },
  addRechargeRecord: function (amount) {
    const timestamp = new Date().toLocaleString();
    const record = `充值 ${amount} 元 - ${timestamp}`;

    const rechargeRecords = this.data.rechargeRecords;
    rechargeRecords.unshift(record);  // 将记录添加到数组开头
    if (rechargeRecords.length > 7) {
      rechargeRecords.splice(7);  // 保留最近的五条记录
    }

    this.setData({
      rechargeRecords: rechargeRecords
    });
  },
  showRechargeRecords: function () {
    const showRecordList = !this.data.showRecordList;
    this.setData({
      showRecordList: showRecordList
    });
  }
});
