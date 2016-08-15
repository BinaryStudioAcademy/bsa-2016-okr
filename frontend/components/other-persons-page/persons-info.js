import React, { Component } from 'react'
import Quarter from './persons-quarter.js'

class PersonsInfo extends Component {
   render() {
      var user = this.props.data.userName;

      return (
         <div id='topPanel'>
            <div className='userInfo'>
               <div className='logo'>
                  <img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
               </div>
               <div className='credentials'>{user}
                  <p className='lastVisite'>Last visit: {this.props.data.lastVisitDate}</p>
                  <div><span className='fi flaticon-user-6 mentor'></span>
                  <span className='mentorName'>{this.props.data.mentor}</span></div>
               </div>
            </div>      
         </div>
      )
   }
}

export default PersonsInfo