import './style'
import React, { Component } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
import classnames from 'classnames'

import Modal from '../modal'

class Dialog extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this._container = document.createElement('div')
		this._container.classList.add('_x_dialog_')
        document.body.appendChild(this._container)
        this._renderContent()
        
	}

	componentWillUnmount() {
        document.body.removeChild(this._container)
    }

    componentDidUpdate() {
		this._renderContent()
	}

    _content() {
		const css = classnames('x-dialog', this.props.className)

		return (
			<Modal visible={this.props.visible} height={this.props.height} onBgClick={this.props.onBgClick} className={css}>
				<div className="x-dialog__inner">
					{this.props.children}
				</div>
			</Modal>
		)
    }

    _renderContent() {
		unstable_renderSubtreeIntoContainer(
			this,
			this._content(),
			this._container
		)
	}

	render() {
		return null
	}
}


export default Dialog