import React, { Component } from 'react'
import moment from 'moment';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/recycleBinActions.js";

class RecycleBinItem extends Component {

	render() {

		let dateStr = moment(this.props.item.deletedDate).format('D MMMM YYYY, h:mm a');
		
		return (
			<tr key={this.props.item.id} className="bin-item-row">
				<td className="width-20perc">{ this.props.item.title }</td>
				<td className="width-30perc">{ this.props.item.description }</td>
				<td className="item-title">{ this.props.item.type }</td>
				<td> <span className="item-category">{ this.props.item.category }</span></td>
				<td className="item-deleted-by">{ this.props.item.deletedBy}</td>
				<td className="width-15perc">{ dateStr }</td>
				<td className="width-5perc">
					<button className="btn btn-blue-hover"  title="Restore" onClick={this.restoreItem.bind(this)}><i className="fi flaticon-repeat-1"></i></button>
				</td>
			</tr>
		);
	}

	restoreItem(id) {


		if (this.props.item.type === "objective") {
			
			let body = {};		
			body.isDeleted = false;

			this.props.updateTemplateObjectivesRequest(this.props.item.id, body, this.props.item.id);
		}

		if (this.props.item.type === "key result") {
			
			let body = {};			
			body.isDeleted = false;

			this.props.updateTemplateKeyResultRequest(this.props.item.id, body, this.props.item.id);
		}

		if (this.props.item.type === "category") {
			
			let body = {};			
			body.isDeleted = false;

			this.props.updateCategoryRequest(this.props.item.id, body, this.props.item.id);
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

const RecycleBinItemConnected = connect(mapStateToProps, mapDispatchToProps)(RecycleBinItem);
export default RecycleBinItemConnected
