import './style'
import React, {Component} from 'react'

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
		})
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

		const store = this.$user.info || {}

		return (
			<div className="app-header">
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
						store.userName ?
						<div className="user">
							<h6>你好: {store.userName}</h6>
							<p>{store.groupName}</p>
							<span>
								<a href="javascript:;" onClick={e => this.data.modifyPw = true}>修改密码</a>
								<a href="javascript:;" onClick={::this.logoutClick}>退出帐号</a>
							</span>
						</div> :
						null
					}
					

				</div>

				<Dialog className="dailog-modifyPw" visible={this.data.modifyPw} onBgClick={e => this.data.modifyPw = false}>
					<UserHeader className="header" name={store.userName} uid={store.uid} />
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