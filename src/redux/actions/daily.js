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

export default {
  fetchListByDay,
}
