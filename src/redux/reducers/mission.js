import { handleActions } from 'easy-action'

const initialState = {
  owns_missions: [],
}

export default handleActions({
  OWNS_MISSION_LIST(state, action) {
    return {
      ...state,
      owns_missions: action.payload.list || [],
    }
  },
}, initialState)
