import React, { Component } from 'react'

class UserItem extends Component {
	handleUser() {
		this.props.takeUser(this.props.id);
	}
	render() {
		return (
			<li className='userItem' onClick={this.handleUser.bind(this)}>
				<img src='https://pp.vk.me/c633829/v633829341/4566f/o8DWh-yGR5U.jpg'/>
				<div>{this.props.name}</div>
			</li>
		)
	}
}

export default UserItem