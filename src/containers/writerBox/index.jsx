import './style'
import React from 'react'

import Border from 'src/components/border'
import Dailys from 'src/components/dailys'
import RecordInput from 'src/components/recordInput'

const WriterBox = ({children}) => {
	return (
		<div className="writer-box">
			<i className="icon" />
			<Border className="con">
				<Dailys className="my-daily" rewriteabled />
				<RecordInput className="newrecord" loading={false} />
			</Border>
		</div>
	)
}

export default WriterBox