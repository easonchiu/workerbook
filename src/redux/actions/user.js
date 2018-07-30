import http from 'src/utils/http'
import { createAction } from 'easy-action'
import ignore from 'src/utils/ignore'


// 管理后台相关接口
// create user
const c_create = payload => async () => {
  const res = await http.request({
    url: '/console/users',
    method: 'POST',
    data: payload,
  })
  return res
}

// update user
const c_update = payload => async () => {
  const res = await http.request({
    url: '/console/users/id/' + payload.id,
    method: 'PUT',
    data: ignore(payload, 'id'),
  })
  return res
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
  dispatch(createAction('C_USER_LIST')(res))
}

// fetch user one by id
const c_fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/console/users/id/' + id,
    method: 'GET',
  })
  return res
}

// delete user
const c_del = id => async dispatch => {
  const res = await http.request({
    url: '/console/users/id/' + id,
    method: 'DELETE',
  })
  return res
}

// user login
const login = payload => async () => {
  const res = await http.request({
    url: '/users/login',
    method: 'POST',
    data: payload,
  })
  return res
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
  dispatch(createAction('USER_PROFILE')(res))
}

// fetch users list.
const fetchList = payload => async dispatch => {
  if (!payload.departmentId) {
    payload = ignore(payload, 'departmentId')
  }
  const res = await http.request({
    url: '/users',
    method: 'GET',
    params: payload,
  })
  if (payload.departmentId && res) {
    res.departmentId = payload.departmentId
  }
  dispatch(createAction('USER_LIST')(res))
}

// fetch users list.
const fetchSubList = projectId => async dispatch => {
  const res = await http.request({
    url: '/users/subordinate',
    method: 'GET',
    params: {
      projectId
    },
  })
  dispatch(createAction('USER_SUB_LIST')(res))
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
