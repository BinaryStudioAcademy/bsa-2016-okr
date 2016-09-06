import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sweetalert from 'sweetalert';
import '../../../common/styles/sweetalert.css';

import * as actions from "../../../../actions/okrManagingActions.js";
var CONST = require('../../../../../backend/config/constants');

class KeyResult extends Component {
	constructor(props) {
		super(props);

	this.deleteKeyResult = this.deleteKeyResult.bind(this);
	this.editKeyResult = this.editKeyResult.bind(this);
	this.cancelEdit = this.cancelEdit.bind(this);
	this.setDefaultKeyResult = this.setDefaultKeyResult.bind(this);
	}

	setDefaultKeyResult() {
		this.props.cancelEdit();
		this.props.onDeleteKeyResultClick();

		this.props.setDefaultKeyResult(this.props.objectiveId, this.props.item._id, this.refs.defaultKeyResult.checked);
	}

	cancelEdit(){
    this.props.cancelEdit();
  }

	editKeyResult(e){
		this.props.onDeleteKeyResultClick();

		if(this.props.objectivesList.editingKeyResult && this.props.item._id == this.props.objectivesList.activeKeyResult){
			event.preventDefault();

			let handler = function() {
				let reqBody = {};
				let keyResultDifficulty = this.refs.keyResultDifficulty.value;
				let keyResultTitle = this.refs.keyResultTitle.value;

		 		reqBody.difficulty = keyResultDifficulty;
				reqBody.title = keyResultTitle;

				this.props.editKeyResult(this.props.item._id, reqBody);
			}.bind(this);

			sweetalert({
				title: "Do you really want to save changes?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#4caf50",
				confirmButtonText: "OK",
				closeOnConfirm: true
			}, function(){handler();});

		}

		else {
			this.props.activeKeyResult(this.props.item._id, true);
		}
	}

	deleteKeyResult(){
		this.props.onDeleteKeyResultClick();

		let handler = function() {
			let i = this.props.item._id;
			this.props.deleteKeyResult(i, true)
		}.bind(this);

		sweetalert({
			title: "Do you really want to delete key result?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, function(){handler();});
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
      editSaveIcon = 'fi-1 flaticon-1-check';
      edit = 'editing';
      editSaveTitle = 'Save';
      cancel = (<i className="fi flaticon-multiply cancel" onClick={this.cancelEdit} aria-hidden="true"></i>);
    } else {
      titleEl = (<div className='name'>{this.props.item.title}</div>);
      difficultyEl = (<div className='difficulty'>{this.props.item.difficulty}</div>);
      editSaveIcon = 'fi flaticon-edit';
      editSaveTitle = 'Edit'
      edit = 'edit';
      cancel = (<i className="fi flaticon-garbage-2 delete" aria-hidden="true" title='Delete' onClick={this.deleteKeyResult}></i>)
    }
			return (
				<li className="key-result-item" >
					{titleEl}
					<div className='edit-key-result '>
						<i className={`${editSaveIcon} ${edit}`} aria-hidden="true" title={ editSaveTitle } onClick={this.editKeyResult}></i>
						{cancel}
					</div>
					{difficultyEl}
					<div className={ `defaultKeyResultCheckbox ${edit}` }>
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
