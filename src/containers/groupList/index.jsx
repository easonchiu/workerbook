import './style'
import React, {Component} from 'react'
import qs from 'qs'

import reactStateData from 'react-state-data'
import {injectStore} from 'src/mobx'

import Border from 'src/components/border'
import Dialog from 'src/components/dialog'
import Input from 'src/components/input'
import Button from 'src/components/button'
import Spin from 'src/components/spin'
import Toast from 'src/components/toast'
import Select from 'src/components/select'

@injectStore
@reactStateData
class GroupList extends Component {
	
	constructor(props) {
		super(props)

		this.setData({
			addGroupPopVisible: false,
			addUserPopVisible: false,
			groupName: '',

			userName: '',
			nickName: '',
			password: '',
			groupId: '',
		})
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		this.fetch()
	}

	getSearch() {
		let search = this.props.location.search
		if (search) {
			search = search.replace(/\?/, '')
			return qs.parse(search)
		}
		return {}
	}

	async fetch() {
		this.$group.fetchList()
	}

	async updateGruop() {
		this.$group.updateList()
	}

	async addGroup(res) {
		try {
			await this.$group.add(res)
			this.updateGruop()
			Toast.success('添加成功')
		} catch(e) {
			Toast.show(e.msg)
		}

		this.onPopClose()
	}

	async addUser(res) {
		try {
			await this.$user.add(res)
			this.updateGruop()
			Toast.success('添加成功')
			this.$user.fetchAll()
		} catch(e) {
			Toast.show(e.msg)
		}

		this.onPopClose()
	}

	onClick(gid) {
		const search = this.getSearch()

		const {date, pid} = search
		if (gid != search.gid) {
			if (gid || date) {
				gid = gid ? gid : ''
				search.gid = gid
			} else {
				delete search.gid
			}
			this.props.history.push(`/index?${qs.stringify(search)}`)
			this.$daily.fetchDailyListWithGroupAndDate(gid, date, pid)
		}
	}

	onPopClose() {
		this.data.groupName = ''
		this.data.addGroupPopVisible = false
		
		this.data.userName = ''
		this.data.nickName = ''
		this.data.password = ''
		this.data.groupId = ''
		this.data.addUserPopVisible = false
	}

	addGroupSubmit() {
		const val = this.data.groupName.trim()

		if (val === '') {
			Toast.show('请输入分组名')
		} else {
			this.addGroup({
				name: val
			})
		}
	}

	addUserSubmit() {
		const name = this.data.userName.trim()
		const nName = this.data.nickName.trim()
		const pw = this.data.password.trim()
		const groupId = this.data.groupId

		if (name == '') {
			Toast.show('请输入姓名')
		} else if (nName == '') {
			Toast.show('请输入帐号')
		} else if (pw == '') {
			Toast.show('请输入初始密码')
		} else if (groupId == '') {
			Toast.show('请选择所在分组')
		} else {
			this.addUser({
				username: name,
				nickname: nName,
				password: pw,
				gid: groupId
			})
		}
	}

	render() {

		if (!this.$user.info) {
			return null
		}

		const group = this.$group.list || []

		const {gid = ''} = this.getSearch()
		const {page} = this.props.match.params

		const userInfo = this.$user.info || {}

		return (
			<Border className="app-group-list">
				<h1>
					成员分组
					{
						userInfo.role === 1 ?
						<a href="javascript:;" onClick={e => this.data.addGroupPopVisible = true}>添加组</a> :
						null
					}
					{
						userInfo.role === 1 ?
						<a href="javascript:;" onClick={e => this.data.addUserPopVisible = true}>添加成员</a> :
						null
					}
				</h1>

				<Spin loading={this.$group.listFetching} height={200}>
					<ul>
						<li className={page==='index'&&gid===''?'active':''}>
							{
								page==='index'&&gid==='' ?
								<p><i />全部</p> :
								<a href="javascript:;" onClick={this.onClick.bind(this, undefined)}><i />全部</a>
							}
						</li>
						{
							group.map(res => {
								return (
									<li key={res._id} className={page==='index'&&gid==res._id?'active':''}>
										{
											page==='index'&&gid==res._id ?
											<p>
												<i />
												<span>{res.name}</span>
												<em>{res.count}人</em>
											</p> :
											<a href="javascript:;" onClick={this.onClick.bind(this, res._id)}>
												<i />
												<span>{res.name}</span>
												<em>{res.count}人</em>
											</a>
										}
									</li>
								)
							})
						}
					</ul>
				</Spin>
				
				<Dialog className="dailog-add-user"
					visible={this.data.addUserPopVisible}
					onClose={::this.onPopClose}>
					<h1>添加成员</h1>

					<div className="row">
						<label>姓名</label>
						<Input type="text"
							value={this.data.nickName}
							onChange={e => this.data.nickName = e.target.value.substr(0, 20)} />
					</div>

					<div className="row">
						<label>登录帐号</label>
						<Input type="text"
							value={this.data.userName}
							onChange={e => this.data.userName = e.target.value.substr(0, 20)} />
					</div>

					<div className="row">
						<label>初始密码</label>
						<Input type="text"
							value={this.data.password}
							onChange={e => this.data.password = e.target.value.replace(/\s/i, '').substr(0, 10)} />
					</div>

					<div className="row">
						<label>所在分组</label>
						<Select value={this.data.groupId} onChange={e => this.data.groupId = e}>
							<Select.Option value="" text="请选择" />
							{
								group.map(res => <Select.Option key={res._id} value={res._id} text={res.name} />)
							}
						</Select>
					</div>

					<div className="row">
						<label></label>
						<Button onClick={::this.addUserSubmit}>添加</Button>
					</div>

				</Dialog>

				<Dialog className="dailog-add-group"
					visible={this.data.addGroupPopVisible}
					onClose={::this.onPopClose}>
					<h1>添加分组</h1>

					<div className="row">
						<label>分组名</label>
						<Input type="text"
							value={this.data.groupName}
							onChange={e => this.data.groupName = e.target.value.substr(0, 30)} />
					</div>

					<div className="row">
						<label></label>
						<Button onClick={::this.addGroupSubmit}>添加</Button>
					</div>

				</Dialog>

			</Border>
		)
	}
}

export default GroupList