// 页面逻辑部分的 JavaScript 文件

Page({
  data: {
    shopList: [
      {
        name: '水果店',
        image: '/asset/imgs/card.png',
      },
      {
        name: '超市',
        image: '/asset/imgs/card.png',
      },
    ],
  },

  onLoad() {
    // 从后端获取店铺信息的示例，你需要根据实际情况进行调整
    wx.request({
      url: '后端接口地址',
      success: (res) => {
        if (res.statusCode === 200) {
          const shopList = res.data;
          this.setData({
            shopList: shopList,
          });
        } else {
          console.error('获取店铺信息失败');
        }
      },
      fail: () => {
        console.error('请求失败，请检查网络连接');
      },
    });
  },

  goToShopDetail(event) {
    const shopIndex = event.currentTarget.dataset.index;
    const selectedShop = this.data.shopList[shopIndex];
    // 跳转到店铺商品页面，并传递选中店铺的信息
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?shop=' + JSON.stringify(selectedShop),
    });
  },
});
