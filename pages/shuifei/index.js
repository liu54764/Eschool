Page({
  data: {
    currentTime: '',
    currentDate: '',
    waterBalance: 0,
    buildingNumber: '28',
    dormNumber: '408',
    buildingOptions: [],
    dormOptions: [],
    selectedBuilding: '1',
    selectedDorm: '101',
    rechargeAmountOptions: ['10', '20', '50', '100'],
    rechargeAmount: '10',
    showRecordModal: false,
    purchaseRecords: [],
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
      buildingNumber: building,
      dormNumber: room,
    });
    const postData = {
      room: room,
      building: building
    };
    wx.request({
      url: 'http://localhost:8088/dorm/inquire',
      method: "POST",
      data: postData,
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
      room: room,
      building: building,
      type: "水"
    };
    wx.request({
      url: 'http://localhost:8088/dormRecharge/list',
      method: 'POST',
      data: postData,
      success: (res) => {
        // console.log(res);
        if (res.data.msg === "查询成功") {
          const rechargeRecords = res.data.data;
          const formattedRecords = rechargeRecords.map(record => {
            return {
              rid: record.rid,
              buyer: record.buyer,
              type: record.type,
              amount: record.amount,
              time: record.time ? new Date(record.time).toLocaleString() : '',
              sid: record.sid
            };
          });
          this.setData({
            purchaseRecords: formattedRecords
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
    const token = wx.getStorageSync('token');
    const room = token.data.room;
    const building = token.data.building;
    const type = '水';
    const amount = parseFloat(this.data.rechargeAmount);
    const buyer = token.data.sname;

    const postData = {
      room: room,
      building: building,
      type: type,
      amount: amount,
      buyer: buyer
    };
    wx.request({
      url: 'http://localhost:8088/dormRecharge/add',
      method: 'POST',
      data: postData,
      success: (res) => {
        console.log(res);
        if (res.data.msg === '新增成功') {
          wx.request({
            url: 'http://localhost:8088/dorm/recharge',
            method: 'POST',
            data: postData, 
          });
          wx.showToast({
            title: '充值成功',
          });

          this.addPurchaseRecord();
          const newBalance = this.data.waterBalance + amount;
          this.setData({
            waterBalance: newBalance
          });
        } else {
          wx.showToast({
            title: '充值失败',
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
  addPurchaseRecord: function () {
    const token = wx.getStorageSync('token');
    const buyer = token.data.sname;
    const timestamp = new Date().toLocaleString();
    const record = {
      amount: this.data.rechargeAmount,
      time: timestamp,
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
  }
  
});
