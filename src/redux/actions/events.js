import { createAction } from 'easy-action'
import http from 'src/utils/http'

// create events
const c_create = payload => async () => {
  const res = await http.request({
    url: '/console/events',
    method: 'POST',
    data: payload,
  })
  return res
}

// fetch events list.
const c_fetchList = ({ skip = 0, limit = 10 } = {}) => async dispatch => {
  const res = await http.request({
    url: '/console/events/list',
    method: 'GET',
    params: {
      skip,
      limit,
    }
  })
  dispatch(createAction('C_EVENTS_LIST')(res))
}

// delete department
const c_del = id => async dispatch => {
  const res = await http.request({
    url: '/console/events/' + id,
    method: 'DELETE',
  })
  return res
}

// fetch events list.
const fetchList = () => async dispatch => {
  const res = await http.request({
    url: '/events/list',
    method: 'GET',
  })
  dispatch(createAction('EVENTS_LIST')(res))
}

export default {
  c_fetchList,
  c_create,
  c_del,
  fetchList,
}
