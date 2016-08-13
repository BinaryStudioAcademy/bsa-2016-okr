import React, { Component } from 'react'
import DeletedTmplsItem from './DeletedTmplsItem'
import CentralWindow from "../../../containers/central-window.jsx";
import './recycleBin.scss'

import data_for_recycle from '../../mockData/data_for_recycle_bin'

class RecycleBin extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let deleted_items = data_for_recycle.map((item) => {
			return <DeletedTmplsItem item={item} key={item.id} />
		});
		return (
				<div>
					<h2 className='recycle-title'>Recycle Bin</h2>
					<table className="bin-table">
						<thead>
							<tr className='recycle-head'>
								<th>type</th>
								<th>category</th>
								<th>title</th>
								<th>description</th>
								<th>deletedBy</th>
								<th>deletedDate</th>
								<th className="actions">actions</th>
							</tr>
						</thead>
						<tbody>
							{ deleted_items }
						</tbody>
					</table>
				</div>
		);
	}
}

export default RecycleBin