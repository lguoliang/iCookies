const db = wx.cloud.database()
const _ = db.command

/**
 * 获取评论列表
 */
function getCommentsList(page, flag) {
  // TODO
  return console.log('api')
}
/**
* 根据id获取文章明细
* @param {*} page 
*/
function getPostsById(id) {
  return db.collection('mini_posts')
    .doc(id)
    .get()
}
/**
* 获取消息列表
* @param {*} page 
*/
function getNoticeLogsList(page, openId) {
  // TODO
  return console.log('api')
}

/**
* 获取版本发布日志
* @param {*} page 
*/
function getReleaseLogsList(page) {
  // TODO
  return console.log('api')
}

function getNewPostsList(page, filter, orderBy) {
  let where = {}
  if (filter.title != undefined) {
    where.title = db.RegExp({
      regexp: filter.title,
      options: 'i',
    })
  }
  if (filter.isShow != undefined) {
    where.isShow = filter.isShow
  }
  if (filter.classify != undefined) {
    where.classify = filter.classify
  }

  if (filter.hasClassify == 1) {
    where.classify = _.nin(["", 0, undefined])
  }

  if (filter.hasClassify == 2) {
    where.classify = _.in(["", 0, undefined])
  }

  if (orderBy == undefined || orderBy == "") {
    orderBy = "createTime"
  }

  if (filter.hasLabel == 1) {
    where.label = _.neq([])
  }

  if (filter.hasLabel == 2) {
    where.label = _.eq([])
  }

  //不包含某个标签
  if (filter.containLabel == 2) {
    where.label = _.nin([filter.label])
  }

  //包含某个标签
  if (filter.containLabel == 1) {
    where.label = db.RegExp({
      regexp: filter.label,
      options: 'i',
    })
  }

  //不包含某个主题
  if (filter.containClassify == 2) {
    where.classify = _.neq(filter.classify)
  }

  //包含某个主题
  if (filter.containClassify == 1) {
    where.classify = _.eq(filter.classify)
  }


  return db.collection('mini_posts')
    .where(where)
    .orderBy(orderBy, 'desc')
    .skip((page - 1) * 10)
    .limit(10)
    .field({
      _id: true,
      author: true,
      createTime: true,
      defaultImageUrl: true,
      title: true,
      totalComments: true,
      totalVisits: true,
      totalZans: true,
      isShow: true,
      classify: true,
      label: true,
      digest: true
    }).get()
}
/**
* 获取文章列表
* @param {} page 
*/
function getPostsList(page, filter, isShow, orderBy, label) {
  let where = {}

  if (filter !== '') {
    where.title = db.RegExp({
      regexp: filter,
      options: 'i',
    })
  }
  if (isShow !== -1) {
    where.isShow = isShow
  }

  if (orderBy == undefined || orderBy == "") {
    orderBy = "createTime"
  }

  if (label != undefined && label != "") {
    where.label = db.RegExp({
      regexp: label,
      options: 'i',
    })
  }
  
  return db.collection('mini_posts')
    .where(where)
    .orderBy(orderBy, 'desc')
    .skip((page - 1) * 10)
    .limit(10)
    .field({
      _id: true,
      author: true,
      createTime: true,
      defaultImageUrl: true,
      title: true,
      totalComments: true,
      totalVisits: true,
      totalZans: true,
      isShow: true,
      classify: true,
      label: true,
      digest: true
    })
    .get()
}

/**
* 获取评论列表
* @param {} page 
* @param {*} postId 
*/
function getPostComments(page, postId) {
  return db.collection('mini_comments')
    .where({
      postId: postId,
      flag: 0
    })
    .orderBy('timestamp', 'desc')
    .skip((page - 1) * 10)
    .limit(10)
    .get()
}

/**
* 获取收藏、点赞列表
* @param {} page 
*/
function getPostRelated(where, page) {
  return db.collection('mini_posts_related')
    .where(where)
    .orderBy('createTime', 'desc')
    .skip((page - 1) * 10)
    .limit(10)
    .get()
}
/**
* 获取文章详情
* @param {} id 
*/
function getPostDetail(id) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "getPostsDetail",
      id: id
    }
  })
}

/**
* 新增用户收藏文章
*/
function addPostCollection(data) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "addPostCollection",
      postId: data.postId,
      postTitle: data.postTitle,
      postUrl: data.postUrl,
      postDigest: data.postDigest,
      type: data.type
    }
  })
}

/**
* 取消喜欢或收藏
*/
function deletePostCollectionOrZan(postId, type) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "deletePostCollectionOrZan",
      postId: postId,
      type: type
    }
  })
}

/**
* 新增评论
*/
function addPostComment(commentContent, accept) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "addPostComment",
      commentContent: commentContent,
      accept: accept
    }
  })
}

/**
* 新增用户点赞
* @param {} data 
*/
function addPostZan(data) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "addPostZan",
      postId: data.postId,
      postTitle: data.postTitle,
      postUrl: data.postUrl,
      postDigest: data.postDigest,
      type: data.type
    }
  })
}

