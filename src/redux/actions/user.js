import http from 'src/utils/http'
import { createAction } from 'easy-action'
import ignore from 'src/utils/ignore'
import transId from 'src/utils/transId'

// 管理后台相关接口
// create user
const c_create = payload => async () => {
  const res = await http.request({
    url: '/console/users',
    method: 'POST',
    data: payload,
  })
  return transId(res)
}

// update user
const c_update = payload => async () => {
  const res = await http.request({
    url: '/console/users/' + payload.id,
    method: 'PUT',
    data: payload,
  })
  return transId(res)
}

// fetch users list.
const c_fetchList = ({ departmentId, skip, limit = 10 } = {}) => async dispatch => {
  const res = await http.request({
    url: '/console/users',
    method: 'GET',
    params: {
      departmentId,
      skip,
      limit,
    }
  })
  dispatch(createAction('C_USER_LIST')(transId(res)))
}

// fetch user one by id
const c_fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/console/users/' + id,
    method: 'GET',
  })
  return transId(res)
}

// delete user
const c_del = id => async dispatch => {
  const res = await http.request({
    url: '/console/users/' + id,
    method: 'DELETE',
  })
  return transId(res)
}

// user login
const login = payload => async () => {
  const res = await http.request({
    url: '/users/login',
    method: 'POST',
    data: payload,
  })
  return res.token
}

// my profile
const fetchProfile = () => async (dispatch, getState) => {
  const state = getState()
  if (state.user$.profile.id) {
    return
  }
  const res = await http.request({
    url: '/users/profile',
    method: 'GET',
  })
  dispatch(createAction('USER_PROFILE')(transId(res)))
}

// fetch users list.
const fetchList = payload => async dispatch => {
  const departments = payload.departmentId
  payload = ignore(payload, 'departmentId')
  const res = await http.request({
    url: '/users',
    method: 'GET',
    params: {
      departments
    },
  })
  if (departments && res) {
    res.departmentId = departments
  }
  dispatch(createAction('USER_LIST')(transId(res)))
}

// fetch users list.
const fetchSubList = (departments = []) => async dispatch => {
  const res = await http.request({
    url: '/users',
    method: 'GET',
    params: {
      departments: departments.join(',')
    },
  })
  dispatch(createAction('USER_SUB_LIST')(transId(res)))
}

export default {
  login,
  fetchProfile,
  c_create,
  c_del,
  c_fetchList,
  c_fetchOneById,
  c_update,

  fetchSubList,
  fetchList,
}
