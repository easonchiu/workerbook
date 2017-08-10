import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable list = [] // 组列表

	@action('获取组数据')
	async fetchList() {
		if (this.list.length > 0) {
			return this.list
		}

		const res = await http.request({
			method: 'get',
	        url: `/group`,
		})

		runInAction(() => {
			this.list = res.data
		})

		return res
	}

}

export default new Store()