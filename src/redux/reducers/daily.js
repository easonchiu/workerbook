import { handleActions } from 'easy-action'

const initialState = {
  day: {
    list: [],
    skip: 0,
    limit: 0,
    count: 0,
  },
  today: []
}

export default handleActions({
  DAILY_LIST_BY_DAY(state, action) {
    return {
      ...state,
      day: {
        list: action.payload.list,
        skip: action.payload.skip,
        limit: action.payload.limit,
        count: action.payload.count,
      },
    }
  },
  DAILY_TODAY(state, action) {
    return {
      ...state,
      today: action.payload || [],
    }
  }
}, initialState)
