// pages/admin/articleList/articleList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    posts: [],
    nodata: false,
    nomore: false,

    filter: "",

    isShowModel: false, // 展示文章选项
    showModelContent: "",
    
    isShowDeleteModel: false, // 展示标签选项
    showCurPostId: "",//当前操作的文章id
    showCurStatus: 0,
    selectedLabels: [],
    otherLabels: [],
    isShowLabelModel: false,
    isShowClassifyModel: false,
    classifyList: [],
    showCurClassify: "",
    
    navItems: ['已展示', '未展示', '有专题', '无专题', '有标签', '无标签'],
    tabCur: 0,
    scrollLeft: 0,
    where: { isShow: 1 }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: async function (options) {
    let that = this;
    that.setData({
      page: 1,
      posts: [],
      nomore: false,
      nodata: false
    })
    let where = {
      isShow: 1
    }
    await this.getPostsList(where)
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    console.log(123123123)
    let where = this.data.where
    await this.getPostsList(where)
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: async function () {
    let that = this;
    let page = 1
    that.setData({
      page: page,
      posts: [],
      nomore: false,
      nodata: false
    })
    await this.getPostsList(that.data.where)
    wx.stopPullDownRefresh();
  },

  /**
  * 筛选
  * @param {} e 
  */
  tabSelect: async function (e) {
    let that = this;
    let tabCur = e.currentTarget.dataset.id
    let tabItem = this.data.navItems[tabCur]
    console.log(tabItem)
    let where = {}
    that.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      nomore: false,
      nodata: false,
      defaultSearchValue: "",
      posts: [],
      page: 1
    })
    switch (tabItem) {
      case '已展示': {
        where.isShow = 1
        break
      }
      case '未展示': {
        where.isShow = 0
        break
      }
      case '有专题': {
        where.hasClassify = 1;
        break
      }
      case '无专题': {
        where.hasClassify = 2;
        break;
      }
      case '有标签': {
        where.hasLabel = 1;
        break;
      }
      case '无标签': {
        where.hasLabel = 2;
        break
      }
    }

    that.setData({
      where: where
    })
    await that.getPostsList(where)
  },
  /**
   * 搜索功能
   * @param {} e 
   */
  bindconfirm: async function (e) {
    let that = this;
    console.log('e.detail.value', e.detail.value.searchContent)
    let page = 1
    that.setData({
      page: page,
      posts: [],
      filter: e.detail.value.searchContent,
      nomore: false,
      nodata: false
    })
    await this.getPostsList(e.detail.value.searchContent, -1)
  },

  /**
   * 点击文章明细
   */
  bindPostDetail: function (e) {
    let blogId = e.currentTarget.id;
    wx.navigateTo({
      url: '../article/article?id=' + blogId
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
    let result = await wx.a.getNewPostsList(page, filter)
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
    wx.hideLoading()
  },

  // 文章处理
  handlePost(e) {
    let that = this, set = e.currentTarget.dataset
    console.log(set)
    switch (set.type) {
      case 'isShow':
        that.showModal(set)
        break
      case 'classify':
        that.showClassifyModal(set)
        break
      case 'label':
        that.showLabelModal(set)
        break
      case 'delete':
        that.showDeleteModal(set)
        break
    }
  },
  // 展示文章选项
  /**
   * 前端是否展示
   * @param {*} e 
   */
  showModal: function (e) {
    let that = this
    let isShow = e.isshow
    let postId = e.postid
    that.setData({
      isShowModel: true,
      showModelContent: `是否确认将文章设置为[前端${isShow == 1 ? '不展示':'展示'}]`,
      showCurPostId: postId,
      showCurStatus: isShow
    })
  },
  hideShowModal: function (e) {
    this.setData({
      isShowModel: false
    })
  },
  saveShowModal: async function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    try {
      let that = this;
      let updateShow = that.data.showCurStatus == 0 ? 1 : 0
      let res = await wx.a.updatePostsShowStatus(that.data.showCurPostId, updateShow)
      console.info(res)
      if (res.result) {
        that.setData({
          isShowModel: false,
          showModelContent: "",
          showCurPostId: "",
          showCurStatus: -1
        })

        await that.onPullDownRefresh()

        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1500
        })
      }
      else {
        wx.showToast({
          title: '操作发生未知异常',
          duration: 1500
        })
      }
    } catch (err) {
      wx.showToast({
        title: '程序有一点点小异常，操作失败啦',
        icon: 'none',
        duration: 1500
      })
      console.info(err)
    }
    finally {
      wx.hideLoading()
    }
  },
  // 展示文章选项 end

  // 展示专题选项
  showClassifyModal: async function (e) {
    wx.showLoading({
      title: '专题加载中...',
    })

    let that = this
    let postId = e.postid
    let curClassify = e.classify == 0 ? "" : e.classify
    let classifyList = await wx.a.getClassifyList()
    let classify = []
    if (curClassify != "") {
      classify.push({
        name: curClassify,
        checked: true
      })
    }

    for (var index in classifyList.result.data) {

      if (curClassify == classifyList.result.data[index].value.classifyName) {
        continue;
      }

      classify.push({
        name: classifyList.result.data[index].value.classifyName,
        checked: false
      })
    }

    that.setData({
      isShowClassifyModel: true,
      classifyList: classify,
      showCurClassify: curClassify,
      showCurPostId: postId
    })

    wx.hideLoading()
  },
  radioClassifyChange: function (e) {
    let curClassify = e.detail.value
    console.info(curClassify)
    this.setData({
      showCurClassify: curClassify
    })
  },
  hideClassifyModal: function (e) {
    this.setData({
      isShowClassifyModel: false
    })
  },
  saveClassifyModal: async function (e) {
    wx.showLoading({
      title: '保存中...',
    })
    try {
      let that = this
      let postId = that.data.showCurPostId
      console.info(postId)
      console.info(that.data.showCurClassify)
      let newPost = {
        classify: that.data.showCurClassify
      }

      let res = await wx.a.upsertPosts(postId === undefined ? "" : postId, newPost)
      if (res.result) {
        that.setData({
          isShowClassifyModel: false,
          showCurClassify: "",
          classifyList: [],
          showCurPostId: ""
        })

        await that.onPullDownRefresh()

        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1500
        })
      }
      else {
        wx.showToast({
          title: '操作发生未知异常',
          duration: 1500
        })
      }
    }
    catch (err) {
      wx.showToast({
        title: '程序有一点点小异常，操作失败啦',
        icon: 'none',
        duration: 1500
      })
      console.info(err)
    }
    finally {
      wx.hideLoading()
    }
  },
  // 展示专题选项 end

  // 展示标签选项
  showLabelModal: async function (e) {
    wx.showLoading({
      title: '标签加载中...',
    })

    let that = this
    let postId = e.postid
    let label = e.label
    let labelList = await wx.a.getLabelList()
    let otherLabels = []
    if (label.length > 0) {
      for (var i = 0; i < label.length; i++) {
        otherLabels.push({
          name: label[i],
          checked: true
        })
      }
    }

    for (var index in labelList.result.data) {
      let labelRes = otherLabels.filter((a) => labelList.result.data[index].value == a.name)
      if (labelRes.length > 0) { continue; }

      otherLabels.push({
        name: labelList.result.data[index].value,
        checked: false
      })
    }

    that.setData({
      isShowLabelModel: true,
      selectedLabels: label,
      otherLabels: otherLabels,
      showCurPostId: postId
    })

    wx.hideLoading()

  },
  hideLabelModal: function (e) {
    this.setData({
      isShowLabelModel: false
    })
  },
  chooseLabelCheckbox(e) {
    let that = this
    let selectedLabels = that.data.selectedLabels
    let otherLabels = that.data.otherLabels;
    let name = e.currentTarget.dataset.value;
    let checked = e.currentTarget.dataset.checked;

    for (let i = 0; i < otherLabels.length; i++) {
      if (otherLabels[i].name == name) {
        otherLabels[i].checked = !otherLabels[i].checked;
        break
      }
    }
    if (checked) {
      var index = selectedLabels.indexOf(name);
      if (index > -1) {
        selectedLabels.splice(index, 1);
      }
    }
    else {
      selectedLabels.push(name)
    }

    that.setData({
      otherLabels: otherLabels,
      selectedLabels: selectedLabels
    })
  },
  saveLabelModal: async function (e) {
    wx.showLoading({
      title: '保存中...',
    })

    try {
      let that = this
      let postId = that.data.showCurPostId
      let newPost = {
        label: that.data.selectedLabels
      }

      let res = await wx.a.upsertPosts(postId === undefined ? "" : postId, newPost)
      if (res.result) {
        that.setData({
          isShowLabelModel: false,
          selectedLabels: [],
          otherLabels: [],
          showCurPostId: ""
        })

        await that.onPullDownRefresh()

        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1500
        })
      }
      else {
        wx.showToast({
          title: '操作发生未知异常',
          duration: 1500
        })
      }
    }
    catch (err) {
      wx.showToast({
        title: '程序有一点点小异常，操作失败啦',
        icon: 'none',
        duration: 1500
      })
      console.info(err)
    }
    finally {
      wx.hideLoading()
    }

  },
  // 展示标签选项 end

  // 删除文章设置窗口
  showDeleteModal: function (e) {
    let that = this
    let postId = e.postid
    that.setData({
      isShowDeleteModel: true,
      showCurPostId: postId
    })
  },
  hideShowDeleteModal: function (e) {
    this.setData({
      isShowDeleteModel: false
    })
  },
  deleteShowModal: async function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    try {
      let that = this;
      let res = await wx.a.deletePostById(that.data.showCurPostId)
      console.info(res)
      if (res.result) {
        that.setData({
          isShowDeleteModel: false,
          showCurPostId: "",
        })

        await that.onPullDownRefresh()

        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1500
        })
      }
      else {
        wx.showToast({
          title: '操作发生未知异常',
          duration: 1500
        })
      }
    } catch (err) {
      wx.showToast({
        title: '程序有一点点小异常，操作失败啦',
        icon: 'none',
        duration: 1500
      })
      console.info(err)
    }
    finally {
      wx.hideLoading()
    }
  },
})