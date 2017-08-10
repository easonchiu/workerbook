import styles from './style'
import React, { Component } from 'react'
import connect from 'src/mobx'
import reactStateData from 'react-state-data'
import {observer} from 'mobx-react'

import {setToken} from 'src/assets/libs/token'

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
			loading: false,
			username: '',
			password: '',
		})
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	async onSubmit() {
		this.data.loading = true

		try {
			const res = await this.props.$user.login({
				username: this.data.username,
				password: this.data.password
			})
			setToken(res.data.token)
			await this.props.$user.fetchInfo()

			this.data.loading = false
			this.props.history.push('/')
		} catch(e) {
			console.error(e)
			this.data.loading = false
		}
	}

	usernameChange(e) {
		const val = e.target.value.trim()
		this.data.username = val
	}

	passwordChange(e) {
		const val = e.target.value.trim()
		this.data.password = val
	}

	render() {
		return (
			<div className="view-login">
				
				<div className="box">

					<h1 className="logo"></h1>

					<div className="row">
						<label>Username</label>
						<Input placeholder="your name"
							value={this.data.username}
							onChange={::this.usernameChange} />
					</div>

					<div className="row">
						<label>Password</label>
						<Input type="password"
							placeholder="your password"
							value={this.data.password}
							onChange={::this.passwordChange}
							autoComplete="new-password" />
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