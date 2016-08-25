import React from 'react';
import './userHistory.scss';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/userDashboardActions.js";

class UserHistory extends React.Component{
	constructor(props){
		super(props);

		this.getHistory = this.getHistory.bind(this);
		this.getHistoryType= this.getHistoryType.bind(this);
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

	getHistoryType(item) {
		let object = item.type.split(' ')[1];
		if(item.type.indexOf('add') != -1)
			return (
				<p>{item.author} added {object}</p>
			)
		else if (item.type.indexOf('update') != -1)
			return (
				<p>{item.author} updated {object}</p>
			)
		else if (item.type.indexOf('delete') != -1)
			return (
				<p>{item.author} deleted {object}</p>
			)
	}

	render() {
		let itemList = this.props.userDashboard.historyList.map((item, i) => {
			return (
				<div key={item._id} className="historyEvent">
					{this.getHistoryType(item)}
					<div className="eventDate"> 
						{moment(item.createdAt).format('D MMMM YYYY, H:mm')}
					</div>
				</div>
			)
		})
		return (
			<div className="userHistory">
				<div className="title">
					<h1><span>Recently events</span></h1>
				</div>
				{itemList}
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