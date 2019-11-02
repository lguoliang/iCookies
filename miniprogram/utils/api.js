const db = wx.cloud.database()
const _ = db.command

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
 * 获取评论列表
 */
function getCommentsList(page, flag) {
    return db.collection('mini_comments')
        .where({
            flag: flag
        })
        .orderBy('timestamp', 'desc')
        .skip((page - 1) * 10)
        .limit(10)
        .get()
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
      where.label =_.nin([filter.label])
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
 * 查询可用的formId数量
 */
function queryFormIds() {
  return wx.cloud.callFunction({
      name: 'messageService',
      data: {
        action: "queryFormIds"
      }
  })
}
/**
 * 添加可用的formId数量
 */
function addFormIds(formIds) {
  return wx.cloud.callFunction({
    name: 'messageService',
    data: {
      action: "addFormIds",
      formIds: formIds
    }
  })
}

/**
 * 新增版本日志
 * @param {} log 
 */
function addReleaseLog(log, title) {
  return wx.cloud.callFunction({
      name: 'adminService',
      data: {
          action: "addReleaseLog",
          log: log,
          title: title
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
 * 上传文件
 */
function uploadFile(cloudPath, filePath) {
    return wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: filePath, // 文件路径
    })
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
 * 获取label集合
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
 * 获取label集合
 */
function updateBatchPostsClassify(classify,operate,posts) {
    return wx.cloud.callFunction({
        name: 'adminService',
        data: {
            action: "updateBatchPostsClassify",
            posts:posts,
            operate:operate,
            classify:classify
        }
    })
}

/**
 * 获取label集合
 */
function updateBatchPostsLabel(label,operate,posts) {
    return wx.cloud.callFunction({
        name: 'adminService',
        data: {
            action: "updateBatchPostsLabel",
            posts:posts,
            operate:operate,
            label:label
        }
    })
}

module.exports = {
  // getPostsList: getPostsList,
  // getPostDetail: getPostDetail,
  // getPostRelated: getPostRelated,
  // getQrCode: getQrCode,
  // addPostCollection: addPostCollection,
  // addPostZan: addPostZan,
  // deletePostCollectionOrZan: deletePostCollectionOrZan,
  // addPostComment: addPostComment,
  // getPostComments: getPostComments,
  // addPostChildComment: addPostChildComment,
  // getReportQrCodeUrl: getReportQrCodeUrl,
  // addPostQrCode: addPostQrCode,
  checkAuthor: checkAuthor,
  addFormIds: addFormIds,
  queryFormIds: queryFormIds,
  // sendTemplateMessage: sendTemplateMessage,
  addReleaseLog: addReleaseLog,
  // getReleaseLogsList: getReleaseLogsList,
  // getNoticeLogsList: getNoticeLogsList,
  getPostsById: getPostsById,
  // deleteConfigById: deleteConfigById,
  addBaseClassify: addBaseClassify,
  addBaseLabel: addBaseLabel,
  upsertPosts: upsertPosts,
  // updatePostsLabel: updatePostsLabel,
  // updatePostsClassify: updatePostsClassify,
  updatePostsShowStatus: updatePostsShowStatus,
  getCommentsList: getCommentsList,
  // changeCommentFlagById: changeCommentFlagById,
  getLabelList: getLabelList,
  getClassifyList: getClassifyList,
  getNewPostsList: getNewPostsList,
  // deletePostById: deletePostById,
  uploadFile: uploadFile,
  // getTempUrl: getTempUrl,
  updateBatchPostsLabel:updateBatchPostsLabel,
  updateBatchPostsClassify:updateBatchPostsClassify
}