import { createAction } from 'easy-action'
import http from 'src/utils/http'
import transId from 'src/utils/transId'

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
  dispatch(createAction('DAILY_LIST_BY_DAY')(transId(res)))
}

// create daily
const create = payload => async () => {
  const res = await http.request({
    url: '/dailies',
    method: 'POST',
    data: payload,
  })
  return transId(res)
}

// update daily
const update = payload => async () => {
  const res = await http.request({
    url: '/dailies',
    method: 'PUT',
    data: payload,
  })
  return transId(res)
}

// delete daily
const del = payload => async () => {
  const res = await http.request({
    url: '/dailies',
    method: 'DELETE',
    data: payload,
  })
  return transId(res)
}

// fetch my today's daily
const fetchToday = payload => async dispatch => {
  const res = await http.request({
    url: '/dailies/profile',
    method: 'GET',
  })
  dispatch(createAction('DAILY_TODAY')(transId(res)))
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
  return transId(res)
}

export default {
  fetchListByDay,
  fetchToday,
  create,
  update,
  del,
  updateProgress,
}
