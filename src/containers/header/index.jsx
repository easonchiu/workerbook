import './style'
import React, {Component} from 'react'
import cn from 'classnames'
import {Link} from 'react-router-dom'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Input from 'src/components/input'
import Button from 'src/components/button'
import Dialog from 'src/components/dialog'
import UserHeader from 'src/components/userHeader'
import Border from 'src/components/border'
import Toast from 'src/components/toast'
import Spin from 'src/components/spin'

import {clearToken} from 'src/assets/libs/token'

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
			modifying: false,

			searchKey: '',
			searchLoading: false,
		})

		this.onScroll = this.onScroll.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
		clearTimeout(this.searchBlurTimer)
		clearTimeout(this.searchTimer)
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
		clearToken()
		this.props.history.push('/login')
	}

	searchFocus(e) {
		if (e.target.value.trim() != '') {
			this.searchChange(e)
		}
		clearTimeout(this.searchBlurTimer)
	}

	searchBlur() {
		this.searchBlurTimer = setTimeout(e => {
			this.data.resultVisible = false
			this.data.searchLoading = false
			this.data.searchKey = ''
		}, 500)
	}

	searchChange(e) {
		const value = e.target.value
		this.data.searchKey = value
		if (value.trim() != '') {
			this.data.resultVisible = true
			this.data.searchLoading = true
			clearTimeout(this.searchTimer)
			this.searchTimer = setTimeout(this.fetchSearch.bind(this), 300)
		} else {
			this.data.resultVisible = false
			this.data.searchLoading = false
		}
	}

	async fetchSearch() {
		try {
			const res = await this.$user.searchUser({
				keyword: this.data.searchKey
			})
		} catch(e) {
			console.log(e.msg)
		}
		this.data.searchLoading = false
	}

	async midifyPwSubmit() {
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
		} else if (pwold === pwnew) {
			Toast.show('新密码不能与原始密码一致')
		} else {
			this.data.modifying = true
			try {
				await this.$user.midifyPw({
					oldPassword: pwold,
					newPassword: pwnew,
				})
				// 关闭弹框
				this.closeModifyPwPop()

				// 清除token
				clearToken()

				// 跳回到登录页面
				this.props.history.push('/login')
			} catch(e) {
				Toast.show(e.msg)
			}
			this.data.modifying = false
		}
	}

	closeModifyPwPop() {
		this.data.modifying = false
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
						<Link className="active" to="/">Daily</Link>
						<a href="javascript:;" onClick={e => Toast.success('Coming soon')}>Wiki</a>
					</nav>
					
					<div className="searchbar">
						<Input placeholder="查找用户"
							onFocus={::this.searchFocus}
							onBlur={::this.searchBlur}
							value={this.data.searchKey}
							onChange={::this.searchChange} />
						{
							this.data.resultVisible ?
							this.data.searchLoading ?
							<Border className="result">
								<Spin loading height={80} />
							</Border> :
							<Border className="result">
								{
									this.$user.search && this.$user.search.length > 0 ?
									this.$user.search.map(res => (
										<Link to={'/user/'+res._id} key={res._id} className="item">
											{res.nickname} <span>{res.gid.name}</span>
										</Link>
									)) :
									<p className="empty">找不到该用户</p>
								}
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
							disabled={this.data.modifying}
							onChange={e => this.data.pwold = e.target.value.trim().substr(0, 20)} />
					</div>
					<div className="row">
						<label>新密码</label>
						<Input placeholder="******"
							value={this.data.pwnew}
							type="password"
							autoComplete="new-password"
							disabled={this.data.modifying}
							onChange={e => this.data.pwnew = e.target.value.trim().substr(0, 20)} />
					</div>
					<div className="row">
						<label>再次输入</label>
						<Input placeholder="******"
							value={this.data.pwnew2}
							type="password"
							autoComplete="new-password"
							disabled={this.data.modifying}
							onChange={e => this.data.pwnew2 = e.target.value.trim().substr(0, 20)} />
					</div>
					<div className="row">
						<label></label>
						<Button loading={this.data.modifying} onClick={::this.midifyPwSubmit}>修改</Button>
					</div>
				</Dialog>

			</div>
		)
	}
}

export default Header