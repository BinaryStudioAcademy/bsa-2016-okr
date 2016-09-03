import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";
var CONST = require('../../../../../backend/config/constants');

class KeyResult extends Component {
	constructor(props) {
		super(props);

	this.deleteObjective = this.deleteObjective.bind(this);
	this.editKeyResult = this.editKeyResult.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	this.setDefaultKeyResult = this.setDefaultKeyResult.bind(this);
	}

	setDefaultKeyResult() {
		this.props.cancelEdit();
	//	console.log(this.refs.defaultKeyResult.checked, this.props.item)
			this.props.setDefaultKeyResult(this.props.objectiveId, this.props.item._id, this.refs.defaultKeyResult.checked);
	}

	cancelEdit(){
    this.props.cancelEdit();
  }

	editKeyResult(e){
		if(this.props.objectivesList.editingKeyResult && this.props.item._id == this.props.objectivesList.activeKeyResult){
			event.preventDefault();
			let result = confirm('Do you really want to save changes?');
      if (result){
				let reqBody = {};
				let keyResultDifficulty = this.refs.keyResultDifficulty.value;
				let keyResultTitle = this.refs.keyResultTitle.value;

		 		reqBody.difficulty = keyResultDifficulty;
				reqBody.title = keyResultTitle;

				this.props.editKeyResult(this.props.item._id, reqBody);
			}
		}
		else {
			this.props.activeKeyResult(this.props.item._id, true);
		}
	}

	deleteObjective(){
		var result = confirm('Do you really want to delete key result?');
		if (result){
			let i = this.props.item._id;
			this.props.deleteKeyResult(i, true)
		}
	}

	render() {
    let titleEl;
    let difficultyEl;
    let edit;
    let editSaveIcon;
    let editSaveTitle;
    let cancel;
    let isKeyResultDefault;

    let objective = this.props.objectivesList.objectives.find(item => {
    	return item._id == this.props.objectiveId
    });

    if(objective.defaultKeyResults.includes(this.props.item._id)) 
    	isKeyResultDefault = true;
    	else  isKeyResultDefault = false;

    if (this.props.objectivesList.editingKeyResult && this.props.item._id == this.props.objectivesList.activeKeyResult) {
      titleEl = (<input type='text' className='keyResult-title' ref="keyResultTitle" defaultValue={this.props.item.title}/>);
      difficultyEl = (<select className='keyResult-difficulty' ref="keyResultDifficulty" defaultValue={this.props.item.difficulty}>
												<option value={CONST.keyResult.EASY}>{CONST.keyResult.EASY}</option>
												<option value={CONST.keyResult.INTERMEDIATE}>{CONST.keyResult.INTERMEDIATE}</option>
												<option value={CONST.keyResult.ADVANCED}>{CONST.keyResult.ADVANCED}</option>
											</select>);
      editSaveIcon = 'flaticon-success';
      edit = 'editing';
      editSaveTitle = 'Save';
      cancel = (<i className="fi flaticon-multiply cancel" onClick={this.cancelEdit} aria-hidden="true"></i>);
    } else {
      titleEl = (<div className='name'>{this.props.item.title}</div>);
      difficultyEl = (<div className='difficulty'>{this.props.item.difficulty}</div>);
      editSaveIcon = 'flaticon-edit';
      editSaveTitle = 'Edit'
      edit = 'edit';
      cancel = (<i className="fi flaticon-garbage-2 delete" aria-hidden="true" title='Delete' onClick={this.deleteObjective}></i>)
    }
			return (
				<li className="key-result-item" >
					{titleEl}
					<div className='edit-key-result'>
						<i className={`fi ${editSaveIcon} ${edit}`} aria-hidden="true" title={ editSaveTitle } onClick={this.editKeyResult}></i>
						{cancel}
					</div>
					{difficultyEl}
					<div className='defaultKeyResultCheckbox'>
						<input type="checkbox" id={`defaultKeyResult-${this.props.item._id}`}  ref='defaultKeyResult' defaultChecked={isKeyResultDefault} onChange={this.setDefaultKeyResult}></input>
						<label htmlFor={`defaultKeyResult-${this.props.item._id}`} >Default</label>
					</div>
				</li>
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

const KeyResultConnected = connect(mapStateToProps, mapDispatchToProps)(KeyResult);
export default KeyResultConnected