/**
* 新增子评论
* @param {} id 
* @param {*} comments 
*/
function addPostChildComment(id, postId, comments) {
  return wx.cloud.callFunction({
    name: 'postsService',
    data: {
      action: "addPostChildComment",
      id: id,
      comments: comments,
      postId: postId,
      accept: accept
    }
  })
}

/**
* 新增文章二维码并返回临时url
* @param {*} id 
* @param {*} postId 
* @param {*} comments 
*/
function addPostQrCode(postId, timestamp) {
  // TODO
  return console.log('api')
}
/**
* 获取打赏码
*/
function getQrCode() {
  // TODO
  return console.log('api')
}

/**
* 获取海报的文章二维码url
* @param {*} id 
*/
function getReportQrCodeUrl(id) {
  // TODO
  return console.log('api')
}

/**
* 验证是否是管理员
*/
function checkAuthor() {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "checkAuthor"
    }
  })
}

/**
* 查询可用的formId数量
*/
function queryFormIds() {
  // TODO
  return console.log('api')
}

/**
* 查询可用的formId数量
*/
function addFormIds(formIds) {
  // TODO
  return console.log('api')
}

/**
* 发送评论通知
* @param {} nickName 
* @param {*} comment 
* @param {*} blogId 
*/
function sendTemplateMessage(nickName, comment, blogId) {
  // TODO
  return console.log('api')
}

/**
* 新增版本日志
* @param {} log 
*/
function addReleaseLog(log, title) {
  // TODO
  return console.log('api')
}

/**
* 更新文章状态
* @param {*} id 
* @param {*} isShow 
*/
function updatePostsShowStatus(id, isShow) {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "updatePostsShowStatus",
      id: id,
      isShow: isShow
    }
  })
}

/**
* 更新文章专题
* @param {*} id 
* @param {*} isShow 
*/
function updatePostsClassify(id, classify) {
  // TODO
  return console.log('api')
}

/**
* 更新文章标签
* @param {*} id 
* @param {*} isShow 
*/
function updatePostsLabel(id, label) {
  // TODO
  return console.log('api')
}

/**
* 更新文章标签
* @param {*} id 
* @param {*} isShow 
*/
function upsertPosts(id, data) {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "upsertPosts",
      id: id,
      post: data
    }
  })
}

/**
* 新增基础标签
*/
function addBaseLabel(labelName) {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "addBaseLabel",
      labelName: labelName
    }
  })
}

/**
* 新增基础主题
*/
function addBaseClassify(classifyName, classifyDesc) {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "addBaseClassify",
      classifyName: classifyName,
      classifyDesc: classifyDesc
    }
  })
}

/**
* 新增基础主题
*/
function deleteConfigById(id) {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "deleteConfigById",
      id: id
    }
  })
}

function deletePostById(id) {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "deletePostById",
      id: id
    }
  })
}

/**
* 更新评论状态
* @param {*} id 
* @param {*} flag 
*/
function changeCommentFlagById(id, flag, postId, count) {
  // TODO
  return console.log('api')
}

/**
* 获取label集合
*/
function getLabelList() {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "getLabelList"
    }
  })
}

/**
* 获取Classify集合
*/
function getClassifyList() {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "getClassifyList"
    }
  })
}

/**
* 获取label集合
*/
function updateBatchPostsClassify(classify,operate,posts) {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "updateBatchPostsClassify",
      posts: posts,
      operate: operate,
      classify: classify
    }
  })
}

/**
* 获取label集合
*/
function updateBatchPostsLabel(label, operate, posts) {
  return wx.cloud.callFunction({
    name: 'adminService',
    data: {
      action: "updateBatchPostsLabel",
      posts: posts,
      operate: operate,
      label: label
    }
  })
}

/**
* 上传文件
*/
function uploadFile(cloudPath, filePath) {
  // TODO
  return console.log('api')
}

/**
* 获取打赏码
*/
function getTempUrl(fileID) {
  // TODO
  return console.log('api') 
}

module.exports = {
  getPostsList,
  getPostDetail,// 获取详情
  getPostRelated,// 获取收藏状态
  getPostComments,// 获取评论
  addPostCollection, // 收藏
  addPostZan,// 点赞
  deletePostCollectionOrZan,// 取消收藏 & 点赞
  addPostComment, // 评论
  addPostChildComment, // 子评论
  getNewPostsList,
  checkAuthor,// 校验
  queryFormIds,
  // admin
  upsertPosts, // 新增 & 更新文章
  getPostsById, // 获取文章
  updatePostsShowStatus, // 控制文章显示
  getClassifyList, // 获取专题列表
  getLabelList, // 获取标签列表
  deletePostById, // 删除文章
  addBaseLabel, // 保存标签
  deleteConfigById, // 删除标签
  updateBatchPostsLabel, // 标签关联文章
  addBaseClassify, // 新增专题
  updateBatchPostsClassify // 专题关联文章
}