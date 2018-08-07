import { handleActions } from 'easy-action'

const initialState = {
  c_events: {
    list: [],
    count: 0,
    skip: 0,
    limit: 0,
  },
  events: [],
}

export default handleActions({
  C_EVENTS_LIST(state, action) {
    return {
      ...state,
      c_events: {
        list: action.payload.list || [],
        skip: action.payload.skip,
        limit: action.payload.limit,
        count: action.payload.count,
      },
    }
  },
  EVENTS_LIST(state, action) {
    return {
      ...state,
      events: action.payload.list || [],
    }
  },
}, initialState)
