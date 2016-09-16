import React, { Component } from 'react';
import RecycleBin from '../../common/recycle-bin/recycle-bin.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../../actions/recycleBinActions.js";


class AdminRecycleBin extends Component {


	render() {

		let visibleFilterCategories = [{isVisible: true}, {isVisible: true}, {isVisible: true}];
		return (
			<div>
			  <RecycleBin getData={this.getData.bind(this)} title={"Admin Recycle bin"} visibleFilterCategories = {visibleFilterCategories} restoreItem={this.restoreItem.bind(this)}/>
			</div>
		)
	}

    getData() {

       this.props.getObjectiveTemplatesRequest();
       this.props.getKeyResultsTemplatesRequest();
       this.props.getDeletedCategoriesRequest();
    }

    restoreItem(item) {


		if (item.type === "objective") {
			
			let body = {};		
			body.isDeleted = false;

			this.props.updateTemplateObjectivesRequest(item.id, body, item.id);
		}

		if (item.type === "key result") {
			
			let body = {};			
			body.isDeleted = false;

			this.props.updateTemplateKeyResultRequest(item.id, body, item.id);
		}

		if (item.type === "category") {
			
			let body = {};			
			body.isDeleted = false;

			this.props.updateCategoryRequest(item.id, body, item.id);
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


const AdminRecycleBinConnected = connect(mapStateToProps, mapDispatchToProps)(AdminRecycleBin);
export default AdminRecycleBinConnected