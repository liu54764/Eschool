Page({
  data: {
    tabList: ['全部订单', '待帮助', '已完成'], // 切换的分类列表
    tabNow: 0, // 当前选中的分类索引
    orders: [], // 存储所有订单数据的数组
    ordersWait: [], // 存储待帮助订单数据的数组
    ordersDone: [] // 存储已帮助订单数据的数组
  },

  onLoad: function () {
    // 页面加载时，初始化订单数据，从后端 API 获取订单数据
    this.fetchOrders();
  },

  fetchOrders: function () {
    wx.request({
      url: "http://localhost:8088/legwork/listAll",
      method: 'POST',
      success: (res) => {
        // console.log(res)
        // 假设后端返回的数据为 res.data，其中包含所有订单信息
        const ordersList = res.data.data;
          // console.log(ordersList)
        // 将所有订单数据存入 orders 数组
        this.setData({
          orders: ordersList
        });
         
        // 根据订单状态将订单数据分类存入 ordersWait 和 ordersDone 数组
        const ordersWait = ordersList.filter(item => item.status === '待帮助');
        const ordersDone = ordersList.filter(item => item.status === '已完成');

        this.setData({
          ordersWait: ordersWait,
          ordersDone: ordersDone
        });
      },
      fail: (error) => {
        // 请求失败处理，可以进行提示或其他逻辑
        console.error('请求订单数据失败:', error);
      }
    });
  },

  // 选择不同分类的点击事件
  selectTab: function (event) {
    const tabNow = event.currentTarget.dataset.id;
    this.setData({
      tabNow: tabNow
    });
  },

 // 接单点击事件
 acceptOrder: function (event) {
  const orderId = event.currentTarget.dataset.hid;
  wx.request({
    url: "http://localhost:8088/legwork/editOrder",
    method: 'POST',
    data: {
      hid: orderId
    },
    success: (res) => {
      // 接单成功的处理逻辑
      console.log('接单成功，订单ID为：', orderId);
      console.log('后端返回数据：', res.data);
      this.fetchOrders();
      // const updatedOrder = this.data.orders.find(item => item.hid === orderId);
      // if (updatedOrder) {
      //   updatedOrder.status = '已接单';
      //   this.setData({
      //     orders: this.data.orders
      //   });
      // }
    },
    fail: (error) => {
      // 接单失败的处理逻辑
      console.error('接单失败，订单ID为：', orderId);
      console.error('错误信息：', error);
    }
  });
}
});
