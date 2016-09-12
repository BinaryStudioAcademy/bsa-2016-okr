import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/usersListActions.js";

import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import Dashboard from "../dashboard/dashboard.jsx";
import UserItem from './user-item.jsx';
import './list-of-users.scss';

class ListOfUsers extends Component {
	constructor(props) {
		super(props);

		this.search = this.search.bind(this);
	}

	search(e) {
		this.props.search(e.target.value);
	}

	componentWillMount(){
		this.props.getUsersList();
	}

	render() {
		const {user, myApprentices, searchValue, name} = this.props.users;
		var mentor;

		var userNodes = user.map(function (user, index) {
			if((user.userId.userInfo.firstName + ' ' + user.userId.userInfo.lastName).toLowerCase().indexOf(searchValue.toLowerCase()) === 0 ||
				user.userId.userInfo.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) === 0 )
				return(
					<UserItem key={index} user={user} />
				);
			else
				return ;
		}.bind(this));

		var apprenticeNodes = myApprentices.map(function (user, index) {
			if((user.userId.userInfo.firstName + ' ' + user.userId.userInfo.lastName).toLowerCase().indexOf(searchValue.toLowerCase()) === 0 ||
				user.userId.userInfo.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) === 0 )
				return(
					<UserItem key={index} user={user} />
				);
			else
				return ;
		}.bind(this));


		if (this.props.me.mentor != null) {
			mentor = user.find(function (user, index) {
				return ( ((user.userId.userInfo.firstName + ' ' + user.userId.userInfo.lastName).toLowerCase().indexOf(searchValue.toLowerCase()) === 0 ||
					user.userId.userInfo.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) === 0) && 
					this.props.me.mentor._id == user.userId._id )						 
			}.bind(this));

			var mentorNodes = <UserItem user={mentor} />
		}
	

		let apprentices = null;
		let apprenticesList = null;
		let mentorList;
		let mentorTitle;

		if (apprenticeNodes.length > 0) {
		apprentices = ( <div className='users-title'>
											<p><span>Apprentices</span></p>
										</div>)
		apprenticesList = (<ul className='listOfUsers'>{apprenticeNodes}</ul>)
		}
		
		if (mentor != undefined) {
		mentorTitle = (	<div className='users-title'>
											<p><span>Mentor</span></p>
										</div>)
		mentorList = (<ul className='listOfUsers'>{mentorNodes}</ul>)
		}

		return (
			<div>
				<CentralWindow>
					<div id='usersList'>
					<input type='text' className="searchBar" onChange={this.search} name='search' placeholder='Enter name'/>
						{ mentorTitle }
						{ mentorList }
						{ apprentices }
						{ apprenticesList }
						<div className='users-title'>
							<p><span>Users</span></p>
							</div>
						<ul className='listOfUsers'>{userNodes}</ul>
					</div>
				</CentralWindow>
				<StatPanel>
					<div className="list-of-users-dashboard">
						<Dashboard></Dashboard>
					</div>
				</StatPanel>
			</div>
		)
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		users: state.usersList,
		me: state.myState.me
	};
}

const ListOfUsersConnected = connect(mapStateToProps, mapDispatchToProps)(ListOfUsers);
export default ListOfUsersConnected
