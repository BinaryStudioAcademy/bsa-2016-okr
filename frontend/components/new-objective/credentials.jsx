import React from 'react';
import './credentials.scss';
import NewKeyResult from './key-result.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/okrManagingActions.js";

class NewObjCredentials extends React.Component{
   constructor(props){
      super(props)

      this.createTemplate = this.createTemplate.bind(this);
   //   this.addNewKeyResult = this.addNewKeyResult.bind(this);
   }
/*   addNewKeyResult(){
      
   }*/

   createTemplate(event){
      event.preventDefault();
      
      let reqBody = {};
      let objectiveDesctiption = document.querySelector("textarea#new-obj-desc").value;
      let objectiveTitle = document.querySelector("input#new-obj-title").value;
      let objectiveCategory = document.querySelector("select#new-obj-category").value;

      reqBody.description = objectiveDesctiption;
      reqBody.title = objectiveTitle;
      reqBody.category = objectiveCategory;
      reqBody.keyResult = [];

      this.props.createNewTemplate(reqBody);
      
      document.querySelector("textarea#new-obj-desc").value = '';
      document.querySelector("input#new-obj-title").value = '';
      this.props.handleCloseNewObjView();     
    }

   render(){
      return(
         <div id="new-obj-creds">
            <div className="title-group">
               <label htmlFor="new-obj-title">New objective title</label>
               <input type="text" placeholder="Title" id="new-obj-title"/>
               <select className='template-category' id="new-obj-category">
                  { this.props.categories.list.map((category, index) => {
                     return <option key={index} value={category._id}>{category.title}</option>
                  })}
               </select>
            </div>
            <div className="desc-group">
               <label htmlFor="new-obj-desc">Description</label>
               <textarea name="new-obj-desc" id="new-obj-desc" placeholder="Description"></textarea>
            </div>
            {/*<div>
            <label className='new-key-result-title' htmlFor="new-key-result-title">Key result</label>
            <NewKeyResult />
            <p className="new-key-result" onClick={this.addNewKeyResult}>Add new key results</p>
            </div>*/}
            <button type="button" id="new-obj-submit-btn" onClick={this.createTemplate}>Add new objective</button>
         </div>
      )
   }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    okrManaging: state.okrManaging,
    categories: state.categories
  };
}

const NewObjCredentialsConnected = connect(mapStateToProps, mapDispatchToProps)(NewObjCredentials);
export default NewObjCredentialsConnected