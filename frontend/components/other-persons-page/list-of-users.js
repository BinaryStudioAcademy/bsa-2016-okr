import React, { Component } from 'react'
import UserItem from './user-item.js';
import './list-of-users.scss';

class ListOfUsers extends Component {
	handleTakeUser(id) {
		this.props.takeUser(id)
	}
	handleChange(e) {
		var value = e.target.value;
    	this.props.search(value);
    }

	render() {
		var userNodes = this.props.data.map(function (data) {
			if(data.name.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) === -1)
				return;
			else 
				return ( 
					<UserItem takeUser={this.handleTakeUser.bind(this)} key={data.id} id={data.id} name={data.name} />
				);
		}.bind(this));

		return (
			<div id='usersList' className='undisplay'>
				<input type='text' onChange={this.handleChange.bind(this)} name='search' placeholder='Enter name'/>
				<ul className='listOfUsers'>{userNodes}</ul>
			</div>
		)
	}
}

export default ListOfUsers