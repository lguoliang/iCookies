// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: { avatarUrl: '../../images/gravatar.png' },
    showLogin: false,
    isAuthor: wx.getStorageSync('isAuthor'),
    showRedDot: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this;
    app.checkUserInfo(function (userInfo, isLogin) {
      console.log('userInfo', userInfo, isLogin)
      if (!isLogin) {
        that.setData({
          showLogin: true
        })
      } else {
        that.setData({
          userInfo: userInfo
        });
      }
    });

    let showRedDot = wx.getStorageSync('showRedDot');
    console.info('showRedDot', showRedDot)

    console.info(showRedDot != '1')
    that.setData({
      showRedDot: showRedDot
    });

    await that.checkAuthor()
  },

  /**
   * 获取用户信息
   * @param {} e 
   */
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        showLogin: !this.data.showLogin,
        userInfo: e.detail.userInfo
      });
    } else {
      wx.switchTab({
        url: '../index/index'
      })
    }
  },

  /**
   * 验证是否是管理员
   */
  checkAuthor: async function () {
    let that = this;
    const value = wx.getStorageSync('isAuthor')
    if (value === '') {
      wx.showLoading({ title: '加载中...' })
      let res = await wx.a.checkAuthor();
      wx.setStorageSync('isAuthor', res.result)
      that.setData({
        isAuthor: res.result
      })
      wx.hideLoading()
    }
  },

  /**
   * 清除缓存
   */
  bindRefresh: function () {
    wx.removeStorageSync('isAuthor')
    this.checkAuthor()
  },

  /**
   * 跳转
   */
  toRoute: function (e) {
    let route = {
      // 返回首页
      'index': '/pages/index/index',
      // 我的收藏
      'collection': '../mine/collection/collection?type=1',
      // 我的点赞
      'zan': '../mine/collection/collection?type=2',
      // 我的消息
      'notice': '../mine/notice/notice',
      // 历史版本
      'release': '../mine/release/release',
      // 后台管理
      'admin': '../admin/index'
    }
    wx.navigateTo({
      url: route[e.currentTarget.dataset.name]
    })
  },

  /**
   * 展示打赏二维码
   * @param {} e 
   */
  showQrcode: async function (e) {
    wx.u.toast('TODO')
  },

  /**
   * 展示微信二维码
   * @param {*} e 
   */
  showWechatCode: async function (e) {
    wx.u.toast('TODO')
  }
})