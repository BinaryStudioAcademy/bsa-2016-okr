import React from 'react'
import './history-filter.scss'

class HistoryFilter extends React.Component {

	constructor() {
		super();
	}

	render() {

		return(
			<div className="history-filter-bar">
				<input className="history-filter-bar-input" type="text" placeholder="Filter by..."/>
				<input className="btn btn-search" type="button" value="Filter"/>
			</div>
		)
	}
}

export default HistoryFilter