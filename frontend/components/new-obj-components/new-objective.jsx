import React from 'react';
import './new-objective.scss';

class NewObjective extends React.Component{
   render(){
      return(
         <div id="new-objective">
            <form action="">
               <section id="new-obj-creds">
                  <div className="clearfix">
                     <div className="title-group">
                        <label htmlFor="new-obj-title">New objective title</label>
                        <input type="text" placeholder="Title" id="new-obj-title"/>
                     </div>
                     <div className="category-group">
                        <label for="">Category</label>
                        <select name="new-obj-category" id="new-obj-category">
                           <option value="project">Project</option>
                           <option value="expertise">Expertise</option>
                           <option value="knowledge">Knowledge</option>
                        </select>
                     </div>
                  </div>
                  <div className="desc-group">
                     <label for="new-obj-desc">Description</label>
                     <textarea name="new-obj-desc" id="new-obj-desc" placeholder="Description"></textarea>
                  </div>
               </section>
               <section id="new-obj-keyresults">
                  <p>Key results</p>
                  <div className="keyresult-group clearfix">
                     <input type="text" placeholder="Key Result name" id="keyresult-name-1"/>
                     <input type="range" min="0" max="1" step="0.1" id="keyresult-score-1"/>
                  </div>
                  <a id="add-new-keyresult-btn">+ Add new key result</a>
               </section>
               <section id="new-obj-submit">
                  <button type="button" id="new-obj-submit-btn">Add new objective</button>
                  or clone
                  <input type="text" placeholder="Objective to clone" id="obj-to-clone"/>
               </section>
            </form>
         </div>
      )
   }
}

export default NewObjective;