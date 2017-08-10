import './style'
import React from 'react'


const Circle = props => {
	
	var percent = (props.process || 0) / 100, perimeter = Math.PI * 2 * 35
    const css = perimeter * percent + " " + perimeter * (1- percent)

	return (
		<svg className="icon-circle" width="100" height="100" viewBox="0 0 100 100">
		    <circle cx="50" cy="50" r="35" strokeWidth="12" stroke="#e4ebf3" fill="none"></circle>
		    <circle cx="50" cy="50" r="35" strokeWidth="12" stroke="#6495ff" fill="none" transform="matrix(0,-1,1,0,0,100)" strokeDasharray={css}></circle>
		</svg>
	)
}

export default Circle