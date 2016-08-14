import React from 'react';
import './credentials.scss';

class NewObjCredentials extends React.Component{
   render(){
      return(
         <div id="new-obj-creds">
            <div className="top">
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
               <label htmlFor="new-obj-desc">Description</label>
               <textarea name="new-obj-desc" id="new-obj-desc" placeholder="Description"></textarea>
            </div>
         </div>
      )
   }
}

export default NewObjCredentials;