// views/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodata: true,
    nomore: false,
    // 
    defaultSearchValue: '',
    // 
    navItems: [{ name: '最新', index: 1 }, { name: '热门', index: 2 }, { name: '标签', index: 3 }],
    tabCur: 1,
    // scrollLeft: 0,

    showHot: false,
    hotItems: ["浏览最多", "评论最多", "点赞最多", "收藏最多"],
    hotCur: 0,

    showLabels: false,
    labelList: [],
    labelCur: "全部",
    //
    posts: [{
      title: 'title',
      defaultImageUrl: 'https://picsum.photos/id/20/180/180',
      createTime: '2019-10-11',
      totalVisits: 12,
      totalZans: 122,
      totalComments: 12
    },{},{}], // 文章
    page: 1,
    filter: "",

    // whereItem:['', 'createTime','']//下拉查询条件
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.getPostsList('', 'createTime')
  },
  /**
 * tab切换
 * @param {} e 
 */
  tabSelect: async function (e) {
    let that = this
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
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})