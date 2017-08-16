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

@injectStore
@reactStateData
class Header extends Component {
	constructor(props) {
		super(props)

		this.setData({
			modifyPw: false,
			resultVisible: false,
			headerVisible: true,
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

				<Dialog className="dailog-modifyPw" visible={this.data.modifyPw} onClose={e => this.data.modifyPw = false}>
					{
						userInfo.role !== 1 ?
						<UserHeader className="header" name={userInfo.nickname} uid={userInfo.uid} /> :
						null
					}
					<h1>修改密码</h1>
					<div className="row">
						<label>旧密码</label>
						<Input placeholder="******" />
					</div>
					<div className="row">
						<label>新密码</label>
						<Input placeholder="******" />
					</div>
					<div className="row">
						<label>再次输入</label>
						<Input placeholder="******" />
					</div>
					<div className="row">
						<label></label>
						<Button>修改</Button>
					</div>
				</Dialog>

			</div>
		)
	}
}

export default Header