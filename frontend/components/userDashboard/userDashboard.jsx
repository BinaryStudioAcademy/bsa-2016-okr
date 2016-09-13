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

		this.getView = this.getView.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.isVisibleContent = this.isVisibleContent.bind(this);
	}

	componentWillMount() {
		this.props.getMyHistory(this.props.where);
	}
	componentDidUpdate() {
		//this.props.getMyHistory();
	}
	componentWillUnmount() {
		this.props.clearUserDashboardState();
	}

	isVisibleContent(index) {
		if(this.props.userDashboard.tabIndex === index)
			return "showContent"
		else return "hideContent"
	}

	getView() {
		switch (this.props.userDashboard.tabIndex) {
			case 1:
				//return <UserHistory/>
				break;
			case 2:
				return //<UserList/>
				break;
			case 3: //<ObjectiveList/>
				break;
			case 4:
				return  //<KeyResultList/>
				break;
			case 5:
				return 
				break;
			default:
				return <UserHistory/>
				break;
		}
	}

	render() {
		let id;
		if( this.props.where === "otherPersonPage"){
			id = this.props.userPage.user._id;
			console.log(this.props.userPage.user)
		}
		else{
			id = this.props.myState.me._id;
			console.log(this.props.myState.me)
		}
		return (
			<div className="userDashboard">
				<Tabs/>
				<div className={this.isVisibleContent(1)}>
					<UserHistory />
				</div>
				<div className={this.isVisibleContent(2)}>
					<Dashboard userId={id} where={this.props.where}/>
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
		myState: state.myState,
		userPage: state.userPage
	};
}

const UserDashboardConnected = connect(mapStateToProps, mapDispatchToProps)(UserDashboard);

export default UserDashboardConnected;