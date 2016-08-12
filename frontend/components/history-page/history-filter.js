import React from 'react'
import HistorySort from './history-sort'
import './history-filter.scss'

class HistoryFilter extends React.Component {

	constructor() {
		super();
	}

	render() {

		return(
			<div className="history-filter-bar">
				
				<table className="history-filter-table">
					<tbody>
					<tr>
						<td><input className="history-filter-bar-input" type="text" placeholder="Filter user by..."/></td>
						<td>Filter by created date: </td>
						<td><input className="history-filter-bar-input" type="text" placeholder="From"/></td>
						<td><input className="history-filter-bar-input" type="text" placeholder="To"/></td>
						<td className="cell-right-align"><HistorySort/></td>
					</tr>
					<tr>
						<td><input className="history-filter-bar-input" type="text" placeholder="Filter action by..."/></td>
						<td>Filter by updated date: </td>
						<td><input className="history-filter-bar-input" type="text" placeholder="From"/></td>
						<td><input className="history-filter-bar-input" type="text" placeholder="To"/></td>
						<td className="cell-right-align"><button className="btn btn-filter"><i className="fa fa-filter"/> Filter</button></td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default HistoryFilter