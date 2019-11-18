//index.js
const app = getApp()

Page({
  data: {
    nodata: true,
    defaultSearchValue: '',
    navItems: [{ name: '最新', index: 1 }, { name: '热门', index: 2 }, { name: '标签', index: 3 }],
    tabCur: 1,

    nomore: false,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function() {
    await this.getPostsList('', 'createTime')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 搜索功能
   * @param {} e 
   */
  async bindconfirm (e) {
    // TODO
    console.log('搜索')
  },

  /**
   * tab切换
   * @param {} e 
   */
  async tabSelect (e) {
    let that = this;
    console.log(e);
    let tabCur = e.currentTarget.dataset.id
    switch (tabCur) {
      case 1: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          showHot: false,
          showLabels: false
        })
        break
      }
      case 2: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          showHot: true,
          showLabels: false
        })
        break
      }
      case 3: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          showHot: false,
          showLabels: true
        })
        break
      }
    }
  },

  /**
   * 热门按钮切换
   * @param {*} e 
   */
  hotSelect: function () {},

  /**
   * 标签按钮切换
   * @param {*} e 
   */
  labelSelect: function () {},

  /**
   * 获取文章列表
   */
  getPostsList: async function (filter, orderBy, label) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let page = that.data.page

    if (that.data.nomore) {
      wx.hideLoading()
      return
    }

    // let result = await api.getPostsList(page, filter, 1, orderBy, label)
    wx.a.test()
  },

  /**
   * 点击文章明细
   */
  bindPostDetail: function () {}
})
