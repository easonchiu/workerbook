import { createAction } from 'easy-action'
import http from 'src/utils/http'
// import ignore from 'src/utils/ignore'

// fetch one department summary
const fetchOneDepartmentSummary = id => async dispatch => {
  const res = await http.request({
    url: '/chart/departments/summary/' + id,
    method: 'GET',
  })
  dispatch(createAction('CHART_ONE_DEPARTMENT_SUMMARY')(res))
}

// fetch departments summary
const fetchDepartmentsSummary = () => async dispatch => {
  const res = await http.request({
    url: '/chart/departments/summary',
    method: 'GET',
  })
  dispatch(createAction('CHART_DEPARTMENTS_SUMMARY')(res))
}

export default {
  fetchOneDepartmentSummary,
  fetchDepartmentsSummary,
}
