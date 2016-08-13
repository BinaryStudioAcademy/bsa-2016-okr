import React, { Component } from 'react';
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
				<img src='https://pp.vk.me/c633829/v633829341/4566f/o8DWh-yGR5U.jpg'/>
				<div>{this.props.name}</div>
			</li>
			</Link>
		)
	}
}

export default UserItem