import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable info = null // 用户信息

	@observable search = [] // 用户搜索

	@observable all = [] // 全部用户


	@action('获取全部用户')
	async fetchAll() {

		const res = await http.request({
			method: 'get',
	        url: `/user`,
		})

		runInAction(() => {
			this.all = res.data.userList
		})
	}

	@action('登录')
	async login(payload) {
		const res = await http.request({
			method: 'post',
	        url: `/user/login`,
	        data: {
	        	...payload
	        }
		})
		return res
	}

	@action('获取自己的个人信息')
	async fetchInfo(force = false) {
		if (this.info && !force) {
			return this.info
		}

		const res = await http.request({
			method: 'get',
	        url: `/user/info`,
		})

		runInAction(() => {
			this.info = res.data.userInfo
		})

		return res
	}

	@action('添加用户')
	add(payload) {
		console.log('tianjiaonghu')
		return http.request({
			method: 'post',
	        url: `/user/add`,
	        data: {
	        	...payload
	        }
		})
	}

	@action('修改密码')
	midifyPw(payload) {
		return http.request({
			method: 'post',
	        url: `/user/pwd`,
	        data: {
	        	...payload
	        }
		})
	}

	@action('用户搜索')
	async searchUser(payload) {
		const res = await http.request({
			method: 'post',
	        url: `/user/search`,
	        data: {
	        	...payload
	        }
		})

		runInAction(() => {
			this.search = res.data.userList
		})
		return res.data.userList
	}

}

export default new Store()