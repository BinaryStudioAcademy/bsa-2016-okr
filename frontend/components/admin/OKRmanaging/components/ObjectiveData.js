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
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  cancelEdit(){
    this.props.cancelEdit();
  }

  editObjective(event){
    let index = this.props.objectivesList.active;
    let objective = this.props.objectivesList.visibleObjectives[index];

    if(this.props.objectivesList.editing && this.props.objectivesList.active == this.props.index){
      event.preventDefault();
      let result = confirm('Do you really want to save changes?');
      if (result){
        let reqBody = {};
        let objectiveDesctiption = document.querySelector("textarea.template-description").value;
        let objectiveTitle = document.querySelector("input.template-title").value;
        let objectiveCategory = this.refs.selectCategory.value;

        reqBody.description = objectiveDesctiption;
        reqBody.title = objectiveTitle;
        reqBody.category = objectiveCategory
        
        this.props.editObjectiveTemplate(objective._id, reqBody);
      }
    }
    else {
      this.props.activeObjective(this.props.index);
    }
  }

  deleteObjective(){
    let result = confirm('Do you really want to delete objective?');
    if (result){
      let i = this.props.objective._id;
      this.props.deleteObjective(i, true);
    }
  }

  render() {
    let categoryId = this.props.objective.category;
    let category = this.props.categories.list.find((category) => {
      return category._id === categoryId;
    });
    
    let titleEl;
    let descriptionEl;
    let categoryEl;
    let edit;
    let editSaveIcon;
    let editSaveTitle;
    let cancel;

    if (this.props.objectivesList.editing && this.props.objectivesList.active == this.props.index) {
      titleEl = (<input type='text' className='template-title' defaultValue={this.props.objective.title} />);
      descriptionEl = (<textarea className='template-description' defaultValue={this.props.objective.description} />);
      categoryEl = (<select className='template-category' ref='selectCategory' defaultValue={categoryId}>
                        { this.props.categories.list.map((category, index) => {
                          return <option key={index} value={category._id}>{category.title}</option>
                        })}
                      </select>);
      editSaveIcon = 'flaticon-success';
      editSaveTitle = 'Save';
      edit = 'editing',
      cancel = (<i className="fi flaticon-multiply cancel" onClick={this.cancelEdit} title='Cancel' aria-hidden="true"></i>)
    } else {
      titleEl = (<div className='name'>{this.props.objective.title}</div>);
      descriptionEl = (<div className='description'>{this.props.objective.description}</div>);
      categoryEl = (<div className='category'>{ category.title }</div>);
      editSaveIcon = 'flaticon-edit';
      editSaveTitle = 'Edit';
      edit = 'edit';
      cancel = (<i className='fi flaticon-garbage-2 delete' aria-hidden="true" title='Delete' onClick={this.deleteObjective}></i>);
    }

		return (
      <div>
        <div className='objective-template'>
              <form onSubmit={this.editObjective}>
              <div className='edit-objective'>
                    <i className={`fi ${editSaveIcon} ${edit}`} aria-hidden="true" title={ editSaveTitle } onClick={this.editObjective}></i>
                    {cancel}
              </div>
              { categoryEl }
              { titleEl }
              { descriptionEl }
            </form>     
        </div>
        <div className='key-result'><KeyResults objectiveId={ this.props.objective._id } data={this.props.objective.keyResults} /></div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    objectivesList: state.okrManaging,
    categories: state.categories,
  };
}

const ObjectiveDataConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveData);
export default ObjectiveDataConnected