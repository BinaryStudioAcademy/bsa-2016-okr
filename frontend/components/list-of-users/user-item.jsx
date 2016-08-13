import React, { Component } from 'react';
import UserProgress from './user-progress.jsx'
import { Link } from 'react-router';

class UserItem extends Component {
	constructor(props) {
		super(props);

		this.takeUser = this.takeUser.bind(this);
	}

	takeUser() {
		this.props.takeUser(this.props.id);
		
		var usersList = document.getElementById('usersList');
		if (usersList.classList.contains('undisplay')) {
			usersList.classList.remove('undisplay');
			usersList.classList.add('display');
		}
		else {
			usersList.classList.remove('display');
			usersList.classList.add('undisplay');
		}
	}

	render() {
		return (
			<Link to={`/user/${this.props.id}`}>
			<li className='userItem' onClick={this.takeUser}>
				<img src='https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg'/>
				<div className='userInfo'>
				<div>{this.props.name}</div>
				<div>Mentor</div>
				<UserProgress />
				</div>
			</li>
			</Link>
		)
	}
}

export default UserItem