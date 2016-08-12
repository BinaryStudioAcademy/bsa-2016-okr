import React from 'react';
import KeyResults from './key-result-list.jsx';
import NewObjCredentials from './credentials.jsx';
import './new-objective.scss';

class NewObjective extends React.Component{
   render(){
      return(
         <div id="new-objective">
            <form action="">
               <section id="clone-obj">
                  <label htmlFor="obj-to-clone">Clone existed objective</label>
                  <input type="text" placeholder="Objective" id="obj-to-clone"/>
                  <button id="clone-it">Clone it</button>
               </section>
               <p><span>Or add new one</span></p>
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