import React from 'react';
import KeyResults from './key-result-list.jsx';
import NewObjCredentials from './credentials.jsx';
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
               <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <form action="">
               <section>
                  <NewObjCredentials />
               </section>

               <section>
                  <KeyResults />
               </section>
               <button type="button" id="new-obj-submit-btn">Add new objective</button>
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