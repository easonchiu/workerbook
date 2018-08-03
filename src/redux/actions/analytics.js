import { createAction } from 'easy-action'
import http from 'src/utils/http'

// fetch one department summary
const fetchDepartmentById = id => async dispatch => {
  const res = await http.request({
    url: '/analytics/departments/id/' + id,
    method: 'GET',
  })
  dispatch(createAction('ANALYTICS_ONE_DEPARTMENT')(res))
}

// fetch departments summary
const fetchDepartmentsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analytics/departments',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_DEPARTMENTS_LIST')(res))
}

// fetch projects summary
const fetchProjectsList = payload => async dispatch => {
  const res = await http.request({
    url: '/analytics/projects',
    method: 'GET',
    params: payload,
  })
  dispatch(createAction('ANALYTICS_PROJECTS_LIST')(res))
}

export default {
  fetchDepartmentById,
  fetchDepartmentsList,
  fetchProjectsList,
}
