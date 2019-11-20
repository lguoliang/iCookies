const formatTime = time => {
  var date = new Date(time);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const toast = function (title) {
  wx.showToast({
    icon: 'none',
    title: title
  })
}

module.exports = {
  formatTime: formatTime,
  toast: toast
}