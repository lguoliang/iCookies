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
  // TODO
  return console.log('api')
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
  // TODO
  return console.log('api')
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
  // TODO
  return console.log('api')
}

/**
* 获取收藏、点赞列表
* @param {} page 
*/
function getPostRelated(where, page) {
  // TODO
  return console.log('api')
}
/**
* 获取文章详情
* @param {} id 
*/
function getPostDetail(id) {
  // TODO
  return console.log('api')
}

/**
* 新增用户收藏文章
*/
function addPostCollection(data) {
  // TODO
  return console.log('api')
}

/**
* 取消喜欢或收藏
*/
function deletePostCollectionOrZan(postId, type) {
  // TODO
  return console.log('api')
}

/**
* 新增评论
*/
function addPostComment(commentContent) {
  // TODO
  return console.log('api')
}

/**
* 新增用户点赞
* @param {} data 
*/
function addPostZan(data) {
  // TODO
  return console.log('api')
}

/**
* 新增子评论
* @param {} id 
* @param {*} comments 
*/
function addPostChildComment(id, postId, comments) {
  // TODO
  return console.log('api')
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
  // TODO
  return console.log('api')
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
  // TODO
  return console.log('api')
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
  // TODO
  return console.log('api')
}

/**
* 新增基础标签
*/
function addBaseLabel(labelName) {
  // TODO
  return console.log('api')
}

/**
* 新增基础主题
*/
function addBaseClassify(classifyName, classifyDesc) {
  // TODO
  return console.log('api')
}

/**
* 新增基础主题
*/
function deleteConfigById(id) {
  // TODO
  return console.log('api')
}

function deletePostById(id) {
  // TODO
  return console.log('api')
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
* 获取label集合
*/
function getClassifyList() {
  // TODO
  return console.log('api')
}

/**
* 获取label集合
*/
function updateBatchPostsClassify(classify,operate,posts) {
  // TODO
  return console.log('api')
}

/**
* 获取label集合
*/
function updateBatchPostsLabel(label,operate,posts) {
  // TODO
  return console.log('api')
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
  getLabelList
}