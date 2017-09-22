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
class ProjectList extends Component {
	
	constructor(props) {
		super(props)

		this.setData({
			addProjectPopVisible: false,
			deleteProjectPopVisible: false,
			fileProjectPopVisible: false,
			renameProjectPopVisible: false,
			projectName: '',
			popupProjectName: '',
			popupProjectId: '',
			active: 0,
		})

		this.size = 11
	}

	getSearch() {
		let search = this.props.location.search
		if (search) {
			search = search.replace(/\?/, '')
			return qs.parse(search)
		}
		return {}
	}

	shouldComponentUpdate(nProps, nState) {
		return this.props !== nProps || this.state !== nState
	}

	componentDidMount() {
		this.fetch()
	}

	async fetch() {
		this.$project.fetchList()
	}

	onPopClose() {
		this.data.projectName = ''
		this.data.addProjectPopVisible = false
		this.data.deleteProjectPopVisible = false
		this.data.fileProjectPopVisible = false
		this.data.renameProjectPopVisible = false
		this.data.popupProjectId = ''
	}

	addProjectSubmit() {
		const val = this.data.projectName.trim()

		if (val === '') {
			Toast.show('请输入项目名')
		} else {
			this.addProject({
				name: val
			})
		}
	}

	deleteProjectSubmit() {
		const val = this.data.projectName.trim()

		if (this.data.popupProjectId == '') {
			Toast.show('系统错误')
		} else if (val === '') {
			Toast.show('请输入项目名')
		} else {
			this.deleteProject({
				id: this.data.popupProjectId
			})
		}
	}

	fileProjectSubmit() {
		const val = this.data.projectName.trim()

		if (this.data.popupProjectId == '') {
			Toast.show('系统错误')
		} else if (val === '') {
			Toast.show('请输入项目名')
		} else {
			this.fileProject({
				id: this.data.popupProjectId
			})
		}
	}

	async addProject(res) {
		try {
			await this.$project.add(res)
			this.updateProject()
			Toast.success('添加成功')
		} catch(e) {
			Toast.show(e.msg)
		}

		this.onPopClose()
	}

	async deleteProject(res) {
		try {
			await this.$project.delete(res)
			this.updateProject()
			Toast.success('删除成功')
		} catch(e) {
			Toast.show(e.msg)
		}

		this.onPopClose()
	}

	async fileProject(res) {
		try {
			await this.$project.file(res)
			this.updateProject()
			Toast.success('归档成功')
		} catch(e) {
			Toast.show(e.msg)
		}

		this.onPopClose()
	}

	async updateProject() {
		this.$project.updateList()
	}

	showDeletePopup(data) {
		this.data.deleteProjectPopVisible = true
		this.data.popupProjectName = data.name
		this.data.popupProjectId = data._id
	}

	showFilePopup(data) {
		this.data.fileProjectPopVisible = true
		this.data.popupProjectName = data.name
		this.data.popupProjectId = data._id
	}

	onClick(id) {
		const search = this.getSearch()

		if (id != search.pid) {
			if (id) {
				search.pid = id
			} else {
				delete search.pid
			}
			this.props.history.push(`/index?${qs.stringify(search)}`)
			this.$daily.fetchDailyListWithGroupAndDate(search.gid, search.date, search.pid)
		}
	}

	pageClick(i) {
		this.data.active = i
	}

	render() {

		if (!this.$user.info) {
			return null
		}

		const project = this.$project.list || []

		const {pid = ''} = this.getSearch()

		const userInfo = this.$user.info || {}

		const pageCount = Math.ceil(project.length / this.size)

		const currentList = [{
			_id: '',
			name: '全部',
		}]
		for (let i = 0, len = this.size; i < len; i++) {
			const j = i + this.size * this.data.active
			const item = project[j]
			if (item) {
				currentList.push(project[j])
			}
		}

		return (
			<Border className="app-project-list">
				<h1>
					项目分类
					{
						userInfo.role === 1 ?
						<a href="javascript:;"
							onClick={e => this.data.addProjectPopVisible = true}>
							添加
						</a> :
						null
					}
				</h1>
				
				{
					pageCount > 1 ?
					<ul className="page">
						{
							Array.from({length:pageCount}).map((res, i) =>
								<li key={i}
									onClick={e => this.pageClick(i)}
									className={this.data.active == i ? 'active': ''}>
									<a href="javascript:;"><sub /></a>
								</li>
							)
						}
					</ul> :
					null
				}
				
				<Spin loading={this.$project.listFetching} height={200}>
					<ul>
						{
							currentList.map(res => (
								<li key={res._id} className={pid == res._id ? 'active' : ''}>
									{
										pid == res._id ?
										<p><i />{res.name}</p> :
										<a href="javascript:;"
											onClick={this.onClick.bind(this, res._id)}>
											<i />{res.name}
										</a>
									}
									{
										res._id != '' && userInfo.role === 1 ?
										<div className="tools">
											<a href="javascript:;"
												onClick={this.showFilePopup.bind(this, res)}>
												归档
											</a>
											<a href="javascript:;"
												onClick={this.showDeletePopup.bind(this, res)}>
												删除
											</a>
										</div> :
										null
									}
								</li>
							))
						}
					</ul>
				</Spin>

				<Dialog className="dailog-add-project"
					visible={this.data.addProjectPopVisible}
					onClose={::this.onPopClose}>
					<h1>添加项目</h1>

					<div className="row">
						<label>项目名</label>
						<Input type="text"
							value={this.data.projectName}
							onChange={e => this.data.projectName = e.target.value.substr(0, 30)} />
					</div>

					<div className="row">
						<label></label>
						<Button onClick={::this.addProjectSubmit}>添加</Button>
					</div>

				</Dialog>

				<Dialog className="dailog-add-project"
					visible={this.data.deleteProjectPopVisible}
					onClose={::this.onPopClose}>
					<h1>删除{this.data.popupProjectName}项目</h1>

					<div className="row">
						<label>核对项目名</label>
						<Input type="text"
							value={this.data.projectName}
							onChange={e => this.data.projectName = e.target.value.substr(0, 30)} />
					</div>

					<div className="row">
						<label></label>
						<Button type="danger" onClick={::this.deleteProjectSubmit}>确认删除</Button>
					</div>
				</Dialog>

				<Dialog className="dailog-file-project"
					visible={this.data.fileProjectPopVisible}
					onClose={::this.onPopClose}>
					<h1>归档{this.data.popupProjectName}项目</h1>

					<div className="row">
						<label>核对项目名</label>
						<Input type="text"
							value={this.data.projectName}
							onChange={e => this.data.projectName = e.target.value.substr(0, 30)} />
					</div>

					<div className="row">
						<label></label>
						<Button onClick={::this.fileProjectSubmit}>确认归档</Button>
					</div>
				</Dialog>

			</Border>
		)
	}
}

export default ProjectList