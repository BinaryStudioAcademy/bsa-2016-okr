import React from 'react';
import KeyResults from './Key-results-list.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";

class ObjectiveData extends React.Component{
  constructor(props){
    super(props);

    this.deleteObjective = this.deleteObjective.bind(this);
  }
  deleteObjective(){
    var result = confirm('Do you really want to delete objective?');
    if (result){
      let i = this.props.objective._id;
      this.props.deleteObjective(i, true)
   }
  }

  activeObjective(){
  	this.props.activeObjective(this.props.index)
  }
  render(){
		return (
      <div>
        <div className='objective-template' onClick={this.activeObjective.bind(this)}>
            <div className='edit-objective'>
                  <i className="fi flaticon-edit" aria-hidden="true" onClick={this.editObjective}></i>
                  <i className="fi flaticon-garbage-2" aria-hidden="true" onClick={this.deleteObjective}></i>
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