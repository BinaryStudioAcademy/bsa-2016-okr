import React, { Component } from 'react';
import moment from 'moment';
import { isMentorActionAllowed, isEmpty } from '../../../backend/utils/ValidateService';
import { Link } from 'react-router';

import './userHistory.scss';

class UserHistory extends Component {
	constructor(props) {
		super(props);

		this.getHistoryType= this.getHistoryType.bind(this);
		this.getHistoryObjectName = this.getHistoryObjectName.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
	}

	getHistoryType(item) {
		let object = item.type.slice(item.type.indexOf(' ') + 1);

		if(item.type.indexOf('ADD') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">added { this.getHistoryObjectName(item) }</p>
				</div>
			);
		} else if (item.type.indexOf('UPDATE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">updated { this.getHistoryObjectName(item) }</p>
				</div>
			);
		} else if ((item.type.indexOf('CHANGE') != -1) && (item.type.indexOf('SCORE') != -1)) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">
						changed score { this.getHistoryObjectName(item) }	to { item.userKeyResultScore }
					</p>
				</div>
			);
		} else if (item.type.indexOf('TITLE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">changed title to { item.userKeyResultTitle }</p>
				</div>
			);
		} else if (item.type.indexOf('DIFFICULTY') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">
						changed difficulty { this.getHistoryObjectName(item) } to { item.userKeyResultDifficulty }
					</p>
				</div>
			);
		} else if(item.type.indexOf('DELETE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">deleted { this.getHistoryObjectName(item) }</p>
				</div>
			);
		} else if (item.type.indexOf('RESTORE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">restored { this.getHistoryObjectName(item) }</p>
				</div>
			);
		} else if (item.type.indexOf('UNARCHIVED') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">unarchived { this.getHistoryObjectName(item) }</p>
				</div>
			);
		} else if (item.type.indexOf('ARCHIVED') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">archived { this.getHistoryObjectName(item) }</p>
				</div>
			)
		} else if (item.type.indexOf('TOOK_APPRENTICE') != -1){
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">is now mentoring { this.props.homePage ? this.getUserInfo(item) : 'you' }</p>
				</div>
			)
		} else if (item.type.indexOf('REMOVED_APPRENTICE') != -1){
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">{ this.props.homePage ? (<span>finished mentoring { this.getUserInfo(item) }</span>) :
						'isn\'t your mentor now' }</p>
				</div>
			)
		}
		
	}

	getUserInfo(historyItem) {
		if (isEmpty(historyItem.user)) {
			return;
		}
		let userName = historyItem.user.userInfo.firstName + ' ' + historyItem.user.userInfo.lastName;
		let userLink = (<Link to={`user/${historyItem.user._id}`} className="user-link">{ userName }</Link>);
		return (<span> to { userLink }</span>);
	}

	getHistoryObjectName(historyItem) {
		let userInfo = '';

		// user is mentor or admin and create something to his apprentice
		if (historyItem.author._id == this.props.user._id && historyItem.user && isMentorActionAllowed(historyItem.user, this.props.user)) {
			userInfo = this.getUserInfo(historyItem);
		}

		if(historyItem.userObjective == undefined) {return (<span>historyItem.userObjective == undefined</span>);};

		let fromBacklog = historyItem.userObjective.isBacklog === true;

		if(historyItem.type.indexOf('OBJECTIVE') !== -1){
			return (<span>{ fromBacklog ? 'backlog' : '' } objective <span className="history-target">"{historyItem.userObjective.templateId.title}"</span>{userInfo}</span>);
	 	};

		if(historyItem.type.indexOf('KEY_RESULT') !== -1) {
			let keyResults = historyItem.userObjective.keyResults;
			let isBacklog = historyItem.userObjective.isBacklog ? "backlog " : "";
			let keyResult;
			let objectiveName = historyItem.userObjective.templateId.title;

			keyResults.forEach((key) => {
				if (key.templateId._id == historyItem.userKeyResult || key._id == historyItem.userKeyResult)
					keyResult = key;
			})
			return (<span> key result <span className="history-target">"{keyResult.templateId.title}" to { isBacklog } objective { objectiveName }</span>{userInfo}</span>);
		}
	}

	getIconType(item) {
		if(item.type.indexOf('ADD') != -1)
			return "fi flaticon-plus typeIcon green"
		else if (item.type.indexOf('UPDATE') != -1 || item.type.indexOf('CHANGE') != -1)
			return "fi flaticon-success typeIcon orange"
		else if (item.type.indexOf('DELETE') != -1)
			return "fi flaticon-error typeIcon red"
		else if (item.type.indexOf('RESTORE') != -1)
			return "fi flaticon-repeat-1 typeIcon green"
		else if (item.type.indexOf('UNARCHIVED') != -1)
			return "fi flaticon-bookmark-1 typeIcon green"
		else if (item.type.indexOf('ARCHIVED') != -1)
			return "fi flaticon-archive-2 typeIcon orange"
		else if (item.type.indexOf('TOOK_APPRENTICE') != -1)
			return "fi flaticon-view typeIcon green"
		else if (item.type.indexOf('REMOVED_APPRENTICE') != -1)
			return "fi flaticon-hide typeIcon orange"
	}

	render() {
		let itemList = this.props.historyList.map((item, i) => {
			return (
				<div key={ item._id } className="historyEvent">
					<div className="aside">
						<span> <i className={ this.getIconType(item) } aria-hidden="true"></i></span>
						<div className="eventDate">
							<div className="eventDate-day">{ moment(item.createdAt).format('DD') }</div>
							<div className="eventDate-month">{ moment(item.createdAt).format('MMM') }</div>
						</div>
					</div>
					{ this.getHistoryType(item) }
				</div>
			)
		});
		
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

export default UserHistory;
