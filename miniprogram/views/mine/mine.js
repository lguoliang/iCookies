// views/mine/mine.js
// const config = require('../../utils/config.js')
const api = require('../../utils/api.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showLogin: false,
    isAuthor: false,
    showRedDot: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this;
    app.checkUserInfo(function (userInfo, isLogin) {
      console.log(userInfo, isLogin)
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
    console.info(showRedDot)

    console.info(showRedDot != '1')
    that.setData({
      showRedDot: showRedDot
    });


    await that.checkAuthor()
  },

  /**
   * 返回
   */
  navigateBack: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
  },
  /**
   * 获取用户头像
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
  checkAuthor: async function (e) {
    let that = this;
    const value = wx.getStorageSync('isAuthor')
    if (value) {
      console.info(value)
      that.setData({
        isAuthor: value
      })
    }
    else {
      let res = await api.checkAuthor();
      console.info('checkAuthor', res)
      wx.setStorageSync('isAuthor', res.result)
      that.setData({
        isAuthor: res.result
      })
    }
  }
})