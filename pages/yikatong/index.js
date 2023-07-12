Page({
  data: {
    studentName: '张三',
    studentID: '20070114',
    balance: 50.4,
    rechargeAmountRange: [],  // 充值金额选项
    selectedAmount: '',  // 选择的充值金额
    showModal: false,  // 是否显示模态框
    showToast: false  // 是否显示充值成功提示
  },
  onLoad: function () {
    this.setRechargeAmountRange();
  },
  setRechargeAmountRange: function () {
    const rechargeAmountRange = [];
    for (let i = 0; i <= 300; i += 50) {
      rechargeAmountRange.push(i.toString());
    }
    this.setData({
      rechargeAmountRange: rechargeAmountRange
    });
  },
  showRechargeModal: function () {
    this.setData({
      showModal: true
    });
  },
  hideRechargeModal: function () {
    this.setData({
      showModal: false
    });
  },
  handleAmountSelect: function (event) {
    const selectedAmount = event.currentTarget.dataset.amount;
    this.setData({
      selectedAmount: selectedAmount
    });
  },
  confirmRecharge: function () {
    if (this.data.selectedAmount) {
      // 处理充值金额的逻辑
       console.log(this.data.selectedAmount)
      // 显示充值成功提示
      this.showToast();
      // 关闭模态框
      this.hideRechargeModal();
    } else {
      // 未选择充值金额，进行相应处理
    }
  },
  showToast: function () {
    this.setData({
      showToast: true
    });

    setTimeout(() => {
      this.setData({
        showToast: false
      });
    }, 2000);
  },
  handleRechargeRecords: function () {
    // 处理查看充值记录的逻辑
  },
  handleTransactionRecords: function () {
    // 处理查看交易记录的逻辑
  }
});
