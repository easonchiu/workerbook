import { createAction } from 'easy-action'
import http from 'src/utils/http'

// create department
const c_create = payload => async () => {
  const res = await http.request({
    url: '/console/departments',
    method: 'POST',
    data: payload,
  })
  return res
}

// update department
const c_update = payload => async () => {
  const res = await http.request({
    url: '/console/departments/id/' + payload.id,
    method: 'PUT',
    data: payload,
  })
  return res
}

// fetch departments list.
const c_fetchList = ({ skip = 0, limit = 10 } = {}) => async dispatch => {
  const res = await http.request({
    url: '/console/departments',
    method: 'GET',
    params: {
      skip,
      limit,
    }
  })
  dispatch(createAction('C_DEPARTMENT_LIST')(res))
}

// fetch departments list for select.
const c_fetchSelectList = () => async dispatch => {
  const res = await http.request({
    url: '/console/departments',
    method: 'GET',
  })
  dispatch(createAction('C_DEPARTMENT_SELECT_LIST')(res))
}

// fetch department one by id
const c_fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/console/departments/id/' + id,
    method: 'GET',
  })
  return res
}

// delete department
const c_del = id => async dispatch => {
  const res = await http.request({
    url: '/console/departments/id/' + id,
    method: 'DELETE',
  })
  return res
}

// fetch departments list.
const fetchList = ({ skip = 0, limit = 10 } = {}) => async dispatch => {
  const res = await http.request({
    url: '/departments',
    method: 'GET',
    params: {
      skip,
      limit,
    }
  })
  dispatch(createAction('DEPARTMENT_LIST')(res))
}

export default {
  c_update,
  c_fetchOneById,
  c_fetchList,
  c_create,
  c_del,
  c_fetchSelectList,

  fetchList,
}
