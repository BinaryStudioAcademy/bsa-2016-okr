import React, { Component } from 'react';
import moment from 'moment';

class UserHistory extends Component {
	constructor(props) {
		super(props);

		this.getActionType= this.getActionType.bind(this);
		this.getActionObjectName = this.getActionObjectName.bind(this);
	}

	getActionType(item) {
		let object = item.type.slice(item.type.indexOf(' ') + 1);
		
		if(item.type.indexOf('ADD') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">added { this.getActionObjectName(item) }</p>
				</div>
			);
	/*	} else if (item.type.indexOf('UPDATE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">updated { this.getActionObjectName(item) }</p>
				</div>
			);*/
		} else if ((item.type.indexOf('CHANGE') != -1) && (item.type.indexOf('SCORE') != -1)) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">
						changed score { this.getActionObjectName(item) }	to { item.userKeyResultScore }
					</p>
				</div>
			);
		/*} else if (item.type.indexOf('TITLE') != -1) {
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
						changed difficulty { this.getActionObjectName(item) } to { item.userKeyResultDifficulty }
					</p>
				</div>
			);*/
		} else if(item.type.indexOf('DELETE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">deleted { this.getActionObjectName(item) }</p>
				</div>
			);
		} else if (item.type.indexOf('RESTORE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">restored { this.getActionObjectName(item) }</p>
				</div>
			);
		} else if (item.type.indexOf('UNARCHIVED') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">unarchived { this.getActionObjectName(item) }</p>
				</div>
			);
		} else if (item.type.indexOf('ARCHIVED') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">archived { this.getActionObjectName(item) }</p>
				</div>
			);
		/*} else if (item.type.indexOf('TOOK_APPRENTICE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">start mentoring { this.getActionObjectName(item) }</p>
				</div>
			);
		} else if (item.type.indexOf('REMOVED_APPRENTICE') != -1) {
			return (
				<div className="action-text">
					<p className="author">
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="user-avatar"/>
						<span className="author-name">{ item.author.userInfo.firstName } { item.author.userInfo.lastName }</span>
					</p>
					<p className="action-description">finished mentoring { this.getActionObjectName(item) }</p>
				</div>
			); */ 
		}
	}

	getActionObjectName(historyItem) {
	 	if(historyItem.type.indexOf('OBJECTIVE') !== -1) {
	 		if(historyItem.userObjective) {
				return (<span> objective <span className="history-target">"{historyItem.userObjective.templateId.title}"</span></span>);
	 		} else {
	 			return (<span> objective <span className="history-target">"{historyItem.objective.title}"</span></span>);
	 		}
	 	} else if(historyItem.type.indexOf('KEY_RESULT') !== -1) {
	 		if(historyItem.userObjective) {
				let keyResults = historyItem.userObjective.keyResults;
				let keyResult;
				keyResults.forEach((key) => {
					if (key.templateId._id == historyItem.userKeyResult || key._id == historyItem.userKeyResult)
						keyResult = key;
				})
				return (<span>key result <span className="history-target">"{keyResult.templateId.title}"</span></span>);
			} else {
				return (<span>key result <span className="history-target">"{historyItem.keyResult.title}"</span></span>);
			}
		/*} else if(historyItem.type.indexOf('APPRENTICE') !== -1){
      return (<span><span className="history-target">{historyItem.user.userInfo.firstName} {historyItem.user.userInfo.lastName}</span></span>);
    } else if(historyItem.type.indexOf('CATEGORY') !== -1){
    	return (<span>category <span className="history-target">"{historyItem.category.title}"</span></span>);*/
  	} else {
    	return (<span>historyItem == undefined</span>)
    }
	}

	getIconType(item) {
		if(item.type.indexOf('ADD') != -1)
			return "fi flaticon-plus typeIcon green"
		/*else if (item.type.indexOf('UPDATE') != -1 || item.type.indexOf('CHANGE') != -1)
			return "fi flaticon-success typeIcon orange"*/
		else if (item.type.indexOf('DELETE') != -1)
			return "fi flaticon-error typeIcon red"
		else if (item.type.indexOf('RESTORE') != -1)
			return "fi flaticon-repeat-1 typeIcon green"
		else if (item.type.indexOf('UNARCHIVED') != -1)
			return "fi flaticon-bookmark-1 typeIcon green"
		else if (item.type.indexOf('ARCHIVED') != -1)
			return "fi flaticon-archive-2 typeIcon orange"
		/*else if (item.type.indexOf('TOOK') != -1)
			return "fi flaticon-user-3 typeIcon green"
		else if (item.type.indexOf('REMOVE') != -1)
			return "fi flaticon-user-3 typeIcon red"*/
	}

	render() {
		let itemList = this.props.items.map((item, i) => {
			return (
				<div key={ item._id } className="actionEvent">
					<div className="aside">
						<span> <i className={ this.getIconType(item) } aria-hidden="true"></i></span>
						<div className="eventDate">
							<div className="eventDate-day">{ moment(item.createdAt).format('DD') }</div>
							<div className="eventDate-month">{ moment(item.createdAt).format('MMM') }</div>
						</div>
					</div>
					{ this.getActionType(item) }
				</div>
			)
		
		});
		
		return (
			<div className="userActions">
					<div className="action-list-container">
						{itemList}
					</div>
			</div>
		)
	}
}

export default UserHistory;
