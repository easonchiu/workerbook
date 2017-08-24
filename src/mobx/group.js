import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable list = [] // 组列表
	@observable listFetching = false

	@observable userListActive = 0

	@action('设置侧栏用户头像的当前')
	setUserListActive(i) {
		this.userListActive = i
	}

	@action('获取组数据')
	async fetchList() {
		if (this.list.length > 0) {
			return this.list
		}

		this.listFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/group`,
		})

		runInAction(() => {
			this.list = res.data.group
			this.listFetching = false
		})
	}

	@action('更新组数据')
	async updateList() {
		const res = await http.request({
			method: 'get',
	        url: `/group`,
		})

		runInAction(() => {
			this.list = res.data.group
		})
	}

	@action('添加组')
	add(payload) {
		return http.request({
			method: 'post',
	        url: `/group/add`,
	        data: {
	        	...payload
	        }
		})
	}

}

export default new Store()