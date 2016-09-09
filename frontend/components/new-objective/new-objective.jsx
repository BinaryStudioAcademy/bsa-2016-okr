import React, { Component } from 'react';
import NewObjCredentials from './credentials.jsx';
import NewKeyResult from './key-result.jsx';
import './new-objective.scss';

class NewObjective extends Component {
   constructor(props) {
      super(props);

      this.handleCloseNewObjView = this.handleCloseNewObjView.bind(this);
   }

   handleCloseNewObjView() {
      document.querySelector("textarea#new-obj-desc").value = '';
      document.querySelector("input#new-obj-title").value = '';
      const title = document.getElementsByClassName('new-key-result-title');
      const difficulty = document.getElementsByClassName('new-key-result-difficulty');
      for(let i = 0; i < title.length; i++) {
         document.getElementsByClassName('new-key-result-title')[i].value = '';
         document.getElementsByClassName('new-key-result-difficulty')[i].value = 'easy';
      }

      closeWindowHandler.call(this);
   }

   render() {
      return (
         <div id="new-objective">
            <button type="button" id="close-new-obj-window" onClick={ this.handleCloseNewObjView }>
               <i className="fi flaticon-multiply" aria-hidden="true"></i>
            </button>
            <form action="">
               <NewObjCredentials handleCloseNewObjView={this.handleCloseNewObjView} />
            </form>
         </div>
      )
   }
}

export default NewObjective;

function closeWindowHandler() {
   var newObjWindow = document.getElementById('new-objective');

   if(!newObjWindow.classList.contains('opened')) {
      newObjWindow.classList.add('opened');
   } else { 
      newObjWindow.classList.remove('opened'); 
   }
}