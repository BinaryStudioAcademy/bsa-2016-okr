import React from 'react';
import './userDashboard.scss';

import Dashboard from '../dashboard/dashboard.jsx'
import UserHistory from './userHistory.jsx';
import Tabs from './tabs.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/userDashboardActions";

class UserDashboard extends React.Component{
	constructor(props){
		super(props);

		this.isVisibleContent = this.isVisibleContent.bind(this);
	}

	componentWillMount() {
		this.props.getMyHistory(this.props.where);
		if(this.props.where != 'homePage')
			this.props.getStats(this.props.where);
	}
	
	componentDidUpdate() {
		//this.props.getMyHistory();
	}

	componentWillUnmount() {
		this.props.clearUserDashboardState();
	}

	isVisibleContent(index) {
		let { tabIndex } = this.props.userDashboard;
		
		return (tabIndex === index) ? 'showContent' : 'hideContent'
	}

	render() {
		let _id;
		let { historyList, score } = this.props.userDashboard;
		
		if(this.props.where === actions.OTHER_PERSON_PAGE) {
			({ _id } = this.props.userPage.user);
		}	else {
			({ _id } = this.props.myState.me);
		}

		return (
			<div className="userDashboard">
				<Tabs/>
				<div className={ this.isVisibleContent(1) } >
					<UserHistory historyList={ historyList } />
				</div>
				<div className={ this.isVisibleContent(2) } >
					<Dashboard 
						userId={ _id } 
						where={ this.props.where } 
					/>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		userDashboard: state.userDashboard,
		myState: state.myState,
		userPage: state.userPage
	};
}

const UserDashboardConnected = connect(mapStateToProps, mapDispatchToProps)(UserDashboard);

export default UserDashboardConnected;
