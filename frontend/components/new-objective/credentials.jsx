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
      this.addNewKeyResult = this.addNewKeyResult.bind(this);
      this.delete = this.delete.bind(this);
   }
   addNewKeyResult(){
    let newField = (<NewKeyResult delete={this.delete}/>);
    let title = document.getElementsByClassName('new-key-result-title');
    let count = 0;
    for (var i=0; i < title.length; i++) {
      if (title[i].value != '') {
        count++;
      }}
      if (count == title.length){
      let keyResult = this.props.okrManaging.keyResults.concat(newField)
      this.props.addKeyResultToTemplate(keyResult);
      }     
   }

   delete(index){
    console.log('num parent '+ index)
    if(this.props.okrManaging.keyResults.length != 1)
    this.props.removeKeyResultFromTemplate(index);
   }

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
    console.log(this.props.okrManaging.keyResults)
    let keyResults;
    if(this.props.okrManaging.keyResults.length != 0)
    keyResults = this.props.okrManaging.keyResults.map((keyResult, index) => {
        return <NewKeyResult delete={this.delete} key={index} num={index}/>
      });

      return(
         <div id="new-obj-creds">
            <div className="title-group">
               <label htmlFor="new-obj-title">New objective title</label>
               <input type="text" placeholder="Title" id="new-obj-title"/>
               <select className='template-category' id="new-obj-category">
                  {this.props.categories.list.map((category, index) => {
                     return <option key={index} value={category._id}>{category.title}</option>
                  })}
               </select>
            </div>
            <div className="desc-group">
               <label htmlFor="new-obj-desc">Description</label>
               <textarea name="new-obj-desc" id="new-obj-desc" placeholder="Description"></textarea>
            </div>
            <div>
            {/*<label htmlFor="new-key-result-title">Key result</label>
            {keyResults}
            <p className="new-key-result" onClick={this.addNewKeyResult}>Add new key results</p>*/}
            </div>
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