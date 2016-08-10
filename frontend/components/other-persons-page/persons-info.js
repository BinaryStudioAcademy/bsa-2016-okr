import React, { Component } from 'react'
import Quarter from './persons-quarter.js';
import './persons-info.scss'

class PersonsInfo extends Component {
   render() {
      var user = this.props.data.map(function(user) {
         if (user.id == this.props.id)
            return user.name;
      }.bind(this));

      return (
         <div id='topPanel'>
            <div className='userInfo'>
               <div className='logo'>
                  <img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
               </div>
               <div className='credentials'>{user}</div>
            </div>
            
         </div>
      )
   }
}

export default PersonsInfo