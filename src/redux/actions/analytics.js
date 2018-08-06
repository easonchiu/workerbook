import { createAction } from 'easy-action'
import http from 'src/utils/http'

// fetch departments list
const fetchDepartmentsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analytics/departments',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_DEPARTMENTS_LIST')(res))
}

// fetch one department summary
const fetchDepartmentSummary = id => async dispatch => {
  const res = await http.request({
    url: '/analytics/departments/summary/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_DEPARTMENT_SUMMARY')(res))
}

// fetch projects list
const fetchProjectsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analytics/projects',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_PROJECTS_LIST')(res))
}

// fetch one project summary
const fetchProjectSummary = id => async dispatch => {
  const res = await http.request({
    url: '/analytics/projects/summary/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_PROJECTS_SUMMARY')(res))
}

export default {
  fetchDepartmentsList,
  fetchDepartmentSummary,
  fetchProjectsList,
  fetchProjectSummary,
}
