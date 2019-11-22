// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const rp = require('request-promise');
const dateUtils = require('date-utils')
const db = cloud.database()
const _ = db.command
const RELEASE_LOG_KEY = 'releaseLogKey'

// 云函数入口函数
exports.main = async (event, context) => {
  //admin服务都要验证一下权限
  if (event.action !== 'checkAuthor' && event.action !== 'getLabelList' && event.action !== 'getClassifyList') {
    let result = await checkAuthor(event)
    if (!result) {
      return false;
    }
  }

  switch (event.action) {
    case 'checkAuthor': {
      return checkAuthor(event)
    }
    case 'addReleaseLog': {
      return addReleaseLog(event)
    }
    case 'updatePostsShowStatus': {
      return updatePostsShowStatus(event)
    }
    case 'updatePostsClassify': {
      return updatePostsClassify(event)
    }
    case 'updatePostsLabel': {
      return updatePostsLabel(event)
    }
    case 'upsertPosts': {
      return upsertPosts(event)
    }
    case 'addBaseLabel': {
      return addBaseLabel(event)
    }
    case 'addBaseClassify': {
      return addBaseClassify(event)
    }
    case 'deleteConfigById': {
      return deleteConfigById(event)
    }
    case 'changeCommentFlagById': {
      return changeCommentFlagById(event)
    }
    case 'getLabelList': {
      return getLabelList(event)
    }
    case 'getClassifyList': {
      return getClassifyList(event)
    }
    case 'deletePostById': {
      return deletePostById(event)
    }
    case 'updateBatchPostsLabel': {
      return updateBatchPostsLabel(event)
    }
    case 'updateBatchPostsClassify': {
      return updateBatchPostsClassify(event)
    }
    default: break
  }
}

/**
 * 验证
 */
async function checkAuthor() {
  const wxContext = cloud.getWXContext()
  let authors = process.env.author
  return authors.indexOf(wxContext.OPENID) != -1
}

/**
 * 新增版本日志
 * @param {*} event 
 */
async function addReleaseLog(event) {
  // TODO
  return true;
}

/**
 * 更新文章展示状态
 * @param {*} event 
 */
async function updatePostsShowStatus(event) {
  try {
    await db.collection('mini_posts').doc(event.id).update({
      data: {
        isShow: event.isShow
      }
    })
    return true;
  } catch (e) {
    console.error(e)
    return false;
  }
}

/**
 * 更新文章专题名称
 * @param {*} event 
 */
async function updatePostsClassify(event) {
  // TODO
  return true;
}

/**
 * 更新文章专题名称
 * @param {*} event 
 */
async function updatePostsLabel(event) {
  // TODO
  return true;
}

/**
 * 新增or更新文章
 * @param {*} event 
 */
async function upsertPosts(event) {
  try {
    let collection = "mini_posts"
    if (event.id === "") {
      await db.collection(collection).add({
        data: event.post
      });
    }
    else {
      await db.collection(collection).doc(event.id).update({
        data: event.post
      });
    }
    return true;
  } catch (e) {
    console.error(e)
    return false;
  };
}

/**
 * 新增基础标签
 * @param {*} event 
 */
async function addBaseLabel(event) {
  // TODO
  return true;
}

/**
 * 新增基础专题
 * @param {} event 
 */
async function addBaseClassify(event) {
  // TODO
  return true;
}

/**
 * 根据id删除配置表数据
 * @param {*} event 
 */
async function deleteConfigById(event) {
  // TODO
  return true;
}

async function deletePostById(event) {
  try {
    await db.collection('mini_posts').doc(event.id).remove()
    return true;
  } catch (e) {
    console.error(e)
    return false;
  }
}

/**
 * 根据ID删除评论
 * @param {*} event 
 */
async function changeCommentFlagById(event) {
  // TODO
  return true;
}

/**
 * 获取所有label集合
 * @param {*} event 
 */
async function getLabelList(event) {
  const MAX_LIMIT = 100
  const countResult = await db.collection('mini_config').where({
    key: 'basePostsLabels'
  }).count()
  const total = countResult.total
  if (total === 0) {
    return {
      data: [],
      errMsg: "no label data",
    }
  }
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('mini_config').where({
      key: 'basePostsLabels'
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}

/**
 * 获取所有Classify集合
 * @param {*} event 
 */
async function getClassifyList(event) {
  const MAX_LIMIT = 100
  const countResult = await db.collection('mini_config').where({
    key: 'basePostsClassify'
  }).count()
  const total = countResult.total
  if (total === 0) {
    return {
      data: [],
      errMsg: "no classify data",
    }
  }
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('mini_config').where({
      key: 'basePostsClassify'
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}

/**
 * 批量保存标签信息
 * @param {*} event 
 */
async function updateBatchPostsLabel(event) {
  // TODO
  return true;
}

/**
 * 批量保存主题信息
 * @param {*} event 
 */
async function updateBatchPostsClassify(event) {
  // TODO
  return true;
}