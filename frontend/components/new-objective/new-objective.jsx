import React from 'react';
import NewObjCredentials from './credentials.jsx';
import NewKeyResult from './key-result.jsx';
import './new-objective.scss';

class NewObjective extends React.Component{
   constructor(props){
      super(props);

      this.handleCloseNewObjView = this.handleCloseNewObjView.bind(this);
   }

   handleCloseNewObjView(){
      close_window_handler.call(this);
   }

   render(){
      return(
         <div id="new-objective">
            <button type="button" id="close-new-obj-window" onClick={this.handleCloseNewObjView}>
               <i className="fi flaticon-multiply" aria-hidden="true"></i>
            </button>
            <form action="">
               <NewObjCredentials />
            </form>
         </div>
      )
   }
}

export default NewObjective;

function close_window_handler() {
   var newObjWindow = document.getElementById('new-objective');

   if(!newObjWindow.classList.contains('opened')){
      newObjWindow.classList.add('opened');
   } else { newObjWindow.classList.remove('opened'); }
}