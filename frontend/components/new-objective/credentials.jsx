import React from 'react';
import './credentials.scss';

class NewObjCredentials extends React.Component{
   render(){
      return(
         <div id="new-obj-creds">
            <div className="title-group">
               <label htmlFor="new-obj-title">New objective title</label>
               <input type="text" placeholder="Title" id="new-obj-title"/>
               <select name="new-obj-category" id="new-obj-category">
                  <option value="knowledge">Knowledge</option>
                  <option value="expertise">Expertise</option>
                  <option value="projects">Projects</option>
               </select>
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