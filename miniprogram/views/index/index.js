// views/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts: [{},{},{}], // 文章
    nodata: true,

    navItems: [{ name: '最新', index: 1 }, { name: '热门', index: 2 }, { name: '标签', index: 3 }],
    tabCur: 1,
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
          tabCur: e.currentTarget.dataset.id
        })
        break
      }
      case 2: {
        that.setData({
          tabCur: e.currentTarget.dataset.id
        })
        break
      }
      case 3: {
        that.setData({
          tabCur: e.currentTarget.dataset.id
        })
        break
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})