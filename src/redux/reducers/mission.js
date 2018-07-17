import { handleActions } from 'easy-action'

const initialState = {
  missions: {
    list: [],
    count: 0,
    skip: 0,
    limit: 0,
  },
}

export default handleActions({
  MISSION_LIST(state, action) {
    return {
      ...state,
      missions: {
        list: action.payload.list || [],
        count: action.payload.count,
        skip: action.payload.skip,
        limit: action.payload.limit,
      },
    }
  }
}, initialState)
