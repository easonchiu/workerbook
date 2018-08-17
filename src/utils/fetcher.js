import Toast from 'src/components/toast'
import Loading from 'src/components/loading'

export default {

  /**
   * 多个请求并行
   * @param list 有两种格式
   * list -> [fn1, fn2, fn3...]
   * list -> [[fn1, data1], [fn2, data2]...]
   * @returns {Promise<any>}
   */
  all: list => {
    return new Promise(async (resolve, reject) => {
      const doList = []
      list.forEach(item => {
        if (typeof item === 'function') {
          doList.push(item())
        }
        else if (Array.isArray(item)) {
          if (item.length === 2 && typeof item[0] === 'function') {
            doList.push(item[0](item[1]))
          }
        }
      })
      try {
        if (doList.length) {
          Loading.show()
          const res = await Promise.all(doList)
          resolve(res)
        }
        else {
          resolve()
        }
      }
      catch (err) {
        Toast.error(err.message)
        reject(err)
      }
      finally {
        Loading.hide()
      }
    })
  },

  /**
   * 单个请求
   * @param fn
   * @param data
   * @returns {Promise<any>}
   */
  one: (fn, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        Loading.show()
        const res = await fn(data)
        resolve(res)
      }
      catch (err) {
        Toast.error(err.message)
        reject(err)
      }
      finally {
        Loading.hide()
      }
    })
  }
}