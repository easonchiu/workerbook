import { handleActions } from 'easy-action'

const initialState = {
  c_projects: {
    list: [],
    count: 0,
    skip: 0,
    limit: 0,
  },
  projects: [],
}

export default handleActions({
  C_PROJECT_LIST(state, action) {
    return {
      ...state,
      c_projects: {
        list: action.payload.list || [],
        count: action.payload.count,
        skip: action.payload.skip,
        limit: action.payload.limit,
      },
    }
  },
  PROJECT_LIST(state, action) {
    return {
      ...state,
      projects: action.payload.list || [],
    }
  }
}, initialState)
