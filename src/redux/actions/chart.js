import { createAction } from 'easy-action'
import http from 'src/utils/http'
// import ignore from 'src/utils/ignore'

// fetch department usr summary
const fetcuDepartmentUsersSummary = id => async dispatch => {
  const res = await http.request({
    url: '/chart/department/summary/' + id,
    method: 'GET',
  })
  dispatch(createAction('CHART_DEPARTMENT_USERS_SUMMARY')(res))
}

export default {
  fetcuDepartmentUsersSummary,
}
