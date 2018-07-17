import { handleActions } from 'easy-action'

const initialState = {
  c_departments: {
    list: [],
    count: 0,
    skip: 0,
    limit: 0,
  },
  c_select: {
    list: []
  }
}

export default handleActions({
  C_DEPARTMENT_LIST(state, action) {
    return {
      ...state,
      c_departments: {
        list: action.payload.list || [],
        skip: action.payload.skip,
        limit: action.payload.limit,
        count: action.payload.count,
      }
    }
  },
  C_DEPARTMENT_SELECT_LIST(state, action) {
    return {
      ...state,
      c_select: {
        list: action.payload.list || [],
      }
    }
  }
}, initialState)
