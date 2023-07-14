// pages/hot-water-recharge/hot-water-recharge.js
Page({
  data: {
    studentName: '',
    studentID: '',
    balance: 0,
    rechargeAmountOptions: ['10', '20', '50', '100'],  // 充值金额选项
    rechargeAmount: '10', // 默认充值金额
    rechargeRecords: [],  // 充值记录
    showRecordModal: false,   // 是否显示充值记录列表
  },

  onLoad: function () {
    this.getBalance();
    this.getRecord();
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
        if (res.data.msg === '查询成功') {
          const balance = res.data.data.hotWater;
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
      type: "热水"
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
              time: record.time ? new Date(record.time).toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }) : ''
            };
          });
          this.setData({
            rechargeRecords: formattedRecords
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

  handleAmountChange: function (event) {
    const index = event.detail.value;
    const rechargeAmount = this.data.rechargeAmountOptions[index];
    this.setData({
      rechargeAmount: rechargeAmount
    });
  },

  confirmRecharge: function () {
    if (this.data.rechargeAmount) {
      const newBalance = this.data.balance + parseFloat(this.data.rechargeAmount);
      this.setData({
        balance: newBalance
      });
      this.addRechargeRecord(this.data.rechargeAmount);

      const token = wx.getStorageSync('token');
      const sid = token.data.sid;
      const postData = {
        sid: sid,
        type: "热水",
        amount: this.data.rechargeAmount
      };
      wx.request({
        url: 'http://localhost:8088/personRecharge/add',
        method: 'POST',
        data: postData,
        success: (res) => {
          // console.log(res);
          if (res.data.msg === "新增成功") {
            wx.showToast({
              title: '充值成功',
              icon: 'none'
            });
            // console.log('充值成功');
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
  
  addRechargeRecord: function (amount) {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Shanghai' });
    const record = {
      rid: this.data.rechargeRecords.length + 1,
      sid: 1,
      type: "热水",
      amount: parseFloat(amount),
      time: timestamp
    };
  
    const rechargeRecords = this.data.rechargeRecords;
    rechargeRecords.unshift(record);  // 将记录添加到数组开头
    if (rechargeRecords.length > 7) {
      rechargeRecords.splice(7);  // 保留最近的七条记录
    }
  
    this.setData({
      rechargeRecords: rechargeRecords
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
});
