import './style'
import React, {Component} from 'react'
import cn from 'classnames'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Input from 'src/components/input'
import Button from 'src/components/button'
import Dialog from 'src/components/dialog'
import UserHeader from 'src/components/userHeader'
import Border from 'src/components/border'
import Toast from 'src/components/toast'

@injectStore
@reactStateData
class Header extends Component {
	constructor(props) {
		super(props)

		this.setData({
			modifyPw: false,
			resultVisible: false,
			headerVisible: true,

			pwold: '',
			pwnew: '',
			pwnew2: '',
		})

		this.onScroll = this.onScroll.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}

	onScroll(e) {
		const y = document.body.scrollTop
		this.pageY = this.pageY === undefined ? y : this.pageY
		if (Math.abs(this.pageY - y) > 100) {
			const show = this.pageY - y > 0 ? true : false
			this.data.headerVisible = show
			this.pageY = y
		}
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	logoutClick() {
		this.props.history.push('/login')
	}

	searchFocus() {
		this.data.resultVisible = true
	}

	searchBlur() {
		this.data.resultVisible = false
	}

	midifyPwSubmit() {
		const {pwold, pwnew, pwnew2} = this.data

		if (pwold == '') {
			Toast.show('请输入旧密码')
		} else if (pwnew == '') {
			Toast.show('请输入新密码')
		} else if (pwnew.length < 6) {
			Toast.show('密码不得小于6位')
		} else if (pwnew2 == '') {
			Toast.show('请确认新密码')
		} else if (pwnew !== pwnew2) {
			Toast.show('两次密码输入不一致')
		} else {
			alert(1123)
		}
	}

	closeModifyPwPop() {
		this.data.modifyPw = false
		this.data.pwold = ''
		this.data.pwnew = ''
		this.data.pwnew2 = ''
	}

	render() {

		const userInfo = this.$user.info || {}

		const css = cn('app-header', {
			'app-header--visible': this.data.headerVisible
		})

		return (
			<div className={css}>
				<div className="inner">
					
					<h1 className="logo"></h1>

					<nav>
						<a className="active" href="javascript:;">Daily</a>
						<a href="javascript:;">Wiki</a>
					</nav>
					
					<div className="searchbar">
						<Input placeholder="查找用户" onFocus={::this.searchFocus} onBlur={::this.searchBlur} />
						{
							this.data.resultVisible ?
							<Border className="result">
								<div className="item">
									Eason.Chiu <span>EF Department</span>
								</div>
								<div className="item">
									Eason.Chiu <span>EF Department</span>
								</div>
							</Border> :
							null
						}
					</div>
					
					{
						userInfo.nickname ?
						<div className="user">
							<h6>你好: {userInfo.nickname}</h6>
							{
								userInfo.groupName ?
								<p>{userInfo.groupName}</p> :
								null
							}
							<span>
								<a href="javascript:;" onClick={e => this.data.modifyPw = true}>修改密码</a>
								<a href="javascript:;" onClick={::this.logoutClick}>退出帐号</a>
							</span>
						</div> :
						null
					}
					

				</div>

				<Dialog className="dailog-modifyPw"
					visible={this.data.modifyPw}
					onClose={::this.closeModifyPwPop}>
					{
						userInfo.role !== 1 ?
						<UserHeader className="header" name={userInfo.nickname} uid={userInfo.uid} /> :
						null
					}
					<h1>修改密码</h1>
					<div className="row">
						<label>旧密码</label>
						<Input placeholder="******"
							value={this.data.pwold}
							type="password"
							autoComplete="new-password"
							onChange={e => this.data.pwold = e.target.value.trim().substr(0, 20)} />
					</div>
					<div className="row">
						<label>新密码</label>
						<Input placeholder="******"
							value={this.data.pwnew}
							type="password"
							autoComplete="new-password"
							onChange={e => this.data.pwnew = e.target.value.trim().substr(0, 20)} />
					</div>
					<div className="row">
						<label>再次输入</label>
						<Input placeholder="******"
							value={this.data.pwnew2}
							type="password"
							autoComplete="new-password"
							onChange={e => this.data.pwnew2 = e.target.value.trim().substr(0, 20)} />
					</div>
					<div className="row">
						<label></label>
						<Button onClick={::this.midifyPwSubmit}>修改</Button>
					</div>
				</Dialog>

			</div>
		)
	}
}

export default Header