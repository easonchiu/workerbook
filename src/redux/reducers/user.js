import { handleActions } from 'easy-action'

const initialState = {
  profile: {},
  c_users: {
    list: [],
    departmentId: null,
    count: 0,
    skip: 0,
    limit: 0,
  }
}

export default handleActions({
  C_USER_LIST(state, action) {
    return {
      ...state,
      c_users: {
        list: action.payload.list || [],
        departmentId: action.payload.departmentId,
        count: action.payload.count,
        skip: action.payload.skip,
        limit: action.payload.limit,
      },
    }
  },
  USER_PROFILE(state, action) {
    return {
      ...state,
      profile: action.payload,
    }
  }
}, initialState)
