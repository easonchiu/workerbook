import { createAction } from 'easy-action'
import http from 'src/utils/http'
import ignore from 'src/utils/ignore'

// create mission
const c_create = payload => async () => {
  const res = await http.request({
    url: '/console/missions',
    method: 'POST',
    data: payload
  })
  return res
}

// update mission
const c_update = payload => async () => {
  const res = await http.request({
    url: '/console/missions/' + payload.id,
    method: 'PUT',
    data: ignore(payload, 'id'),
  })
  return res
}

// fetch mission list.
const c_fetchList = ({ status, skip, limit } = {}) => async dispatch => {
  const res = await http.request({
    url: '/console/missions',
    method: 'GET',
    params: {
      status,
      skip,
      limit,
    }
  })
  dispatch(createAction('C_MISSION_LIST')(res))
}

// fetch mission one by id
const c_fetchOneById = id => async dispatch => {
  const res = await http.request({
    url: '/console/missions/' + id,
    method: 'GET',
  })
  return res
}

export default {
  c_create,
  c_fetchList,
  c_fetchOneById,
  c_update,
}
