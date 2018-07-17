import { createAction } from 'easy-action'
import http from 'src/utils/http'
import ignore from 'src/utils/ignore'

// create project
const c_create = payload => async () => {
  const res = await http.request({
    url: '/console/projects',
    method: 'POST',
    data: payload
  })
  return res
}

// update project
const c_update = payload => async () => {
  const res = await http.request({
    url: '/console/projects/' + payload.id,
    method: 'PUT',
    data: ignore(payload, 'id'),
  })
  return res
}

// fetch project list.
const c_fetchList = ({ status } = {}) => async dispatch => {
  const res = await http.request({
    url: '/console/projects',
    method: 'GET',
  })
  dispatch(createAction('C_PROJECT_LIST')(res))
}

// fetch project one by id
const c_fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/console/projects/' + id,
    method: 'GET',
  })
  return res
}

// delete project
const c_del = id => async dispatch => {
  const res = await http.request({
    url: '/console/projects/' + id,
    method: 'DELETE',
  })
  return res
}

// fetch project list.
const fetchList = () => async dispatch => {
  const res = await http.request({
    url: '/projects',
    method: 'GET',
  })
  dispatch(createAction('PROJECT_LIST')(res))
}

export default {
  fetchList,
  c_update,
  c_fetchOneById,
  c_fetchList,
  c_del,
  c_create,
}
