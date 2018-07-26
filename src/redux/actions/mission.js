import { createAction } from 'easy-action'
import http from 'src/utils/http'
import transId from 'src/utils/transId'

// create mission
const create = payload => async () => {
  const res = await http.request({
    url: '/missions',
    method: 'POST',
    data: payload
  })
  return transId(res)
}

// update mission
const update = payload => async () => {
  const res = await http.request({
    url: '/missions/' + payload.id,
    method: 'PATCH',
    data: payload,
  })
  return transId(res)
}

// fetch mission one by id
const fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/missions/info/' + id,
    method: 'GET',
  })
  return transId(res)
}

// fetch mission list.
const fetchList = () => async dispatch => {
  const res = await http.request({
    url: '/missions/list',
    method: 'GET',
  })
  transId(res)
  dispatch(createAction('MISSION_LIST')(res))
}

export default {
  create,
  update,
  fetchOneById,
  fetchList,
}
