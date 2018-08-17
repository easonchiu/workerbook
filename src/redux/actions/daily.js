import { createAction } from 'easy-action'
import http from 'src/utils/http'
import ignore from 'src/utils/ignore'

// fetch daily list by day.
const fetchListByDay = ({ skip = 0, limit = 0, date = 0, department } = {}) => async dispatch => {
  const res = await http.request({
    url: '/dailies',
    method: 'GET',
    params: {
      skip,
      limit,
      date,
      department
    }
  })
  dispatch(createAction('DAILY_LIST_BY_DAY')(res))
}

// create daily
const create = payload => async () => {
  const res = await http.request({
    url: '/dailies',
    method: 'POST',
    data: payload,
  })
  return res
}

// update daily
const update = payload => async () => {
  const res = await http.request({
    url: '/dailies/' + payload.id,
    method: 'PUT',
    data: ignore(payload, 'id'),
  })
  return res
}

// delete daily
const del = payload => async () => {
  const res = await http.request({
    url: '/dailies/' + payload.id,
    method: 'DELETE',
    data: ignore(payload, 'id'),
  })
  return res
}

// fetch my today's daily
const fetchToday = payload => async dispatch => {
  const res = await http.request({
    url: '/dailies/profile',
    method: 'GET',
  })
  dispatch(createAction('DAILY_TODAY')(res))
  return res
}

// 修改日报任务的度进
const updateProgress = payload => async dispatch => {
  const res = await http.request({
    url: '/dailies/today/mission/' + payload.missionId,
    method: 'PUT',
    data: {
      progress: payload.progress
    }
  })
  return res
}

export default {
  fetchListByDay,
  fetchToday,
  create,
  update,
  del,
  updateProgress,
}
