import React, { Component } from 'react';
import DeletedTmplsItem from './DeletedTmplsItem';
import StatPanel from '../../../containers/statistic-panel.jsx';
import CentralWindow from "../../../containers/central-window.jsx";
// import '../../common/fonts/flaticon/_flaticon.scss';
import '../../common/styles/table.scss';

import data_for_recycle from '../../mockData/data_for_recycle_bin';

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
				<CentralWindow>
					<h1>Recycle Bin</h1>
					<input type="checkbox" id="cbObjectives" ></input>
					<label for="cbObjectives">Objectives</label>
					<div>
						<table className='table'>
							<thead>
								<tr>
									<th>Type</th>
									<th>Category</th>
									<th>Title</th>
									<th>Description</th>
									<th>Deleted By</th>
									<th>Date</th>
									<th className="actions">actions</th>
								</tr>
							</thead>
							<tbody>
								{ deleted_items }
							</tbody>
						</table>
					</div>
				</CentralWindow>
				<StatPanel></StatPanel>
			</div>
		);
	}
}

export default RecycleBin