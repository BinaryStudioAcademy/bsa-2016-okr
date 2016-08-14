import React, { Component } from 'react'

class Quarter extends Component {
   constructor() {
      super();

      this.handleTabClick = this.handleTabClick.bind(this);
      this.handleAddNewObjClick = this.handleAddNewObjClick.bind(this);
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

    handleAddNewObjClick(event){
        add_new_obj_handler.call(this, event);

    }

   render() {
      return (
         <div id='top-bar'>
             <div id="manage-bar">
                 <button type="button" id="add-new-objective" onClick={this.handleAddNewObjClick}>
                     <i className="fa fa-plus" aria-hidden="true"></i>
                     New objective
                 </button>
             </div>
             <div id="quarter-bar">
                 <ul id='quarter-list' >
                     <li className="tab active" onClick={this.handleTabClick}>1-st quarter</li>
                     <li className="tab" onClick={this.handleTabClick}>2-nd quarter</li>
                     <li className="tab" onClick={this.handleTabClick}>3-rd quarter</li>
                     <li className="tab" onClick={this.handleTabClick}>4-th quarter</li>
                     <li>
                         <select className='business-year'>
                             <option>2016</option>
                             <option>2017</option>
                         </select>
                     </li>
                 </ul>
             </div>
         </div>
      )
   }
}

export default Quarter

function add_new_obj_handler(event) {
    var target = event.target,
        newObjWindow = document.getElementById('new-objective');

    if(!newObjWindow.classList.contains('opened')){
        newObjWindow.classList.add('opened');
    } else { newObjWindow.classList.remove('opened') }
}