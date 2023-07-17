Page({
  data: {
    studentName: '',
    studentID: '',
    balance: 0,
    rechargeAmountRange: [],  // 充值金额选项
    selectedAmount: '',  // 选择的充值金额
    showModal: false,  // 是否显示模态框
    showToast: false, // 是否显示充值成功提示
    showRecordModal: false,  // 是否显示购买记录对话框
    purchaseRecords: [],  // 购买记录
    showTransactionRecords: false, // 控制交易记录显示状态，默认为隐藏
    transactionRecords:  [
    ], // 交易记录数据，根据实际情况进行设置
  },

  onLoad: function () {
    this.getBalance();
    this.setRechargeAmountRange();
    this.getRecord();
    this.getRecord1();
  },

  getBalance: function () {
    const token = wx.getStorageSync('token');
    const sid = token.data.sid;
    this.setData({
      studentName:token.data.sname,
      studentID: sid,
    });
    wx.request({
      url: 'http://localhost:8088/student/inquire?sid=' + sid,
      success: (res) => {
        // console.log(res);
        if (res.data.msg === '查询成功') {
          const balance = res.data.data.cardAmount;
          this.setData({
            balance: balance
          });
          // console.log('余额：', balance);
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
    const sid = token.data.sid;
    const postData = {
      sid: sid,
      type: "一卡通"
    };
    wx.request({
      url: 'http://localhost:8088/personRecharge/list',
      method: 'POST',
      data: postData,
      success: (res) => {
        // console.log(res);
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
            purchaseRecords: formattedRecords
          });
          // console.log('充值记录：', formattedRecords);
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
  getRecord1: function () {
    const token = wx.getStorageSync('token');
    const sid = token.data.sid;
    const postData = {
      sid: sid,
    };
    wx.request({
      url: 'http://localhost:8088/consumerRecord/list',
      method: 'POST',
      data: postData,
      success: (res) => {
        console.log(res);
        if (res.data.msg === "查询成功") {
          const rechargeRecords = res.data.data;
          const formattedRecords = rechargeRecords.map(record => {
            return {
              sid: record.sid,
              type: record.type,
              address:record.address,
              amount: record.amount,
              time: record.time ? new Date(record.time).toLocaleString() : ''
            };
          });
          this.setData({
            transactionRecords: formattedRecords
          });
        } else {
          wx.showToast({
            title: '获取交易记录失败',
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
  setRechargeAmountRange: function () {
    const rechargeAmountRange = [];
    for (let i = 50; i <= 300; i += 50) {
      rechargeAmountRange.push(i.toString());
    }
    this.setData({
      rechargeAmountRange: rechargeAmountRange
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
      const token = wx.getStorageSync('token');
      const sid = token.data.sid;
      const postData = {
        sid: sid,
        type: "一卡通",
        amount: parseFloat(this.data.selectedAmount)
      };
      wx.request({
        url: 'http://localhost:8088/student/recharge',
        method: 'POST',
        data: postData,
        success: (res) => {
          console.log(res);
          if (res.data.msg === "充值成功") {
            wx.request({
              url: 'http://localhost:8088/personRecharge/add',
              method: 'POST',
              data: postData, 
            });
            const newBalance = this.data.balance + parseFloat(this.data.selectedAmount);
            this.setData({
              balance: newBalance
            });
            this.addPurchaseRecord();
            this.showToast();
            this.hideRechargeModal();
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
    } else {
      wx.showToast({
        title: '请选择充值金额',
        icon: 'none'
      });
    }
  },
  
  addPurchaseRecord: function () {
    const timestamp = new Date().toLocaleString();
    const record = {
      rid: this.data.purchaseRecords.length + 1,
      sid: this.data.studentID,
      type: "一卡通",
      amount: parseFloat(this.data.selectedAmount),
      time: timestamp
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

  handleTransactionRecords() {
    // 点击交易记录按钮后，切换显示状态
    this.setData({
      showTransactionRecords: !this.data.showTransactionRecords,
    });
  },
});
