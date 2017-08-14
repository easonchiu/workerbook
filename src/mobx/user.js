import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable info = null // 用户信息
	@observable chart = [] // 我的日报统计
	@observable chartFetching = false // 我的日报统计loading

	@observable daily = [] // 我的日报列表

	@observable today = [] // 我今天的日报
	@observable todayFetching = false // 我今天的日报loading
	@observable search = [] // 用户搜索

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

	@action('获取今天的日报')
	async fetchTodayDaily() {
		this.todayFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/user/daily/today`,
		})

		runInAction(() => {
			this.today = res.data
			this.todayFetching = false
		})
	}

	@action('获取我的日报分析')
	async fetchChart() {
		this.chartFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/user/daily/chart`,
		})

		runInAction(() => {
			this.chart = res.data
			this.chartFetching = false
		})
	}

}

export default new Store()