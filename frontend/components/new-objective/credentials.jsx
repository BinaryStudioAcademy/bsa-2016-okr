import React from 'react';
import './credentials.scss';
import NewKeyResult from './key-result.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/okrManagingActions.js";

const title = document.getElementsByClassName('new-key-result-title');
const difficulty = document.getElementsByClassName('new-key-result-difficulty');

class NewObjCredentials extends React.Component{
   constructor(props){
      super(props)

      this.createTemplate = this.createTemplate.bind(this);
      this.addNewKeyResult = this.addNewKeyResult.bind(this);
      this.delete = this.delete.bind(this);
   }
   addNewKeyResult(){
    let keyResults = [''];
    let data = {};
    let count = 0;
    
    for(let i=0; i<title.length; i++){
      if(title[i].value != '') {
        data.title = title[i].value;
        data.difficulty = difficulty[i].value;
        keyResults.splice(-1, 0, data);
        data= {}
        count++;
      }
    } 

    if(title.length == count)
      this.props.addKeyResultToTemplate(keyResults)
   }

   delete(index){
    
    let keyResults = [];
    let data = {};
    for(let i=0; i<title.length; i++){
      data.title = title[i].value;
      data.difficulty = difficulty[i].value;
      keyResults.splice(i, 0, data);
      data= {}; 
    }  

    this.props.addKeyResultToTemplate(keyResults)
    if(this.props.okrManaging.keyResults.length != 1)
      this.props.removeKeyResultFromTemplate(index);
   }

   createTemplate(event){
      event.preventDefault();
      
      let reqBody = {};
      let objectiveDesctiption = document.querySelector("textarea#new-obj-desc").value;
      let objectiveTitle = document.querySelector("input#new-obj-title").value;
      let objectiveCategory = document.querySelector("select#new-obj-category").value;
      let keyResults = [];
      let data = {};
      for(let i=0; i<title.length; i++){
        data.title = title[i].value;
        data.difficulty = difficulty[i].value;
        keyResults.splice(i, 0, data);
        data= {}; 
      }  
      reqBody.description = objectiveDesctiption;
      reqBody.title = objectiveTitle;
      reqBody.category = objectiveCategory;
      reqBody.keyResults = keyResults;

      this.props.createNewTemplate(reqBody);

      document.querySelector("textarea#new-obj-desc").value = '';
      document.querySelector("input#new-obj-title").value = '';

      for(let i=0; i<title.length; i++){
        document.getElementsByClassName('new-key-result-title')[i].value = '';
        document.getElementsByClassName('new-key-result-difficulty')[i].value = 'easy';
      }

      keyResults = [''];
      this.props.addKeyResultToTemplate(keyResults)

      this.props.handleCloseNewObjView();     
    }

   render(){
    let keyResults;
    if(this.props.okrManaging.keyResults.length != 0)
    keyResults = this.props.okrManaging.keyResults.map((keyResult, index) => {
        return <NewKeyResult keyResult={this.props.okrManaging.keyResults} delete={this.delete} key={index} num={index}/>
      });
    else keyResults = (<NewKeyResult delete={this.delete}/>);

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
            <label htmlFor="new-key-result-title">Key result</label>
            {keyResults}
            <p className="new-key-result" onClick={this.addNewKeyResult}>Add new key results</p>
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