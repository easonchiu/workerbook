const token = 'WorkerBook.token'

/**
 * token的操作方法，设置、获取、删除
 */
export const getToken = () => localStorage.getItem(token)
export const setToken = t => localStorage.setItem(token, t)
export const clearToken = () => localStorage.removeItem(token)
