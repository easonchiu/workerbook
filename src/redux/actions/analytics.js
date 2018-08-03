import { createAction } from 'easy-action'
import http from 'src/utils/http'
import transId from 'src/utils/transId'

// fetch one department summary
const fetchDepartmentById = id => async dispatch => {
  const res = await http.request({
    url: '/analysis/department/summary/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_ONE_DEPARTMENT')(transId(res)))
}

// fetch departments summary
const fetchDepartmentsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analysis/department',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_DEPARTMENTS_LIST')(transId(res)))
}

// fetch projects summary
const fetchProjectsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analysis/project',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_PROJECTS_LIST')(transId(res)))
}

export default {
  fetchDepartmentById,
  fetchDepartmentsList,
  fetchProjectsList,
}
