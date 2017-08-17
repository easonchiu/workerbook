import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable list = [] // 列表
	@observable listFetching = false // 列表的loading

	@observable myToday = {} // 我今天的日报
	@observable myTodayFetching = false // 我今天的日报loading

	@observable myDashboard = [] // 我的日报统计
	@observable myDashboardFetching = false // 我的日报统计loading

	@observable myHistory = [] // 我的日报历史
	@observable myHistoryFetching = false // 我的日报历史loading


	@action('获取用户组的日报列表数据')
	async fetchDailyListWithGroupAndDate(gid = 'all', date = 0) {
		if (this.list.length == 0) {
			this.listFetching = true
		}

		const res = await http.request({
			method: 'get',
	        url: `/daily/list/${gid}/${date}`,
		})

		runInAction(() => {
			this.list = res.data.dailyList
			if (this.listFetching) {
				this.listFetching = false
			}
		})
	}


	@action('获取我今天的日报')
	async fetchMyTodayDaily() {
		if (!this.myToday._id) {
			this.myTodayFetching = true
		}

		const res = await http.request({
			method: 'get',
	        url: `/daily/info`,
		})

		runInAction(() => {
			this.myToday = res.data.dailyInfo

			if (this.myTodayFetching) {
				this.myTodayFetching = false
			}
		})
	}

	@action('获取某人某天的日报')
	async fetchDayDailyWithDateAndUid(date, uid) {
		// this.myTodayFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/daily/info/${date}/${uid}`,
		})

		runInAction(() => {
			// this.myToday = res.data.dailyInfo
			// this.myToday = []
			// this.myTodayFetching = false
		})
	}


	@action('获取我的日报历史')
	async fetchMyHistoryDailyList() {
		this.myHistoryFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/daily/user/1`,
		})

		runInAction(() => {
			this.myHistory = res.data.dailyList
			this.myHistoryFetching = false
		})
	}

	@action('获取我的日报报表')
	async fetchMyDailyDashboard() {
		this.myDashboardFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/daily/dashboard`,
		})

		runInAction(() => {
			this.myDashboard = res.data
			this.myDashboardFetching = false
		})
	}

	@action('添加我的日报内容')
	add(payload) {
		return http.request({
			method: 'post',
	        url: `/daily/add`,
	        data: {
	        	...payload
	        }
		})
	}

	@action('更新我的日报内容')
	update(payload) {
		return http.request({
			method: 'put',
	        url: `/daily/update/${payload.id}`,
	        data: {
	        	...payload
	        }
		})
	}

	@action('删除我的日报内容')
	delete(payload) {
		return http.request({
			method: 'delete',
	        url: `/daily/remove/${payload.id}`
		})
	}

}

export default new Store()