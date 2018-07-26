import { handleActions } from 'easy-action'

const initialState = {
  missions: [],
}

export default handleActions({
  MISSION_LIST(state, action) {
    return {
      ...state,
      projects: action.payload.list || [],
    }
  }
}, initialState)
