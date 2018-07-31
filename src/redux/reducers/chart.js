import { handleActions } from 'easy-action'

const initialState = {
  oneDepartmentSummary: {
    department: {},
    list: [],
  },
  departmentsSummary: {
    list: [],
    count: 0,
    skip: 0,
    limit: 0,
  }
}

export default handleActions({
  CHART_ONE_DEPARTMENT_SUMMARY(state, action) {
    return {
      ...state,
      oneDepartmentSummary: {
        department: action.payload.department || {},
        list: action.payload.list || [],
      }
    }
  },
  CHART_DEPARTMENTS_SUMMARY(state, action) {
    return {
      ...state,
      departmentsSummary: {
        list: action.payload.list || [],
        count: action.payload.count || 0,
        skip: action.payload.skip || 0,
        limit: action.payload.limit || 0,
      }
    }
  }
}, initialState)
