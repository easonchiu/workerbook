import { action, observable, computed, useStrict, runInAction } from "mobx"

useStrict(true)

class Store {

	@observable fetching = false

	@action('显示全局loading')
	showFetching() {
		this.fetching = true
	}

	@action('隐藏全局loading')
	hideFetching() {
		this.fetching = true
	}

}

export default new Store()