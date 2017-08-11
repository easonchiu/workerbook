import './style'
import React from 'react'
import cn from 'classnames'


const Spin = ({children, loading, className, height = 500}) => {

	const css = cn('app-spin', className)

	const load = (
		<div className="x-loading__spin">
			<svg className="x-loading__spin_circular" viewBox="25 25 50 50">
				<circle className="x-loading__spin_path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
			</svg>
		</div>
	)

	if (Array.isArray(children)) {
		return (
			<div className={css} style={{height:loading?height+'px':''}}>
				{
					loading ?
					load :
					children
				}
			</div>
		)
	}
	
	if (loading) {
		return <div className={css} style={{height:loading?height+'px':''}}>{load}</div>
	}
	
	if (children === undefined) {
		return null
	}
	return children
}

export default Spin