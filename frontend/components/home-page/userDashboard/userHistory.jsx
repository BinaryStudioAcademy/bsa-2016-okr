import React from 'react';
//import './userDashboard.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/userDashboardActions.js";

class UserHistory extends React.Component{
	constructor(props){
		super(props);
	}

	getHistory() {
		this.props.userDashboard.historyList.map((item, i) => {
			return (
				<tr key={item._id}>
					<td>{item._id}</td>
					<td>{item.type}</td>
					<td>{item.createdAt}</td>
				</tr>
			)
		})
	}

	render() {

		return (
			<div className="userDashboard">
				<table>
					<thead>
						<tr>
							<th>Object</th>
							<th>Action</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						{this.getHistory}
					</tbody>
				</table>
			</div>
		)
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		userDashboard: state.userDashboard
	};
}

const UserHistoryConnected = connect(mapStateToProps, mapDispatchToProps)(UserHistory);

export default UserHistoryConnected;