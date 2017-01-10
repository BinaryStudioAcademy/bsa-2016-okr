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
		super()
	}

	componentWillMount() {
		this.props.getHistoryItems();
	}

	render() {
		const { visibleItems } = this.props.history;
		if (isEmpty(visibleItems)) {
			return (
				<div>
					<CentralWindow fullScreen={ true }>
						<div className='users-actions-title'>
							<p><span>Users Actions</span></p>
						</div>
						<div>
						</div>
					</CentralWindow>
				</div>
			)
		} else {
			let items = visibleItems.filter(item => {
				return ((item.type.indexOf('OBJECTIVE') != -1 ||
				item.type.indexOf('KEY_RESULT') != -1 ) &&
				item.type.indexOf('UPDATE') == -1 &&
				item.type.indexOf('CHANGE') == -1)
			});
			return (
				<div>
					<CentralWindow fullScreen={ true }>
						<div className='users-actions-title'>
							<p><span>Users Actions</span></p>
						</div>
						<div>
							<UsersActionsItem items={ items }/>
						</div>
					</CentralWindow>
				</div>
			)
		}
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actions, dispatch)
}

function mapStateToProps(state){
	return {
		history: state.history
	}
}

const UsersActionsConnected = connect(mapStateToProps, mapDispatchToProps)(UsersActions);
export default UsersActionsConnected