//index.js
const app = getApp()

Page({
  data: {
    nodata: false,
    defaultSearchValue: '',
    navItems: [{ name: '最新', index: 1 }, { name: '热门', index: 2 }, { name: '标签', index: 3 }],
    tabCur: 1,

    nomore: false,
    page: 1,
    filter: "",
    posts: [],

    showHot: false,
    hotItems: ["浏览最多", "评论最多", "点赞最多", "收藏最多"],
    hotCur: 0,
    
    showLabels: false,
    labelList: [],
    labelCur: "全部",

    whereItem:['', 'createTime',''] //下拉查询条件
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
    let tabCur = e.currentTarget.dataset.id
    switch (tabCur) {
      case 1: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          nomore: false,
          nodata: false,
          showHot: false,
          showLabels: false,
          defaultSearchValue: "",
          posts: [],
          page: 1,
          whereItem:['', 'createTime','']
        })
        await that.getPostsList("", 'createTime')
        break
      }
      case 2: {
        that.setData({
          posts: [],
          tabCur: e.currentTarget.dataset.id,
          showHot: true,
          showLabels: false,
          defaultSearchValue: "",
          page: 1,
          nomore: false,
          nodata: false,
          whereItem:['', 'totalVisits','']
        })
        await that.getPostsList("", "totalVisits")
        break
      }
      case 3: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          showHot: false,
          showLabels: true
        })
        let task = that.getPostsList("", 'createTime')
        let labelList = await wx.a.getLabelList()

        that.setData({
          labelList: labelList.result.data
        })
        await task
        break
      }
    }
  },

  /**
   * 热门按钮切换
   * @param {*} e 
   */
  hotSelect: function () {
    let that = this
    let hotCur = e.currentTarget.dataset.id
  },

  /**
   * 标签按钮切换
   * @param {*} e 
   */
  labelSelect: function (e) {
    let that = this
    let labelCur = e.currentTarget.dataset.id
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

    let result = await wx.a.getPostsList(page, filter, 1, orderBy, label)
    console.log(result)
    if (result.data.length === 0) {
      that.setData({
        nomore: true
      })
      if (page === 1) {
        that.setData({
          nodata: true
        })
      }
    } else {
      that.setData({
        page: page + 1,
        posts: that.data.posts.concat(result.data),
      })
    }

    wx.hideLoading()
  },

  /**
   * 点击文章明细
   */
  bindPostDetail: function (e) {
    let blogId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + blogId
    })
  }
})
