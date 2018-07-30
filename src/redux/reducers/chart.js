import { handleActions } from 'easy-action'

const initialState = {
  departmentUsersSummary: {
    department: {},
    list: [],
  }
}

export default handleActions({
  CHART_DEPARTMENT_USERS_SUMMARY(state, action) {
    return {
      ...state,
      departmentUsersSummary: {
        department: action.payload.department || {},
        list: action.payload.list || [],
      }
    }
  }
}, initialState)
