// pages/admin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    formIds: [],
    formIdCount: 0,
    isReleaseShow: false,
    release: { releaseName: '', releaseDate: wx.u.formatTime(new Date()), releaseContent: '' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this;
    let res = await wx.a.queryFormIds();
    that.setData({
      formIdCount: res.result.formIds
    })
  },

})