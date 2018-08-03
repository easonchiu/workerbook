import { handleActions } from 'easy-action'

const initialState = {
  department: { users: [] },
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
  ANALYTICS_ONE_DEPARTMENT(state, action) {
    return {
      ...state,
      department: action.payload || { users: [] }
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
