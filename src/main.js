// reset css
import 'src/assets/css/reset'

// some utils
import 'src/utils/dateFormat'

// base framework
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Loading from 'src/components/loading'
import Toast from 'src/components/toast'

window.Loading = Loading
window.Toast = Toast

// store
import configureStore from 'src/redux/store'
const store = configureStore()

// routes
import Routers from 'src/routes'

// render to #root
render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root'),
)

module.hot && module.hot.accept()