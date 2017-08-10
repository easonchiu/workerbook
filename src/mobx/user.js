import { action, observable, computed, useStrict, runInAction } from "mobx"

useStrict(true)

class Store {

	@observable info = {}
	@observable chart = []
	@observable daily = {}



	@action('登录')
	pop() {
		const list = this._list.concat([])
		list.pop()
		this._list = list
	}

}

export default new Store()