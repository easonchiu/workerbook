import { combineReducers } from 'redux'

import user$ from './user'
import daily$ from './daily'
import department$ from './department'
import project$ from './project'
import mission$ from './mission'
import chart$ from './chart'

export default combineReducers({
  user$,
  daily$,
  department$,
  project$,
  mission$,
  chart$,
})
