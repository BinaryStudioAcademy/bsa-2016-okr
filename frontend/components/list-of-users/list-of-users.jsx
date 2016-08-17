import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

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
		const {user, searchValue} = this.props.users;
		
		var userNodes = user.map(function (user, index) {
			if(user.userName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1)
				return;
			else
				return (
					<UserItem key={index} user={user} />
				);
		}.bind(this));

		return (
			<div>
				<CentralWindow>
					<div id='usersList'>
					<input type='text' className="searchBar" onChange={this.search} name='search' placeholder='Enter name'/>
						<div className="users-title">
                    		<p><span>Users</span></p>
                    	</div>
						<ul className='listOfUsers'>{userNodes}</ul>
					</div>
				</CentralWindow>
				<StatPanel>
					<Dashboard></Dashboard>
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
        users: state.users
    };
}

const ListOfUsersConnected = connect(mapStateToProps, mapDispatchToProps)(ListOfUsers);
export default ListOfUsersConnected
