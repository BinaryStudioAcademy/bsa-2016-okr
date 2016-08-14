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
						<td className="cell-right-align">Filters:</td>
						<td><input className="history-filter-bar-input" type="text" placeholder="Filter by user..."/></td>
						<td>
							<select>
								<option value="date" select>Filter by action</option>
								<option value="user">Create</option>
								<option value="type">Update</option>
								<option value="object">Delete</option>
							</select></td>
						<td className="cell-right-align">Sort by: <select>
								<option value="user">User</option>
								<option value="type">Action</option>
								<option value="object">Object</option>
								<option value="date" select>Date</option>
							</select>
						</td>
					</tr>
					<tr>
						<td className="cell-right-align">Filter by date: </td>
						<td><input className="history-filter-bar-input" type="text" placeholder="From"/></td>
						<td><input className="history-filter-bar-input" type="text" placeholder="To"/></td>
						<td className="cell-right-align" colSpan="2">
							<button className="btn btn-filter">Reset</button> <button className="btn btn-blue btn-filter"><i className="fa fa-filter"/> Filter</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default HistoryFilter