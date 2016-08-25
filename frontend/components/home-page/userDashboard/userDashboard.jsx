import React from 'react';
import './userDashboard.scss';

import UserHistory from './userHistory.jsx';
import Tabs from './tabs.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/userDashboardActions";

class UserDashboard extends React.Component{
	constructor(props){
		super(props);

		this.getView = this.getView.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.isVisibleContent = this.isVisibleContent.bind(this);
	}

	componentWillMount() {
		console.log(this.props.userDashboard);
	}

	isVisibleContent() {
		console.log('done');
		if(this.props.userDashboard.tabIndex === 1)
			return "showContent"
		else return "hideContent"
	}

	getView() {
		console.log('-----------mounted-----------');
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

		return (
			<div className="userDashboard">
				<Tabs/>
				<div className="content"> 
					{this.getView()}
				</div>
				<div className={this.isVisibleContent()}>
					<UserHistory />
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
		userDashboard: state.userDashboard
	};
}

const UserDashboardConnected = connect(mapStateToProps, mapDispatchToProps)(UserDashboard);

export default UserDashboardConnected;