import React from 'react';
import './userHistory.scss';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/userDashboardActions.js";

class UserHistory extends React.Component{
	constructor(props){
		super(props);

		this.getHistoryType= this.getHistoryType.bind(this);
		this.getHistoryObjectName = this.getHistoryObjectName.bind(this);
	}

	getHistoryType(item) {
		let object = item.type.slice(item.type.indexOf(' ') + 1);
		// console.log('item',  item)
		if(item.type.indexOf('ADD') != -1)
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{item.author.userInfo.firstName} {item.author.userInfo.lastName}</span>
					</p>
					<p className="action-description">added {this.getHistoryObjectName(item)}</p>
				</div>
			)
		else if (item.type.indexOf('UPDATE') != -1)
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{item.author.userInfo.firstName} {item.author.userInfo.lastName}</span>
					</p>
					<p className="action-description">updated {this.getHistoryObjectName(item)}</p>
				</div>
			)
		else if (item.type.indexOf('CHANGE') != -1)
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{item.author.userInfo.firstName} {item.author.userInfo.lastName}</span>
					</p>
					<p className="action-description">changed score {this.getHistoryObjectName(item)} to {item.userKeyResultScore}</p>
				</div>
			)
		else if (item.type.indexOf('DELETE') != -1)
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{item.author.userInfo.firstName} {item.author.userInfo.lastName}</span>
					</p>
					<p className="action-description">deleted {this.getHistoryObjectName(item)}</p>
				</div>
			)
		else if (item.type.indexOf('RESTORE') != -1)
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{item.author.userInfo.firstName} {item.author.userInfo.lastName}</span>
					</p>
					<p className="action-description">restored {this.getHistoryObjectName(item)}</p>
				</div>
			)
	}


	getHistoryObjectName(historyItem){
		if(historyItem.userObjective == undefined) {return (<span>historyItem.userObjective == undefined</span>);};
	 	if(historyItem.type.indexOf('OBJECTIVE') !== -1){
			return (<span> objective <span className="history-target">"{historyItem.userObjective.templateId.title}"</span></span>);
	 	};

		if(historyItem.type.indexOf('KEY_RESULT') !== -1){
			let keyResults = historyItem.userObjective.keyResults;
			let keyResult;
			keyResults.forEach((key) => {
				if (key.templateId._id == historyItem.userKeyResult || key._id == historyItem.userKeyResult)
					keyResult = key;
			})
			return (<span>key result <span className="history-target">"{keyResult.templateId.title}"</span></span>);
		}
	}

	getIconType(item){
		if(item.type.indexOf('ADD') != -1)
			return "fi flaticon-plus typeIcon green"
		else if (item.type.indexOf('UPDATE') != -1 || item.type.indexOf('CHANGE') != -1)
			return "fi flaticon-success typeIcon orange"
		else if (item.type.indexOf('DELETE') != -1)
			return "fi flaticon-error typeIcon red"
		else if (item.type.indexOf('RESTORE') != -1)
			return "fi flaticon-repeat-1 typeIcon green"
	}

	render() {
		console.log(this.props.userDashboard.historyList);
		let itemList = this.props.userDashboard.historyList.map((item, i) => {
			return (
				<div key={item._id} className="historyEvent">
					<div className="aside">
						<span> <i className={this.getIconType(item)} aria-hidden="true"></i> </span>
						<div className="eventDate">
							<div className="eventDate-day">{moment(item.createdAt).format('DD')}</div>
							<div className="eventDate-month">{moment(item.createdAt).format('MMM')}</div>
						</div>
					</div>
					{this.getHistoryType(item)}
				</div>
			)
		})
		return (
			<div className="userHistory">
				<div className="history-body">
					<div className="history-list-container">
						{itemList}
					</div>
				</div>
			</div>
		)
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		userDashboard: state.userDashboard,
		myState: state.myState
	};
}

const UserHistoryConnected = connect(mapStateToProps, mapDispatchToProps)(UserHistory);

export default UserHistoryConnected;
