import { combineReducers } from 'redux'

import user$ from './user'
import daily$ from './daily'
import department$ from './department'
import project$ from './project'
import mission$ from './mission'
import analytics$ from './analytics'

export default combineReducers({
  user$,
  daily$,
  department$,
  project$,
  mission$,
  analytics$,
})
