import { handleActions } from 'easy-action'

const initialState = {
  list: [],
  activeProject: '', // 当前list对应的项目id
}

export default handleActions({
  DAILY_LIST_BY_DAY(state, action) {
    return {
      ...state,
      list: action.payload.list,
      activeProject: action.payload.projectId || '',
    }
  }
}, initialState)
