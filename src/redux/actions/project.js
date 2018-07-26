import { createAction } from 'easy-action'
import http from 'src/utils/http'
import transId from 'src/utils/transId'

// create project
const c_create = payload => async () => {
  const res = await http.request({
    url: '/console/projects',
    method: 'POST',
    data: payload
  })
  return transId(res)
}

// update project
const c_update = payload => async () => {
  const res = await http.request({
    url: '/console/projects/' + payload.id,
    method: 'PATCH',
    data: payload,
  })
  return transId(res)
}

// fetch project list.
const c_fetchList = ({ skip = 0, limit = 10 } = {}) => async dispatch => {
  const res = await http.request({
    url: '/console/projects',
    method: 'GET',
    params: {
      skip,
      limit,
    }
  })
  transId(res)
  res.skip = skip
  res.limit = limit
  dispatch(createAction('C_PROJECT_LIST')(res))
}

// fetch project one by id
const c_fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/console/projects/' + id,
    method: 'GET',
  })
  return transId(res)
}

// delete project
const c_del = id => async dispatch => {
  const res = await http.request({
    url: '/console/projects/' + id,
    method: 'DELETE',
  })
  return transId(res)
}

// fetch project list.
const fetchList = () => async dispatch => {
  const res = await http.request({
    url: '/projects',
    method: 'GET',
  })
  transId(res)
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
