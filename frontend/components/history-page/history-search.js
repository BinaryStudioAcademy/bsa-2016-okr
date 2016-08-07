import React from 'react'
import './history-search.scss'

class HistorySearch extends React.Component {

	constructor() {
		super();
	}

	render() {

		return(
			<div className="history-search-bar">
				<input className="history-search-bar-input" type="text" placeholder="Search..."/>
				<input className="btn btn-search" type="button" value="Search"/>
			</div>
		)
	}
}

export default HistorySearch