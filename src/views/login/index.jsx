import styles from './style'
import React, { Component } from 'react'
import connect from 'src/mobx'
import reactStateData from 'react-state-data'
import {observer} from 'mobx-react'

import Footer from 'src/containers/footer'
import Input from 'src/components/input'
import Button from 'src/components/button'


@connect
@reactStateData
@observer
class ViewLogin extends Component {
	constructor(props) {
		super(props)

		this.setData({
			loading: false
		})
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	onSubmit() {
		this.data.loading = true
		setTimeout(e => {
			this.props.history.push('/')
		}, 1000)
	}

	render() {
		return (
			<div className="view-login">
				
				<div className="box">

					<h1 className="logo"></h1>

					<div className="row">
						<label>User name</label>
						<Input placeholder="your name" />
					</div>

					<div className="row">
						<label>Password</label>
						<Input type="password" placeholder="your password" />
					</div>

					<div className="row">
						<label></label>
						<Button onClick={::this.onSubmit} loading={this.data.loading}>Login</Button>
						<p className="tips">user name is empty</p>
					</div>
					
				</div>

				{
					false ?
					<canvas id="canvas" /> :
					null
				}

				<Footer />

			</div>
		)
	}
}



export default ViewLogin