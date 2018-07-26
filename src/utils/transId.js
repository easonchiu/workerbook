function isType(target, type) {
  let targetType = ({}).toString.call(target).toLowerCase()
  type = `[object ${type}]`.toLowerCase()

  return targetType === type
}

const transId = data => {
  if (isType(data, 'object')) {
    if (data._id) {
      data.id = data._id
      delete data._id
    }
    next(data)
  }
}

const next = data => {
  Object.values(data).forEach(i => {
    if (isType(i, 'object') || isType(i, 'array')) {
      trans(i)
    }
  })
}

// 将_id改成id，注意：会改变源数据
const trans = data => {
  if (isType(data, 'object')) {
    transId(data)
  }
  else if (isType(data, 'array')) {
    data.forEach(transId)
  }
  return data
}

export default trans