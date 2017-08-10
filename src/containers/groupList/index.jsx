import './style'
import React from 'react'
import {Link} from 'react-router-dom'

import Border from 'src/containers/border'

const GroupList = ({children}) => {
	return (
		<Border className="app-group-list">
			<h1>Groups</h1>
			<ul>
				<li><Link to="/"><i />All</Link></li>
				<li><Link to="/1"><i />JAVA Department</Link></li>
				<li className="active"><Link to="/"><i />FE Department</Link></li>
				<li><Link to="/2"><i />JAVA Department</Link></li>
				<li><Link to="/3"><i />FE Department</Link></li>
				<li><Link to="/4"><i />JAVA Department</Link></li>
			</ul>
		</Border>
	)
}

export default GroupList