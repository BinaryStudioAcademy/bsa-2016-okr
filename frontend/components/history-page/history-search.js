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
				<button className="btn btn-search"><i className="fa fa-search"/> Search</button>
			</div>
		)
	}
}

export default HistorySearch