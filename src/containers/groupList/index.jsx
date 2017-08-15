import './style'
import React, {Component} from 'react'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dialog from 'src/components/dialog'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Spin from 'src/components/spin'

@injectStore
class GroupList extends Component {
	
	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		this.$group.fetchList()
	}

	onClick(gid) {
		if (gid) {
			this.props.history.push('/daily/' + gid)
		} else {
			this.props.history.push('/daily')
		}
		this.$daily.updateList()
	}

	render() {
		
		const group = this.$group.list

		const {gid = 'all', date} = this.props.match.params

		return (
			<Border className="app-group-list">
				<h1>用户分组</h1>
				<div className="tools">
					<a href="javascript:;">添加用户</a>
					<a href="javascript:;">添加组</a>
				</div>
				<Spin loading={this.$group.listFetching} height={200}>
					<ul>
						<li className={gid==='all'?'active':''}>
							{
								gid==='all' ?
								<p><i />全部用户</p> :
								<a href="javascript:;" onClick={this.onClick.bind(this, '')}><i />全部用户</a>
							}
						</li>
						{
							group.map(res => {
								return (
									<li key={res.gid} className={gid==res.gid?'active':''}>
										{
											gid==res.gid ?
											<p><i />{res.groupName}</p> :
											<a href="javascript:;" onClick={this.onClick.bind(this, res.gid)}><i />{res.groupName}</a>
										}
									</li>
								)
							})
						}
					</ul>
				</Spin>
				
				<Dialog className="dailog-add-user" visible={false}>
					<h1>添加用户</h1>

					<div className="row">
						<label>用户名</label>
						<Input type="text" />
					</div>

					<div className="row">
						<label>初始密码</label>
						<Input type="text" />
					</div>

					<div className="row">
						<label>所在分组</label>
						<Input type="text" />
					</div>

					<div className="row">
						<label></label>
						<Button>添加</Button>
					</div>

				</Dialog>

				<Dialog className="dailog-add-group" visible={false}>
					<h1>添加分组</h1>

					<div className="row">
						<label>分组名</label>
						<Input type="text" />
					</div>

					<div className="row">
						<label></label>
						<Button>添加</Button>
					</div>

				</Dialog>

			</Border>
		)
	}
}

export default GroupList