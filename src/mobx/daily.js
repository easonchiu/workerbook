import { action, observable, computed, useStrict, runInAction } from "mobx"

import http from 'src/assets/libs/http'
import axios from 'axios'

useStrict(true)

class Store {

	@observable list = [] // 列表

	@action('获取数据')
	async fetchList() {
		const res = await http.request({
			method: 'get',
	        url: `/daily`,
		})

		runInAction(() => {
			this.list = res.data
		})

		return res
	}

}

export default new Store()