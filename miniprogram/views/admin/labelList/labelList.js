// views/admin/labelList/labelList.js
const api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navItems: [{ name: '未关联', index: 1 }, { name: '已关联', index: 2 }],
    tabCur: 1,
    scrollLeft: 0,
    btnName: "保存关联",
    curLabelName: "",
    labelList: [{value: 'asd'},{value: 'zxc'}],
    isLabelModelShow: false,
    isLabelRelatedShow: false,
    nomore: false,
    nodata: false,
    page: 1,
    filter: {},
    posts: [],
    checkedList: [],
    canOperate: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.getLabelList()
  },

  /**
   * 获取label集合
   * @param {*} e 
   */
  getLabelList: async function () {
    let that = this
    let labelList = await api.getLabelList()
    console.info(labelList)
    that.setData({
      labelList: labelList.result.data
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    let that = this;
    that.setData({
      labelList: []
    })
    await this.getLabelList()
    wx.stopPullDownRefresh();
  },
  /**
    * 显示
    * @param {} e 
  */
  showLabelModal(e) {
    this.setData({
      isLabelModelShow: true
    })
  },
  showLabelRelatedModal: async function (e) {
    let that = this
    let curLabelName = e.currentTarget.dataset.labelname
    let filter = {
      isShow: 1,
      containLabel: 2,
      label: curLabelName
    }

    that.setData({
      curLabelName: curLabelName,
      isLabelRelatedShow: true,
      filter: filter,
      nomore: false,
      nodata: false,
      page: 1,
      posts: [],
      checkedList: [],
      canOperate: true
    })

    await that.getPostsList(filter)
  },
  hideLabelModal(e) {
    this.setData({
      isLabelModelShow: false
    })
  },
  /**
   * 保存标签
   * @param {*} e 
   */
  formLabelSubmit: async function (e) {
    let that = this;
    let labelName = e.detail.value.labelName;
    if (labelName === undefined || labelName === "") {
      wx.showToast({
        title: '请填写正确的标签',
        icon: 'none',
        duration: 1500
      })
    }
    else {
      wx.showLoading({
        title: '保存中...',
      })

      let res = await api.addBaseLabel(labelName)
      console.info(res)
      wx.hideLoading()
      if (res.result) {
        that.setData({
          isLabelModelShow: false,
          labelName: ""
        })

        that.onPullDownRefresh()

        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 1500
        })
      }
      else {
        wx.showToast({
          title: '保存出错，请查看云函数日志',
          icon: 'none',
          duration: 1500
        })
      }
    }
  },
  /**
   * 返回上一页
   * @param {*} e 
   */
  goback: async function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
 * 获取文章列表
 */
  getPostsList: async function (filter) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this
    let page = that.data.page
    if (that.data.nomore) {
      wx.hideLoading()
      return
    }
    let result = await api.getNewPostsList(page, filter)
    if (result.data.length === 0) {
      that.setData({
        nomore: true
      })
      if (page === 1) {
        that.setData({
          nodata: true
        })
      }
    }
    else {
      that.setData({
        page: page + 1,
        posts: that.data.posts.concat(result.data),
      })
    }
    that.setData({
      canOperate: true
    })
    wx.hideLoading()
  },
  /**
   * tab切换
   * @param {} e 
   */
  tabSelect: async function (e) {
    let that = this;
    let tabCur = e.currentTarget.dataset.id
    let filter;
    if (tabCur === 1) {
      filter = {
        isShow: 1,
        containLabel: 2,
        label: that.data.curLabelName
      }
    }
    else {
      filter = {
        isShow: 1,
        containLabel: 1,
        label: that.data.curLabelName
      }
    }

    that.setData({
      tabCur: tabCur,
      btnName: tabCur === 1 ? "保存关联" : "取消关联",
      scrollLeft: (tabCur - 1) * 60,
      nomore: false,
      nodata: false,
      page: 1,
      posts: [],
      filter: filter,
      checkedList: []
    })
    await that.getPostsList(filter)
  }
})