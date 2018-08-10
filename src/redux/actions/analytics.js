import { createAction } from 'easy-action'
import http from 'src/utils/http'

// fetch department list
const fetchDepartmentsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analysis/department',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_DEPARTMENTS_LIST')({
    list: res,
    skip: 0,
    limit: 0,
    count: res.length,
  }))
}

// fetch department summary
const fetchDepartmentSummary = id => async dispatch => {
  const res = await http.request({
    url: '/analysis/department/summary/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_DEPARTMENT_SUMMARY')(res))
}

// fetch department detail
const fetchDepartmentDetail = id => async dispatch => {
  const res = await http.request({
    url: '/analysis/department/detail/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_DEPARTMENT_DETAIL')(res))
}

// fetch project list
const fetchProjectsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analysis/project',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_PROJECTS_LIST')(res))
}

// fetch project detail
const fetchProjectDetail = id => async dispatch => {
  const res = await http.request({
    url: '/analysis/project/detail/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_PROJECT_DETAIL')(res))
}

export default {
  fetchDepartmentsList,
  fetchDepartmentSummary,
  fetchDepartmentDetail,
  fetchProjectsList,
  fetchProjectDetail,
}
