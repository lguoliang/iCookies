// pages/admin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false, // formid
    formIds: [],
    formIdCount: 0,
    isReleaseShow: false,
    release: { releaseName: '', releaseDate: wx.u.formatTime(new Date()), releaseContent: '' }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // TODO
    /*let that = this;
    let res = await api.queryFormIds();
    that.setData({
      formIdCount: res.result.formIds
    })*/
  },

  /**
   * 隐藏 & 显示弹窗
   */
  handleFormid () {
    this.setData({
      isShow: !this.data.isShow
    })
  },

  handleRelease() {
    this.setData({
      isReleaseShow: !this.data.isReleaseShow
    })
  },
  
  /**
   * 生成formId
   * @param {*} e 
   */
  formSubmit: function (e) {
    // TODO
    wx.u.toast('formSubmit')
  },

  /**
   * 保存发布版本
   * @param {*} e 
   */
  formRelaeaseSubmit: async function (e) {
    // TODO
    wx.u.toast('formRelaeaseSubmit')
  },
  /**
   * 批量保存formIds
   * @param {} e 
   */
  saveFormIds: async function (e) {
    // TODO
    wx.u.toast('saveFormIds')
  },


  /**
   * 跳转
   */
  toRoute: function (e) {
    let route = {
      // 文章管理
      'articleList': '../admin/articleList/articleList',
      // 评论管理
      'comment': '../admin/comment/comment',
      // 专题管理
      'classify': '../admin/classify/classify',
      // 标签管理
      'labelList': '../admin/labelList/labelList',
      // subscribe
      'subscribe': '../admin/subscribe/subscribe'
    }
    wx.navigateTo({
      url: route[e.currentTarget.dataset.name]
    })
  }
})