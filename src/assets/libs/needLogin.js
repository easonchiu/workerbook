import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getToken } from 'src/assets/libs/token'


const NeedLogin = View => (want = true) => {
	class HOCView extends Component {
		constructor(props) {
			super(props)
		}
		render() {
			const hasLogin = (getToken() !== '' && getToken() !== undefined)
			if (want) {
				if (hasLogin) {
					return <View {...this.props} />
				}
				return <Redirect to="/login" />
			} else {
				if (hasLogin) {
					return <Redirect to="/" />
				}
				return <View {...this.props} />
			}
		}
	}
	HOCView.displayName = `WithNeedLogin(${View.displayName || View.name}|${want})`
	return HOCView
}

export default NeedLogin