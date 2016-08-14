import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import UserItem from './user-item.jsx';
import './list-of-users.scss';

class ListOfUsers extends Component {
	constructor(props) {
		super(props);

		this.search = this.search.bind(this);
		this.takeUser = this.takeUser.bind(this);
	}

	takeUser(id) {
		this.props.takeUserId(id);
	}

	search(e) {
		this.props.search(e.target.value);
	}

	render() {
		const {user, searchValue} = this.props.stateFromReducer.users;

		var userNodes = user.map(function (user, index) {
			if(user.userName.toLowerCase().indexOf(searchValue.toLowerCase()) === -1)
				return;
			else
				return (
					<UserItem takeUser={this.takeUser} key={index}
								id={user.userId} name={user.userName} mentor={user.mentor}/>
				);
		}.bind(this));

		return (
			<div>
				<CentralWindow>
					<div id='usersList'>
						<div className='title'>Users</div>
						<input type='text' className="searchBar" onChange={this.search} name='search' placeholder='Enter name'/>
						<ul className='listOfUsers'>{userNodes}</ul>
					</div>
				</CentralWindow>
				<StatPanel></StatPanel>
			</div>
		)
	}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}

const ListOfUsersConnected = connect(mapStateToProps, mapDispatchToProps)(ListOfUsers);
export default ListOfUsersConnected
