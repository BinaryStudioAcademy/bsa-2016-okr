import React from 'react'

import '../../common/styles/commonStyles.scss'
import './history-search.scss'

class HistorySearch extends React.Component {

	constructor() {
		super();
	}

	render() {

		return(
			<div className="history-search-bar">
				<input type="text" id="history-search-bar-input" placeholder="Search..."/>
				<button className="btn btn-green btn-search"><i className="fa fa-search"/> Search</button>
			</div>
		)
	}
}

export default HistorySearch