import React, { Component } from 'react';
import DeletedTmplsItem from './DeletedTmplsItem';
import StatPanel from '../../../containers/statistic-panel.jsx';
import CentralWindow from "../../../containers/central-window.jsx";
import RecycleBinFilter from './RecycleBinFilters';
import '../../common/styles/table.scss';
import './recycleBin.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../../actions/recycleBinActions.js";

class RecycleBin extends Component {

	constructor(props) {
		super(props);
		this.filterButtonState = this.filterButtonState.bind(this);
		this.handleFilterButton = this.handleFilterButton.bind(this);
	}
	handleFilterButton() {
		let show = this.props.recycleBin.showRecycleBinFilters;
		this.props.showFilters(!show);
	}
	filterButtonState(show) {
		if (show) {
			return 'active-button'
		} else {
			return ''
		}
	}

	render() {
		let deleted_items = this.props.recycleBin.recycleBinItems.map((item) => {
			return <DeletedTmplsItem item={item} key={item.id} />
		});
		return (
			<div>
				<CentralWindow>
					<div className="recycle-bin-header">
						<div className="recycle-bin-header-row">
							<div className="recycle-bin-title">
								Recycle bin
							</div>
							<div className='filter-panel'>
							<div className='recycle-bin-filter'><button className={"btn btn-blue btn-filter " + this.filterButtonState(this.props.recycleBin.showRecycleBinFilters)} 
										onClick={this.handleFilterButton}>
						<i className="fa fa-filter"/> Filter <i className="fa fa-caret-down"/></button></div>
							</div>
						</div>
						<div className="recycle-bin-header-row">
								<div className="recucle-bin-filter-bar-container">
									<RecycleBinFilter/>
								</div>
						</div>
					</div>
					
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
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		recycleBin: state.recycleBin
	};
}

const RecycleBinConnected = connect(mapStateToProps, mapDispatchToProps)(RecycleBin);
export default RecycleBinConnected