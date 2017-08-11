import './style'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import qs from 'qs'

import connect from 'src/mobx'
import reactStateData from 'react-state-data'
import {observer} from 'mobx-react'

import Border from 'src/components/border'
import Dialog from 'src/components/dialog'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Spin from 'src/components/spin'

@connect
@reactStateData
@observer
class GroupList extends Component {
	
	constructor(props) {
		super(props)

		this.setData({
			loading: true
		})
	}

	componentDidMount() {
		this.fetchData()
	}

	async fetchData() {
		this.data.loading = true
		await this.props.$group.fetchList()
		this.data.loading = false
	}

	render() {
		
		const group = this.props.$group.list

		const {gid} = qs.parse(this.props.location.search, {ignoreQueryPrefix:true})

		return (
			<Border className="app-group-list">
				<h1>Groups</h1>
				<div className="tools">
					<a href="javascript:;">+ User</a>
					<a href="javascript:;">+ Group</a>
				</div>
				<Spin loading={this.data.loading} height={200}>
					<ul>
						<li className={gid===undefined?'active':''}>
							{
								gid===undefined ?
								<p><i />All</p> :
								<Link to="/daily"><i />All</Link>
							}
						</li>
						{
							group.map(res => {
								return (
									<li key={res.gid} className={gid==res.gid?'active':''}>
										{
											gid==res.gid ?
											<p><i />{res.groupName}</p> :
											<Link to={'/daily?gid='+res.gid}><i />{res.groupName}</Link>
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