import React, { Component } from 'react'
import moment from 'moment';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/recycleBinActions.js";

class DeletedTmplsItem extends Component {


	constructor(props) {
		super(props);
		this.restoreItem = this.restoreItem.bind(this);
	}

	render() {

		let dateStr = moment(this.props.item.deletedDate).format('D MMMM YYYY, H:mm a');
		
		return (
			<tr className="bin-item-row">
				<td className="item-title">{ this.props.item.type }</td>
				<td className="item-category">{ this.props.item.category }</td>
				<td>{ this.props.item.title }</td>
				<td>{ this.props.item.description }</td>
				<td className="item-deleted-by">{ this.props.item.deletedBy}</td>
				<td>{ dateStr }</td>
				<td>
					<table className="controls">
					    <tbody>
							<tr>
								<td><button className="btn btn-blue-hover"  title="Restore" onClick={this.restoreItem}><i className="fi flaticon-repeat-1"></i></button></td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		);
	}

	restoreItem(id) {

		

		if (this.props.item.type === "objective") {
			let body = {};
			body.isDeleted = false;
			this.props.updateUserObjectivesRequest(this.props.item.id, body, this.props.item.id);
		}

		if (this.props.item.type === "key") {


			let body = {};

			let data = this.props.recycleBin.objectiveForUpdate;

			let id;

			for (let i = 0; i < data.length; i++) {

				for (let j = 0; j < data[i].keyResults.length; j++) {

					if (data[i].keyResults[j]._id === this.props.item.id) {
						
						id = data[i]._id;
						data[i].keyResults[j].deletedBy = null;
						data[i].keyResults[j].deletedDate = null;
						data[i].keyResults[j].isDeleted = false;

						body.keyResults = data[i].keyResults;

						i = data.length;
						break;
					}
				}
			}

			this.props.updateUserObjectivesRequest(id, body, this.props.item.id);
		}

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

const DeletedTmplsItemConnected = connect(mapStateToProps, mapDispatchToProps)(DeletedTmplsItem);
export default DeletedTmplsItemConnected
