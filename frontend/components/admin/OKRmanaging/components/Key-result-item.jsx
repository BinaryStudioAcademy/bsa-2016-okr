import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import sweetalert from 'sweetalert';

import CONST from '../../../../../backend/config/constants';
import { isEmpty } from '../../../../../backend/utils/ValidateService';

import '../../../common/styles/sweetalert.css';

class KeyResult extends Component {
	constructor(props) {
		super(props);

		this.deleteKeyResult = this.deleteKeyResult.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
		this.editKeyResult = this.editKeyResult.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.setDefaultKeyResult = this.setDefaultKeyResult.bind(this);
		this.focusEditTitle = this.focusEditTitle.bind(this);
		this.selectEditTitle = this.selectEditTitle.bind(this);
	}

	componentDidUpdate() {
		if (this.props.editingKeyResult && this.props.item._id == this.props.activeKeyResult) {
			this.selectEditTitle();
		}
	}

	selectEditTitle() {
		let inputEl = this.refs.keyResultTitle;
		ReactDOM.findDOMNode(inputEl).setSelectionRange(0, inputEl.value.length);
	}

	focusEditTitle() {
		let editEl = this.refs.keyResultTitle;
		ReactDOM.findDOMNode(editEl).focus();
	}

	setDefaultKeyResult() {
		this.props.cancelEdit();
		this.props.hideAddKeyResultInput();
		
		let id = this.props.item._id;
		let value = this.refs.defaultKeyResult.checked;

		this.props.setDefaultKeyResult(id, value);
	}

	cancelEdit() {
    this.props.cancelEdit();
  }

	saveChanges(e) {
		e.preventDefault();
		this.props.hideAddKeyResultInput();
		
		let id = this.props.item._id;
		let title = this.refs.keyResultTitle.value.trim();
		let difficulty = this.refs.keyResultDifficulty.value;
		let isNotChanged = (title === this.props.item.title && difficulty === this.props.item.difficulty);

		if(isEmpty(title)) {
			sweetalert({
  			title: 'Error!',
  			text: 'Key result title cannot be empty',
  			type: 'error',
  		}, () => {	
  			setTimeout(this.focusEditTitle, 0);
  		});
		} else if(isNotChanged) {
			this.cancelEdit();
		} else {
			sweetalert({
				title: 'Save all changes?',
				text: 'This fill affect on all users',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#4caf50',
				confirmButtonText: 'Yes, save',
				closeOnConfirm: false
			}, () => {
				this.props.saveChanges(id, title, difficulty);
			});
		}
	}

	editKeyResult(e) {
		e.preventDefault();
		this.props.hideAddKeyResultInput();
		let id = this.props.item._id;
		this.props.setActiveKeyResult(id, true);
	}

	deleteKeyResult() {
		this.props.hideAddKeyResultInput();
		let title = this.props.item.title;
		let displayedTitle = title.length > 20 ? `${title.substr(0, 20)}...` : title;

		sweetalert({
			title: `Delete key result '${displayedTitle}' ?`,
			text: 'Key result will disappear from autocomplete' ,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#f44336',
			confirmButtonText: 'Yes, delete',
			closeOnConfirm: true
		}, () => {
			let i = this.props.item._id;
			this.props.deleteKeyResult(i, true)
		});
	}

	render() {
    let titleEl;
    let difficultyEl;
    let edit;
    let editSave;
    let cancel;
    let isKeyResultDefault;

    if(this.props.objective.defaultKeyResults.includes(this.props.item._id)) {
    	isKeyResultDefault = true;
    } else {
    	isKeyResultDefault = false;
    }

    if (this.props.editingKeyResult && this.props.item._id == this.props.activeKeyResult) {
      titleEl 			=  (<input type='text' className='keyResult-title' ref="keyResultTitle" defaultValue={this.props.item.title}/>);
      difficultyEl  =  (<select className='keyResult-difficulty' ref="keyResultDifficulty" defaultValue={this.props.item.difficulty}>
											 	<option value={CONST.keyResult.EASY}>{CONST.keyResult.EASY}</option>
											 	<option value={CONST.keyResult.INTERMEDIATE}>{CONST.keyResult.INTERMEDIATE}</option>
											 	<option value={CONST.keyResult.ADVANCED}>{CONST.keyResult.ADVANCED}</option>
											 </select>) ;
      editSave 		  =  ( <button onClick={ this.saveChanges }
																 className='btn btn-green'
																 aria-hidden="true"
																 title='Save'>
																 <i className='fi-1 flaticon-1-check'></i>
												</button> );
      cancel 				=  (  <button onClick={ this.cancelEdit }
																	className="btn btn-red cancel"
																	title='Cancel'
																	aria-hidden="true">
																	<i className="fi flaticon-multiply"></i>
												</button> );
    } else {
      titleEl 			=  (<div className='name'>{this.props.item.title}</div>);
      difficultyEl  =  (<div className='difficulty'>{this.props.item.difficulty}</div>);
      editSave 			=  ( <button onClick={ this.editKeyResult }
																 className='btn btn-blue-hover'
																 aria-hidden="true"
																 title='Edit'>
																 <i className='fi flaticon-edit'></i>
												</button> );
      cancel  			=  ( <button title="Delete"
						                     type="button"
						                     className="btn btn-red-hover delete"
						                     onClick={ this.deleteKeyResult } >
																 <i className="fi flaticon-garbage-2"></i>
											 </button> )
    }
		
		return (
			<li className="key-result-item" >
				{titleEl}
				<div className='edit-key-result'>
					{editSave}
					{cancel}
				</div>
				<div className='defaultKeyResultCheckbox'>
					<input 
						type="checkbox" 
						id={`defaultKeyResult-${this.props.item._id}`}  
						ref='defaultKeyResult' 
						defaultChecked={ isKeyResultDefault } 
						onChange={ this.setDefaultKeyResult }
					></input>
					<label htmlFor={`defaultKeyResult-${this.props.item._id}`} >Default</label>
				</div>
				{difficultyEl}
			</li>
		)
	}
}

export default KeyResult;
