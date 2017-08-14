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
				<h1>Groups</h1>
				<div className="tools">
					<a href="javascript:;">+ User</a>
					<a href="javascript:;">+ Group</a>
				</div>
				<Spin loading={this.$group.listFetching} height={200}>
					<ul>
						<li className={gid==='all'?'active':''}>
							{
								gid==='all' ?
								<p><i />All</p> :
								<a href="javascript:;" onClick={this.onClick.bind(this, '')}><i />All</a>
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
					<h1>Add user</h1>

					<div className="row">
						<label>Username</label>
						<Input type="text" />
					</div>

					<div className="row">
						<label>Password</label>
						<Input type="text" />
					</div>

					<div className="row">
						<label>Group</label>
						<Input type="text" />
					</div>

					<div className="row">
						<label></label>
						<Button>Add</Button>
					</div>

				</Dialog>

				<Dialog className="dailog-add-group" visible={false}>
					<h1>Add group</h1>

					<div className="row">
						<label>Group name</label>
						<Input type="text" />
					</div>

					<div className="row">
						<label></label>
						<Button>Add</Button>
					</div>

				</Dialog>

			</Border>
		)
	}
}

export default GroupList