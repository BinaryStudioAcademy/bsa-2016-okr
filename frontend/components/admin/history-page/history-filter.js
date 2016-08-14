import React from 'react'
// import HistorySort from './history-sort'

import '../../common/styles/commonStyles.scss'
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
						<td><input className="history-filter-bar-input" type="text" placeholder="Filter action by..."/></td>
						<td></td>
						<td>Sort by:</td>
						<td className="cell-right-align">
							<select>
								<option value="user">User</option>
								<option value="type">Action</option>
								<option value="object">Object</option>
								<option value="date" select>Date</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Filter by created date: </td>
						<td><input className="history-filter-bar-input" type="text" placeholder="From"/></td>
						<td><input className="history-filter-bar-input" type="text" placeholder="To"/></td>
						<td></td>
						<td className="cell-right-align"><button className="btn btn-filter"><i className="fa fa-filter"/> Filter</button></td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default HistoryFilter