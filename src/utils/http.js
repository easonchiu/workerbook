import axios from 'axios'
import { getToken, clearToken } from 'src/utils/token'

// type an error
function HttpError(message, data) {
  this.message = message
  this.name = 'HttpError'
  this.data = data || null
}
HttpError.prototype = new Error()
HttpError.prototype.constructor = HttpError

const config = {
  production: '/',
  development: '/proxy',
  test: '/'
}

/**
 * 获取config配置中的请求前置路径
 */
const baseURL = config[process.env.PACKAGE] ? config['development'] : config[process.env.PACKAGE]

/**
 * 配置axios
 */
const http = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json;version=3.0;compress=false',
    'Content-Type': 'application/json;charset=utf-8'
  },
  data: {}
})

/**
 * 请求拦截器，在发起请求之前
 */
http.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  return config
})

/**
 * 接口响应拦截器，在接口响应之后
 */
http.interceptors.response.use(
  config => {
    // success handle
    if (config.status === 204 || config.data.code === 0) {
      return config.data.data
    }
    // need to login, token is overdue or empty
    else if (config.data.code === 401) {
      clearToken()
      return false
    }
    console.log(config)
    // return reject error
    return Promise.reject(new HttpError(config.data.msg, config.code))
  },
  error => {
    console.log(error.response)
    return Promise.reject(new HttpError(error.response.data.msg || '系统错误', error.response.data.code))
  }
)

export default http
