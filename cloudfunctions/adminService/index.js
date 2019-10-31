// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const RELEASE_LOG_KEY = 'releaseLogKey'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'checkAuthor': {
      return checkAuthor(event)
    }
    case 'addReleaseLog': {
      return addReleaseLog(event)
    }
    case 'addBaseLabel': {
      return addBaseLabel(event)
    }
    case 'getLabelList': {
      return getLabelList(event)
    }
  }
}

/**
 * 验证
 * @param {} event 
 */
async function checkAuthor(event) {
  // let authors = process.env.author
  // if (authors.indexOf(event.userInfo.openId) != -1) {
  //   //if (event.userInfo.openId == process.env.author) {
  //   return true;
  // }
  return false;
}

/**
 * 新增版本日志
 * @param {*} event 
 */
async function addReleaseLog(event) {
  try {
    let collection = 'mini_logs'
    let data = {
      key: RELEASE_LOG_KEY,
      tag: '【' + event.log.releaseName + '版本更新】',
      content: event.log,
      title: event.title,
      icon: 'formfill',
      color: 'blue',
      path: '../release/release',
      timestamp: Date.now(),
      // datetime: new Date(Date.now() + (8 * 60 * 60 * 1000)).toFormat("YYYY-MM-DD HH24:MI"),
      datetime: new Date(Date.now() + (8 * 60 * 60 * 1000)),
      openId: '',//为空则为所有用户
      type: 'system'
    }
    await db.collection(collection).add({
      data: data
    })
    return true;
  }
  catch (e) {
    console.info(e)
    return false;
  }
}

/**
 * 新增基础标签
 * @param {*} event 
 */
async function addBaseLabel(event) {
  let key = "basePostsLabels"
  let collection = "mini_config"
  let result = await db.collection(collection).where({
    key: key,
    value: event.labelName
  }).get()
  if (result.data.length > 0) {
    return false
  }
  else {
    await db.collection(collection).add({
      data: {
        key: key,
        timestamp: Date.now(),
        value: event.labelName
      }
    });
    return true;
  }
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