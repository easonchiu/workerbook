import React from 'react'
import $group from './group'
import $user from './user'
import $daily from './daily'

const states = {
	$user,
	$group,
	$daily,
}

export default Comp => props => {
	return <Comp {...props} {...states} />
}