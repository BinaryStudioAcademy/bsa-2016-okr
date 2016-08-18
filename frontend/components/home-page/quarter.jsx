import React, { Component } from 'react'

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
         <div id='top-bar'>
             <div id="manage-bar">
             </div>
             <div id="quarter-bar">
                 <ul id='quarter-list' >
                     <li>
                         <select className='business-year'>
                             <option>2016</option>
                             <option>2017</option>
                         </select>
                     </li>
                     <li className="tab active" onClick={this.handleTabClick}>1-st quarter</li>
                     <li className="tab" onClick={this.handleTabClick}>2-nd quarter</li>
                     <li className="tab" onClick={this.handleTabClick}>3-rd quarter</li>
                     <li className="tab" onClick={this.handleTabClick}>4-th quarter</li>
                 </ul>
             </div>
         </div>
      )
   }
}

export default Quarter
