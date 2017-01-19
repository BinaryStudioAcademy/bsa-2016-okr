import React, { Component } from 'react';
import RecycleBin from '../../common/recycle-bin/recycle-bin.js';
import CentralWindow from "../../../containers/central-window.jsx";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as recycleBinActions from "../../../actions/recycleBinActions.js";
import * as categoriesActions from "../../../actions/categoriesActions.js";

class AdminRecycleBin extends Component {


	render() {

		let visibleFilterCategories = [{isVisible: true}, {isVisible: true}, {isVisible: true}];
		return (
			<CentralWindow fullScreen={ true }>
			  <RecycleBin getData={this.getData.bind(this)} title={"Admin Recycle bin"} visibleFilterCategories = {visibleFilterCategories} restoreItem={this.restoreItem.bind(this)}/>
			</CentralWindow>
		)
	}

    getData() {

       this.props.recycleBinActions.getObjectiveTemplatesRequest();
       this.props.recycleBinActions.getKeyResultsTemplatesRequest();
       this.props.recycleBinActions.getDeletedCategoriesRequest();
    }

    restoreItem(item) {

		if (item.type === "objective") {
			
			let body = {};		
			body.isDeleted = false;

			this.props.recycleBinActions.updateTemplateObjectivesRequest(item.id, body, item.id);
		}

		if (item.type === "key result") {
			
			let body = {};			
			body.isDeleted = false;

			this.props.recycleBinActions.updateTemplateKeyResultRequest(item.id, body, item.id);
		}

		if (item.type === "category") {
			
			let body = {};			
			body.isDeleted = false;

			this.props.recycleBinActions.updateCategoryRequest(item.id, body, item.id);
			this.props.categoriesActions.getAllCategories();
		}

	}

}

function mapDispatchToProps(dispatch) {
	return {
		categoriesActions : bindActionCreators(categoriesActions, dispatch),
		recycleBinActions: bindActionCreators(recycleBinActions, dispatch)
	}
}

function mapStateToProps(state) {
	return {
		recycleBin: state.recycleBin
	};
}


const AdminRecycleBinConnected = connect(mapStateToProps, mapDispatchToProps)(AdminRecycleBin);
export default AdminRecycleBinConnected