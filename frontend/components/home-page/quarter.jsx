import React, { Component } from 'react'
import './quarter-bar.scss';

class Quarter extends Component {
   constructor() {
      super();

      this.handleTabClick = this.handleTabClick.bind(this);
   }

   handleTabClick(e) {
      var li = document.getElementsByClassName('tab');

      for (var i=0; i<4; i++) {
         li[i].classList.remove('active');
         if ( li[i] == e.target)
            var currentTab = i;
      }

      e.target.classList.add('active');
      this.props.changeTab(++currentTab);
   }

   render() {
      return (
         <div id="quarter-bar">
            <select name="" id="business-year">
               <option value="">2016</option>
               <option value="">2017</option>
            </select>
            <ul>
               <li className="tab exist selected" onClick={this.handleTabClick}>1-st quarter</li>
               <li className="tab" onClick={this.handleTabClick}><a href="">+ Q2</a></li>
               <li className="tab" onClick={this.handleTabClick}><a href="">+ Q3</a></li>
               <li className="tab" onClick={this.handleTabClick}><a href="">+ Q4</a></li>
            </ul>
         </div>
      )
   }
}

export default Quarter
