import { createAction } from 'easy-action'
import http from 'src/utils/http'
import transId from 'src/utils/transId'

// fetch departments list
const fetchDepartmentsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analysis/department',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_DEPARTMENTS_LIST')(transId(res)))
}

// fetch one department summary
const fetchDepartmentSummary = id => async dispatch => {
  const res = await http.request({
    url: '/analysis/department/summary/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_DEPARTMENT_SUMMARY')(transId(res)))
}

// fetch projects list
const fetchProjectsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analysis/project',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_PROJECTS_LIST')(transId(res)))
}

// fetch one project summary
const fetchProjectSummary = id => async dispatch => {
  const res = await http.request({
    url: '/analysis/project/summary/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_PROJECTS_SUMMARY')(transId(res)))
}

export default {
  fetchDepartmentsList,
  fetchDepartmentSummary,
  fetchProjectsList,
  fetchProjectSummary,
}
