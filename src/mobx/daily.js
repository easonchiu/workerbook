import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable list = [] // 列表
	@observable listFetching = false // 列表的loading

	@action('获取列表数据')
	async fetchList() {
		this.list = []
		this.listFetching = true

		const res = await http.request({
			method: 'get',
	        url: `/daily`,
		})

		runInAction(() => {
			this.list = res.data
			this.listFetching = false
		})
	}


	@action('更新列表数据')
	async updateList() {
		const res = await http.request({
			method: 'get',
	        url: `/daily`,
		})

		runInAction(() => {
			this.list = res.data
			this.listFetching = false
		})
	}

}

export default new Store()