import React, { Component } from 'react'

class UserItem extends Component {
	handleUser() {
		this.props.takeUser(this.props.id);
		ShowUsersList();
	}
	render() {
		return (
			<a href="/users">
			<li className='userItem' onClick={this.handleUser.bind(this)}>
				<img src='https://pp.vk.me/c633829/v633829341/4566f/o8DWh-yGR5U.jpg'/>
				<div>{this.props.name}</div>
			</li>
			</a>
		)
	}
}

export default UserItem

function ShowUsersList(){
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