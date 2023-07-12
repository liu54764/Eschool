Page({
  data: {
    currentTime: '',  // 当前时间
    currentDate: '',  // 当前日期，示例：2023年7月12日
    electricityBalance: 50.5,  // 示例水费余额
    buildingNumber: '28',  // 示例楼号
    dormNumber: '408',  // 示例寝室号
    buildingOptions: [],  // 楼号选项
    dormOptions: [],  // 寝室号选项
    selectedBuilding: '1',  // 已选择的楼号
    selectedDorm: '101',  // 已选择的寝室号
    rechargeAmountOptions: ['10', '20', '50', '100'],  // 充值金额选项
    rechargeAmount: '10'  // 默认充值金额
  },
  onLoad: function () {
    this.setCurrentDate();
    this.updateTime();
    this.setBuildingOptions();
  },
  updateTime: function () {
    const self = this;
    setInterval(function () {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      self.setData({
        currentTime: time
      });
    }, 1000);
  },
  setCurrentDate: function () {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      currentDate: `${year}年${month}月${day}日`
    });
  },
  setBuildingOptions: function () {
    const buildingOptions = [];
    for (let i = 1; i <= 30; i++) {
      buildingOptions.push(i.toString());
    }
    this.setData({
      buildingOptions: buildingOptions
    });
  },
  handleBuildingChange: function (event) {
    const index = event.detail.value;
    const selectedBuilding = this.data.buildingOptions[index];
    // 根据楼号获取对应的寝室号选项，示例代码中直接使用固定的寝室号选项
    const dormOptions = ['101', '201', '301', '401', '501'];
    this.setData({
      selectedBuilding: selectedBuilding,
      selectedDorm: '101',
      dormOptions: dormOptions
    });
  },
  handleDormChange: function (event) {
    const index = event.detail.value;
    const selectedDorm = this.data.dormOptions[index];
    this.setData({
      selectedDorm: selectedDorm
    });
  },
  handleQueryClick: function () {
    // 处理电量查询按钮点击事件
    // 添加你的逻辑代码
  },
  handleAmountChange: function (event) {
    const index = event.detail.value;
    const rechargeAmount = this.data.rechargeAmountOptions[index];
    this.setData({
      rechargeAmount: rechargeAmount
    });
  },
  handleRechargeClick: function () {
    wx.showToast({
      title: '充值成功',
    })
    // 处理立即充值按钮点击事件
    // 添加你的逻辑代码
    const newBalance = this.data.electricityBalance + parseFloat(this.data.rechargeAmount);
    this.setData({
      electricityBalance: newBalance
    });
  }
});
