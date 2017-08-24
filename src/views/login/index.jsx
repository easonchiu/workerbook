import styles from './style'
import React, { Component } from 'react'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import {setToken} from 'src/assets/libs/token'

import Footer from 'src/containers/footer'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Toast from 'src/components/toast'


@injectStore
@reactStateData
class ViewLogin extends Component {
	constructor(props) {
		super(props)

		this.setData({
			loading: false,
			username: '',
			password: '',
			errorInfo: ''
		})

		this.handleKeyDown = this.handleKeyDown.bind(this)
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown)
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
	}

	handleKeyDown(e) {
		if (e.keyCode === 13) {
			this.onSubmit()
		}
	}

	async onSubmit() {

		if (this.data.username == '') {
			this.data.errorInfo = '请输入用户名'
		} else if (this.data.password == '') {
			this.data.errorInfo = '请输入密码'
		} else {
			this.data.loading = true

			try {
				const res = await this.$user.login({
					username: this.data.username,
					password: this.data.password
				})

				setToken(res.data.token)

				await this.$user.fetchInfo(true)

				this.data.loading = false
				this.data.errorInfo = ''
				this.props.history.push('/')
			} catch(e) {
				this.data.errorInfo = e.msg
				this.data.loading = false
			}
		}
	}

	usernameChange(e) {
		const val = e.target.value.trim()
		this.data.username = val
		this.data.errorInfo = ''
	}

	passwordChange(e) {
		const val = e.target.value.trim()
		this.data.password = val
		this.data.errorInfo = ''
	}

	render() {
		return (
			<div className="view-login">
				
				<div className="box">

					<h1 className="logo"></h1>

					<div className="row">
						<label>用户名</label>
						<Input placeholder="请输入用户名"
							value={this.data.username}
							disabled={this.data.loading}
							onChange={::this.usernameChange} />
					</div>

					<div className="row">
						<label>密码</label>
						<Input type="password"
							placeholder="请输入密码"
							value={this.data.password}
							disabled={this.data.loading}
							onChange={::this.passwordChange}
							autoComplete="new-password" />
					</div>

					<div className="row">
						<label></label>
						<Button onClick={::this.onSubmit} loading={this.data.loading}>登录</Button>
						{
							this.data.errorInfo ?
							<p className="tips">{this.data.errorInfo}</p> :
							null
						}
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