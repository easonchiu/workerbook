import React, { Component } from 'react'
import $group from './group'
import $user from './user'
import $daily from './daily'
import $project from './project'

import {inject, observer} from 'mobx-react'

const injectStore = Comp => {
	@inject('store')
	@observer
	class ComponentWithStore extends Comp {
		
		constructor(props) {
			super(props)
			Object.assign(this, {...props.store})
		}

		render() {
			return super.render()
		}

	}
	ComponentWithStore.displayName = `WithStore(${Comp.displayName || Comp.name})`
	return ComponentWithStore
}

export { injectStore }


export default {
	$user,
	$group,
	$daily,
	$project,
}

