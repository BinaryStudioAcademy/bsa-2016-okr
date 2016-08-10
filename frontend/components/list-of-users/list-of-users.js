import React, { Component } from 'react'
import UserItem from './user-item.js';
import './list-of-users.scss';
import users from '../mockData/users.js';

class ListOfUsers extends Component {
   handleTakeUser(id) {
      this.props.takeUser(id)
   }
   handleChange(e) {
      var value = e.target.value;
      this.props.search(value);
   }

   render() {
      var userNodes = this.props.users.map(function (user) {
         if(user.name.toLowerCase().indexOf(this.props.searchValue.toLowerCase()) === -1)
            return;
         else
            return (
               <UserItem takeUser={this.handleTakeUser.bind(this)} key={user.id} id={user.id} name={user.name} />
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
ListOfUsers.defaultProps = {
   users: users
}

export default ListOfUsers