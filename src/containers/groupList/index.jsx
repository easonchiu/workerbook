import './style'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import reactStateData from 'react-state-data'

import Border from 'src/containers/border'
import Dialog from 'src/components/dialog'
import Input from 'src/components/input'
import Button from 'src/components/button'

@reactStateData
class GroupList extends Component {
	
	constructor(props) {
		super(props)
	}

	render() {
		
		const group = this.props.resource

		return (
			<Border className="app-group-list">
				<h1>Groups</h1>
				<div className="tools">
					<a href="javascript:;">+ User</a>
					<a href="javascript:;">+ Group</a>
				</div>
				<ul>
					<li className={this.props.current===undefined?'active':''}>
						{
							this.props.current===undefined ?
							<p><i />All</p> :
							<Link to="/"><i />All</Link>
						}
					</li>
					{
						group.map(res => {
							return (
								<li key={res.gid} className={this.props.current==res.gid?'active':''}>
									{
										this.props.current==res.gid ?
										<p><i />{res.groupName}</p> :
										<Link to={'/'+res.gid}><i />{res.groupName}</Link>
									}
								</li>
							)
						})
					}
				</ul>
				
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