import { createAction } from 'easy-action'
import http from 'src/utils/http'
import ignore from 'src/utils/ignore'

// create mission
const create = payload => async () => {
  const res = await http.request({
    url: '/missions',
    method: 'POST',
    data: payload
  })
  return res
}

// update mission
const update = payload => async () => {
  const res = await http.request({
    url: '/missions/id/' + payload.id,
    method: 'PUT',
    data: ignore(payload, 'id'),
  })
  return res
}

// fetch owns mission list.
const fetchOwnsList = () => async dispatch => {
  const res = await http.request({
    url: '/missions/owns',
    method: 'GET',
  })
  dispatch(createAction('OWNS_MISSION_LIST')(res))
}

// fetch mission one by id
const fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/missions/id/' + id,
    method: 'GET',
  })
  return res
}

export default {
  create,
  update,
  fetchOwnsList,
  fetchOneById,
}
