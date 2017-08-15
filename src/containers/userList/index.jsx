import './style'
import React from 'react'

import Border from 'src/components/border'
import UserHeader from 'src/components/userHeader'

const UserList = ({children}) => {
	return (
		<Border className="user-list clearfix">
			<h1>全部用户 <span>前端开发部门</span></h1>
			{
				[1,2,3,4,5,6,7,8,9,10,11,12,13].map(res => {
					return <UserHeader className="header" name="Eason" key={res} uid={res} link />
				})
			}
		</Border>
	)
}

export default UserList