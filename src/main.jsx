import 'src/assets/css/reset'
import 'src/assets/css/base'

import React, { Component } from 'react'
import { render } from 'react-dom'

// routes
import Routers from 'src/routes'

// render to #root
render(
	<Routers />,
	document.getElementById('root')
)