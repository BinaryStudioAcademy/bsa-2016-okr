import React, { Component } from 'react';
import RecycleBin from '../common/recycle-bin/recycle-bin.js';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../actions/recycleBinActions.js";


class UserRecycleBin extends Component {


	render() {

		let visibleFilterCategories = [{isVisible: true}, {isVisible: true}, {isVisible: false}];

		return (
			<div>
			  <RecycleBin getData={this.getData.bind(this)} title={"Recycle bin"} visibleFilterCategories = {visibleFilterCategories} restoreItem={this.restoreItem.bind(this)}/>
			</div>
		)
	}

    getData() {

        this.props.getUserDeletedObjectivesRequest();
        this.props.getUserObjectivesRequest();
    }

    restoreItem(item) {


		if (item.type === "objective") {
			let body = {};
			body.isDeleted = false;
			this.props.updateUserObjectivesRequest(item.id, body, item.id);
		}

		if (item.type === "key result") {

			let body = {};

			let data = this.props.recycleBin.objectiveForUpdate;

			let id;

			for (let i = 0; i < data.length; i++) {

				for (let j = 0; j < data[i].keyResults.length; j++) {

					if (data[i].keyResults[j]._id === item.id) {
						
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

			this.props.updateUserObjectivesRequest(id, body, item.id);
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


const UserRecycleBinConnected = connect(mapStateToProps, mapDispatchToProps)(UserRecycleBin);
export default UserRecycleBinConnected