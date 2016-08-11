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
				<select>
				  <option value="date">Date</option>
				  <option value="type">Action</option>
				  <option value="author">Author</option>
				  <option value="option">option</option>
				</select>
			</div>
		)
	}
}

export default HistorySort