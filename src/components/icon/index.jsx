import './style'
import React, { Component } from 'react'
import classnames from 'classnames'

class Icon extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const css = classnames(
			'x-icon',
			'x-icon--' + this.props.type,
			this.props.className
		)
		return (
			<i className={ css } />
		)
	}
}

export default Icon