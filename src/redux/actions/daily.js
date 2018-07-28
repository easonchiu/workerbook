import { createAction } from 'easy-action'
import http from 'src/utils/http'

// fetch daily list by day.
const fetchListByDay = ({ skip, limit = 10 } = {}) => async dispatch => {
  const res = await http.request({
    url: '/dailies',
    method: 'GET',
    params: {
      skip,
      limit,
    }
  })
  dispatch(createAction('DAILY_LIST_BY_DAY')(res))
}

// create daily
const create = payload => async () => {
  const res = await http.request({
    url: '/dailies/today',
    method: 'POST',
    data: payload,
  })
  return res
}

// update daily
const update = payload => async () => {
  const res = await http.request({
    url: '/dailies/today',
    method: 'PUT',
    data: payload,
  })
  return res
}

// delete daily
const del = payload => async () => {
  const res = await http.request({
    url: '/dailies/today',
    method: 'DELETE',
    data: payload,
  })
  return res
}

// fetch my today's daily
const fetchToday = payload => async dispatch => {
  const res = await http.request({
    url: '/dailies/today',
    method: 'GET',
  })
  dispatch(createAction('DAILY_TODAY')(res))
  return res
}

export default {
  fetchListByDay,
  fetchToday,
  create,
  update,
  del,
}
