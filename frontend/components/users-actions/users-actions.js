import React,  { Component } from 'react';
import CentralWindow from '../../containers/central-window.jsx';
import UsersActionsItem from './users-actions-item.js';
import { isEmpty } from '../../../backend/utils/ValidateService';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from '../../actions/historyActions';

import './users-actions.scss'

class UsersActions extends Component {
	constructor() {
		super();

		this.incrementHistoryLimit = this.incrementHistoryLimit.bind(this);
		this.scroller = this.scroller.bind(this);

		this.infiniteScrollMargin = 300;
	}

	componentWillMount() {
		this.props.getHistoryItemsPaginate(this.props.history.limit);
	}

	scroller(e) {
		let scrollPos = e.target.scrollTop + e.target.clientHeight + this.infiniteScrollMargin;

		if (this.props.app.isLoading) {
			console.log('request in process');
			return;
		}

		if (scrollPos >= e.target.scrollHeight) {
			if (this.props.history.paginate.hasMore) {
				this.incrementHistoryLimit();
			}
		}
	}

	incrementHistoryLimit() {
		this.props.getHistoryItemsPaginate();
	}

	componentDidMount() {
		var scrollContainer = document.getElementById("central-window");
		scrollContainer.addEventListener('scroll', this.scroller);
	}

	componentWillUnmount() {
		var scrollContainer = document.getElementById("central-window");
		scrollContainer.removeEventListener('scroll', this.scroller);
		this.props.clearState();
	}

	render() {
		const { visibleItems } = this.props.history;
		if (isEmpty(visibleItems)) {
			return (
				<CentralWindow fullScreen={ true }>
					<div className='users-actions-title'>
						<p><span>Users Actions</span></p>
					</div>
					<div></div>
				</CentralWindow>
			)
		} else {
			let items = visibleItems.filter(item => {
				if (item.userObjective && item.userObjective.isBacklog) {
					return false;
				}
				return item.type.indexOf('APPRENTICE') != -1
					|| ((item.type.indexOf('OBJECTIVE') != -1 || item.type.indexOf('KEY_RESULT') != -1 )
						&& item.type.indexOf('UPDATE') == -1 && item.type.indexOf('CHANGE') == -1)
			});

			return (
				<CentralWindow fullScreen={ true }>
					<div className='users-actions-title'>
						<p><span>Users Actions</span></p>
					</div>
					<div>
						<UsersActionsItem items={ items }/>
					</div>
				</CentralWindow>
			)
		}
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actions, dispatch)
}

function mapStateToProps(state){
	return {
		history: state.history,
		app: state.app
	}
}

const UsersActionsConnected = connect(mapStateToProps, mapDispatchToProps)(UsersActions);
export default UsersActionsConnected