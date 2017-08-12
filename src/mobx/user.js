import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable info = null // 用户信息
	@observable chart = []
	@observable daily = {}
	@observable today = []
	@observable search = []


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
	async fetchInfo() {
		if (this.info) {
			return this.info
		}

		const res = await http.request({
			method: 'get',
	        url: `/user/info`,
		})

		runInAction(() => {
			this.info = res.data
		})

		return res
	}

}

export default new Store()