import { createAction } from 'easy-action'
import http from 'src/utils/http'
import ignore from 'src/utils/ignore'
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
    method: 'PUT',
    data: ignore(payload, 'id'),
  })
  return transId(res)
}

// fetch owns mission list.
const fetchOwnsList = () => async dispatch => {
  const res = await http.request({
    url: '/missions/list',
    method: 'GET',
  })
  dispatch(createAction('OWNS_MISSION_LIST')(transId(res)))
}

// fetch mission one by id
const fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/missions/info/' + id,
    method: 'GET',
  })
  return transId(res)
}

export default {
  create,
  update,
  fetchOwnsList,
  fetchOneById,
}
