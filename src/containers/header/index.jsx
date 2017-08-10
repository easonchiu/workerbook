import './style'
import React, { Component } from 'react'

import reactStateData from 'react-state-data'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Dialog from 'src/components/dialog'
import UserHeader from 'src/components/userHeader'
import Border from 'src/containers/border'

@reactStateData
class Header extends Component {
	constructor(props) {
		super(props)

		this.setData({
			modifyPw: false,
			resultVisible: false,
		})
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
		return (
			<div className="app-header">
				<div className="inner">
					
					<h1 className="logo"></h1>

					<nav>
						<a className="active" href="javascript:;">Daily</a>
						<a href="javascript:;">Wiki</a>
					</nav>
					
					<div className="searchbar">
						<Input placeholder="keyword" onFocus={::this.searchFocus} onBlur={::this.searchBlur} />
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

					<div className="user">
						<h6>Hello: Eason.Chiu</h6>
						<p>FE Department</p>
						<span>
							<a href="javascript:;" onClick={e => this.data.modifyPw = true}>Modify Pw</a>
							<a href="javascript:;" onClick={::this.logoutClick}>Logout</a>
						</span>
					</div>

				</div>

				<Dialog className="dailog-modifyPw" visible={this.data.modifyPw} onBgClick={e => this.data.modifyPw = false}>
					<UserHeader className="header" name="Eason" uid={2} />
					<h1>Modify password</h1>
					<div className="row">
						<label>Old password</label>
						<Input placeholder="******" />
					</div>
					<div className="row">
						<label>New password</label>
						<Input placeholder="******" />
					</div>
					<div className="row">
						<label>Again</label>
						<Input placeholder="******" />
					</div>
					<div className="row">
						<label></label>
						<Button>Modify</Button>
					</div>
				</Dialog>

			</div>
		)
	}
}

export default Header