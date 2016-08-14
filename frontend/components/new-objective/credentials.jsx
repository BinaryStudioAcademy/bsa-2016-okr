import React from 'react';
import './credentials.scss';

class NewObjCredentials extends React.Component{
   render(){
      return(
         <div id="new-obj-creds">
            <div className="title-group">
               <label htmlFor="new-obj-title">New objective title</label>
               <input type="text" placeholder="Title" id="new-obj-title"/>
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