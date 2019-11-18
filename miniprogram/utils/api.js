const db = wx.cloud.database()
const _ = db.command

/**
 * 获取评论列表
 */
function getCommentsList(page, flag) {
  return console.log('api')
}
/**
* 根据id获取文章明细
* @param {*} page 
*/
function getPostsById(id) {
  return console.log('api')
}
/**
* 获取消息列表
* @param {*} page 
*/
function getNoticeLogsList(page, openId) {
  return console.log('api')
}

/**
* 获取版本发布日志
* @param {*} page 
*/
function getReleaseLogsList(page) {
  return console.log('api')
}

function getNewPostsList(page, filter, orderBy) {
  return console.log('api')
}
/**
* 获取文章列表
* @param {} page 
*/
function getPostsList(page, filter, isShow, orderBy, label) {
  return console.log('api')
}

/**
* 获取评论列表
* @param {} page 
* @param {*} postId 
*/
function getPostComments(page, postId) {
  return console.log('api')
}

/**
* 获取收藏、点赞列表
* @param {} page 
*/
function getPostRelated(where, page) {
  return console.log('api')
}
/**
* 获取文章详情
* @param {} id 
*/
function getPostDetail(id) {
  return console.log('api')
}

/**
* 新增用户收藏文章
*/
function addPostCollection(data) {
  return console.log('api')
}

/**
* 取消喜欢或收藏
*/
function deletePostCollectionOrZan(postId, type) {
  return console.log('api')
}

/**
* 新增评论
*/
function addPostComment(commentContent) {
  return console.log('api')
}

/**
* 新增用户点赞
* @param {} data 
*/
function addPostZan(data) {
  return console.log('api')
}

/**
* 新增子评论
* @param {} id 
* @param {*} comments 
*/
function addPostChildComment(id, postId, comments) {
  return console.log('api')
}

/**
* 新增文章二维码并返回临时url
* @param {*} id 
* @param {*} postId 
* @param {*} comments 
*/
function addPostQrCode(postId, timestamp) {
  return console.log('api')
}
/**
* 获取打赏码
*/
function getQrCode() {
  return console.log('api')
}

/**
* 获取海报的文章二维码url
* @param {*} id 
*/
function getReportQrCodeUrl(id) {
  return console.log('api')
}

/**
* 验证是否是管理员
*/
function checkAuthor() {
  return console.log('api')
}

/**
* 查询可用的formId数量
*/
function queryFormIds() {
  return console.log('api')
}

/**
* 查询可用的formId数量
*/
function addFormIds(formIds) {
  return console.log('api')
}

/**
* 发送评论通知
* @param {} nickName 
* @param {*} comment 
* @param {*} blogId 
*/
function sendTemplateMessage(nickName, comment, blogId) {
  return console.log('api')
}

/**
* 新增版本日志
* @param {} log 
*/
function addReleaseLog(log, title) {
  return console.log('api')
}

/**
* 更新文章状态
* @param {*} id 
* @param {*} isShow 
*/
function updatePostsShowStatus(id, isShow) {
  return console.log('api')
}

/**
* 更新文章专题
* @param {*} id 
* @param {*} isShow 
*/
function updatePostsClassify(id, classify) {
  return console.log('api')
}

/**
* 更新文章标签
* @param {*} id 
* @param {*} isShow 
*/
function updatePostsLabel(id, label) {
  return console.log('api')
}

/**
* 更新文章标签
* @param {*} id 
* @param {*} isShow 
*/
function upsertPosts(id, data) {
  return console.log('api')
}

/**
* 新增基础标签
*/
function addBaseLabel(labelName) {
  return console.log('api')
}

/**
* 新增基础主题
*/
function addBaseClassify(classifyName, classifyDesc) {
  return console.log('api')
}

/**
* 新增基础主题
*/
function deleteConfigById(id) {
  return console.log('api')
}

function deletePostById(id) {
  return console.log('api')
}

/**
* 更新评论状态
* @param {*} id 
* @param {*} flag 
*/
function changeCommentFlagById(id, flag, postId, count) {
  return console.log('api')
}

/**
* 获取label集合
*/
function getLabelList() {
  return console.log('api')
}

/**
* 获取label集合
*/
function getClassifyList() {
  return console.log('api')
}

/**
* 获取label集合
*/
function updateBatchPostsClassify(classify,operate,posts) {
  return console.log('api')
}

/**
* 获取label集合
*/
function updateBatchPostsLabel(label,operate,posts) {
  return console.log('api')
}

/**
* 上传文件
*/
function uploadFile(cloudPath, filePath) {
  return console.log('api')
}

/**
* 获取打赏码
*/
function getTempUrl(fileID) {
  return console.log('api')
}

module.exports = {
}