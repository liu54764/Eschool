Page({
  data: {
    currentTime: '',  // 当前时间
    currentDate: '',  // 当前日期，示例：2023年7月12日
    waterBalance: 0,  // 示例水费余额
    buildingNumber: '28',  // 示例楼号
    dormNumber: '408',  // 示例寝室号
    buildingOptions: [],  // 楼号选项
    dormOptions: [],  // 寝室号选项
    selectedBuilding: '1',  // 已选择的楼号
    selectedDorm: '101',  // 已选择的寝室号
    rechargeAmountOptions: ['10', '20', '50', '100'],  // 充值金额选项
    rechargeAmount: '10',  // 默认充值金额
    showRecordModal: false,  // 是否显示购买记录对话框
    purchaseRecords: [],  // 购买记录
  },
  onLoad: function () {
    this.getBalance();
    this.setCurrentDate();
    this.updateTime();
    this.setBuildingOptions();
    this.getRecord();
  },
  getBalance: function () {
    const token = wx.getStorageSync('token');
    const room = token.data.room;
    const building = token.data.building;
    this.setData({
      buildingNumber:building,  // 示例楼号
      dormNumber: room, 
    });
    const postData = {
      room:room,
      building:building
    }
    wx.request({
      url: 'http://localhost:8088/dorm/inquire',
      method:"POST",
      data:postData,
      success: (res) => {
        console.log(res);
        if (res.data.msg === '查询成功') {
          const balance = res.data.data.water;
          this.setData({
            waterBalance: balance
          });
          console.log('余额：', balance);
        } else {
          wx.showToast({
            title: '获取余额失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败，请检查网络连接',
          icon: 'none'
        });
      }
    });
  },
  getRecord: function () {
    const token = wx.getStorageSync('token');
    const room = token.data.room;
    const building = token.data.building;
    const postData = {
      room:3,
      building:202,
      type: "水"
    };
    wx.request({
      url: 'http://localhost:8088/personRecharge/list',
      method: 'POST',
      data: postData,
      success: (res) => {
        console.log(res);
        if (res.data.msg === "查询成功") {
          const rechargeRecords = res.data.data;
          const formattedRecords = rechargeRecords.map(record => {
            return {
              rid: record.rid,
              sid: record.sid,
              type: record.type,
              amount: record.amount,
              time: record.time ? new Date(record.time).toLocaleString() : ''
            };
          });
          this.setData({
            rechargeRecords: formattedRecords
          });
          console.log('充值记录：', formattedRecords);
        } else {
          wx.showToast({
            title: '获取充值记录失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '请求失败，请检查网络连接',
          icon: 'none'
        });
      }
    });
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
    this.addPurchaseRecord();
    // 处理立即充值按钮点击事件
    // 添加你的逻辑代码
    const newBalance = this.data.waterBalance + parseFloat(this.data.rechargeAmount);
    this.setData({
      waterBalance: newBalance
    });
  }
  ,
  addPurchaseRecord: function () {
    const timestamp = new Date().toLocaleString();
    const record = `充值 ${this.data.rechargeAmount} 元  - ${timestamp}`;

    const purchaseRecords = this.data.purchaseRecords;
    purchaseRecords.unshift(record);  // 将记录添加到数组开头
    if (purchaseRecords.length > 7) {
      purchaseRecords.splice(7);  // 保留最近的五条记录
    }

    this.setData({
      purchaseRecords: purchaseRecords
    });
  },
});
