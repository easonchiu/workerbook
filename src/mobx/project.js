import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable list = [] // 项目列表
	@observable listFetching = false

	@action('获取项目列表')
	async fetchList() {
		if (this.list.length > 0) {
			return this.list
		}

		this.listFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/project?status=1`,
		})

		runInAction(() => {
			this.list = res.data.list
			this.listFetching = false
		})
	}

	@action('更新项目列表')
	async updateList() {
		this.listFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/project?status=1`,
		})

		runInAction(() => {
			this.list = res.data.list
			this.listFetching = false
		})
	}

	@action('添加新项目')
	async add(payload) {
		const res = await http.request({
			method: 'post',
	        url: `/project`,
	        data: {
	        	...payload
	        }
		})
		return res
	}

	@action('删除项目')
	async delete(payload) {
		const res = await http.request({
			method: 'delete',
	        url: `/project/${payload.id}`
		})
		return res
	}

	@action('归档项目')
	async file(payload) {
		const res = await http.request({
			method: 'patch',
	        url: `/project/file/${payload.id}`
		})
		return res
	}

	@action('修改项目名')
	async rename(payload) {
		const res = await http.request({
			method: 'patch',
	        url: `/project/${payload.id}`,
	        params: {
	        	name: payload.name
	        }
		})
		return res
	}

}

export default new Store()