import React from 'react'
import './history-sort.scss'

class HistorySort extends React.Component {

	constructor() {
		super();
	}

	render() {

		return(
			<div className="history-sort-bar">
				Sort by: 
				<select className="soflow">
				  <option value="user">User</option>
				  <option value="type">Action</option>
				  <option value="object">Object</option>
				  <option value="date" select>Date</option>
				</select>
			</div>
		)
	}
}

export default HistorySort