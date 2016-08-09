import React, { Component } from 'react'
import Quarter from './persons-quarter.js';
import './persons-info.scss'

class PersonsInfo extends Component {
   render() {
      var data = this.props.data.map(function(data) {
         if (data.id == this.props.id)
            return data.name;
      }.bind(this));

      return (
         <div id='topPanel'>
            <div id='searchPanel'>
               <div className='userInfo'>
                  <div className='logo'>
                     <img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
                  </div>
                  <div className='credentials'>{data}</div>
               </div>
            </div>
            <Quarter />
         </div>
      )
   }
}

export default PersonsInfo