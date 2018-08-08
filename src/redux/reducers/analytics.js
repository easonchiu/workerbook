import { handleActions } from 'easy-action'

const initialState = {
  department: {
    summary: { users: [] },
    detail: [],
  },
  project: {
    summary: { missions: [] },
    detail: [],
  },
  departmentsList: {
    list: [],
    count: 0,
    skip: 0,
    limit: 0,
  },
  projectsList: {
    list: [],
    count: 0,
    skip: 0,
    limit: 0,
  }
}

export default handleActions({
  ANALYTICS_DEPARTMENT_SUMMARY(state, action) {
    return {
      ...state,
      department: {
        ...state.department,
        summary: action.payload || { users: [] }
      }
    }
  },
  ANALYTICS_DEPARTMENT_DETAIL(state, action) {
    return {
      ...state,
      department: {
        ...state.department,
        detail: action.payload || []
      }
    }
  },
  ANALYTICS_PROJECT_SUMMARY(state, action) {
    return {
      ...state,
      project: {
        ...state.project,
        summary: action.payload || { missions: [] }
      }
    }
  },
  ANALYTICS_PROJECT_DETAIL(state, action) {
    return {
      ...state,
      project: {
        ...state.project,
        detail: action.payload.missions || []
      }
    }
  },
  ANALYTICS_DEPARTMENTS_LIST(state, action) {
    return {
      ...state,
      departmentsList: {
        list: action.payload.list || [],
        count: action.payload.count || 0,
        skip: action.payload.skip || 0,
        limit: action.payload.limit || 0,
      }
    }
  },
  ANALYTICS_PROJECTS_LIST(state, action) {
    return {
      ...state,
      projectsList: {
        list: action.payload.list || [],
        count: action.payload.count || 0,
        skip: action.payload.skip || 0,
        limit: action.payload.limit || 0,
      }
    }
  }
}, initialState)
