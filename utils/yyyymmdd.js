const yyyymmdd = () => {
  let date = new Date()
  // date.setDate(new Date().getDate() + 1)
  if (Object.prototype.toString.call(date) === '[object Date]') {
    if (isNaN(date.getTime())) {
      return null
    } else {
      let y = date.getFullYear().toString()
      let m = (date.getMonth() + 1).toString()
      let d = date.getDate().toString()
      if (d.length === 1) d = '0' + d
      if (m.length === 1) m = '0' + m
      const yyyymmdd = y + m + d

      return yyyymmdd
    }
  } else {
    return null
  }
}

export default yyyymmdd
