import React from 'react';
import KeyResults from './Key-results-list.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";

class ObjectiveData extends React.Component{
  constructor(props){
    super(props);

    this.deleteObjective = this.deleteObjective.bind(this);
    this.editObjective = this.editObjective.bind(this);
  }
  editObjective(e){
    if(this.props.objectivesList.editing){
      event.preventDefault();
      let reqBody = {};
      let objectiveDesctiption = document.querySelector("textarea.template-description").value;
      let objectiveTitle = document.querySelector("input.template-title").value;

      reqBody.description = objectiveDesctiption;
      reqBody.title = objectiveTitle;

      this.props.editObjectiveTemplate(this.props.objectivesList.visibleObjectives[this.props.objectivesList.active]._id, reqBody);

    }
    else this.props.editObjective(true);
  }
  deleteObjective(){
    var result = confirm('Do you really want to delete objective?');
    if (result){
      let i = this.props.objective._id;
      this.props.deleteObjective(i, true);
   }
  }

  activeObjective(){
  	this.props.activeObjective(this.props.index)
  }
  render(){
    console.log(this.props.objectivesList.editing)
    if (this.props.objectivesList.editing && this.props.objectivesList.active == this.props.index){
		return (
      <div>
        <div className='objective-template' onClick={this.activeObjective.bind(this)}>
              <form onSubmit={this.editObjective}>
              <div className='edit-objective'>
                    <i className="fi flaticon-edit editing" aria-hidden="true" onClick={this.editObjective}></i>
                    <i className="fi flaticon-garbage-2 delete" aria-hidden="true" onClick={this.deleteObjective}></i>
              </div>
              <div className='category'>{this.props.objective.category.title}</div>
              <input type='text' className='template-title' defaultValue={this.props.objective.title} />
              <textarea className='template-description' defaultValue={this.props.objective.description} />  
            </form>     
        </div>
        <div className='key-result'><KeyResults data={this.props.objective.keyResults} /></div>
      </div>
    	)
    }
    else {
      return (
      <div>
        <div className='objective-template' onClick={this.activeObjective.bind(this)}>
            <div className='edit-objective'>
                  <i className="fi flaticon-edit edit" aria-hidden="true" onClick={this.editObjective}></i>
                  <i className="fi flaticon-garbage-2 delete" aria-hidden="true" onClick={this.deleteObjective}></i>
            </div>
            <div className='category'>{this.props.objective.category.title}</div>
            <div className='name'>{this.props.objective.title}</div>
            <div className='description'>{this.props.objective.description}</div>       
        </div>
        <div className='key-result'><KeyResults data={this.props.objective.keyResults} /></div>
      </div>
      )
    }
  }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    objectivesList: state.okrManaging
  };
}

const ObjectiveDataConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveData);
export default ObjectiveDataConnected