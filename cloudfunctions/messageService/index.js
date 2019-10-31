// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'queryFormIds': {
      return queryFormIds(event)
    }
    case 'addFormIds': {
      return addFormIds(event)
    }
    default: break
  }
}

/**
 * 获取总的formIds和过期的formIds
 * @param {} event 
 */
async function queryFormIds(event) {
  var data = {}
  var formIdsResult = await db.collection('mini_formids').where({
    openId: process.env.author // 填入当前用户 openid
  }).count()

  /*var formIdsExpireResult = await db.collection('mini_formids').where({
    openId: process.env.author, // 填入当前用户 openid
    timestamp: _.lt(new Date().removeDays(7).getTime())
  }).count()*/

  data.formIds = formIdsResult.total
  //data.expireFromIds = formIdsExpireResult.total
  return data;
}

/**
 * 新增formId
 * @param {} event 
 */
async function addFormIds(event) {
  try {

    let removeRes = await db.collection('mini_formids').where({
      timestamp: _.lt(new Date().getTime() - 1000*60*60*24*7)
    }).remove()

    console.info(removeRes)

    for (var i = 0; i < event.formIds.length; i++) {
      let data = {
        openId: event.userInfo.openId,
        formId: event.formIds[i],
        timestamp: new Date().getTime()
      }

      let res = await db.collection('mini_formids').add({
        data: data
      })
      console.info(res)
    }
    return true;
  } catch (e) {
    console.error(e)
    return false;
  }
}