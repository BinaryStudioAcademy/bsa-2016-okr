import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import sweetalert from 'sweetalert';

import { isEmpty } from '../../../../../backend/utils/ValidateService';

import KeyResults from './Key-results-list.jsx';

import '../../../common/styles/sweetalert.css';

class ObjectiveData extends Component {
	constructor(props) {
		super(props);

		this.deleteObjective = this.deleteObjective.bind(this);
		this.editObjective = this.editObjective.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.selectEditTitle = this.selectEditTitle.bind(this);
		this.focusEditTitle = this.focusEditTitle.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
	}

	componentDidUpdate() {
		if (this.props.objectivesList.editing && this.props.objectivesList.active == this.props.index) {
			this.selectEditTitle();
		}
	}

	selectEditTitle() {
		let inputEl = this.refs.objectiveTitle;
		ReactDOM.findDOMNode(inputEl).setSelectionRange(0, inputEl.value.length);
	}

	focusEditTitle() {
		let editEl = this.refs.objectiveTitle;
		ReactDOM.findDOMNode(editEl).focus();
	}

	cancelEdit() {
		this.props.cancelEdit();
	}

	saveChanges(e) {
		e.preventDefault();

		let id = this.props.objective._id;
		let title = this.refs.objectiveTitle.value.trim();
		let description = this.refs.objectiveDescription.value.trim();
		let category = this.refs.selectCategory.value.trim();

		let isTitleChanged = title !== this.props.objective.title;
		let isDescriptionChanged = description !== this.props.objective.description;
		let isCategoryChanged = category !== this.props.objective.category;

		let isNotChanged = (!isTitleChanged	&& !isDescriptionChanged && !isCategoryChanged );

		if(isEmpty(title)) {
			sweetalert({
  			title: 'Error!',
  			text: 'Objective title cannot be empty',
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
				let data = {};

				if(isTitleChanged) {
					data.title = title;
				}

				if(isDescriptionChanged) {
					data.description = description;
				}
				
				if(isCategoryChanged) {
					data.category = category;
				}

				this.props.saveChanges(id, data);
			});
		}
	}

	editObjective(e) {
		e.preventDefault();
		this.props.activeObjective(this.props.index);
	}

	deleteObjective() {
		this.props.cancelEdit();
		
		sweetalert({
			title: "Do you really want to delete objective?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, () => {
			let i = this.props.objective._id;
			this.props.deleteObjective(i, true);
		});
	}

	render() {
		let categoryId = this.props.objective.category;
		let category = this.props.categories.list.find((category) => {
			return category._id === categoryId;
		});

		let titleEl;
		let descriptionEl;
		let categoryEl;
		let editSave;
		let cancel;

		if (this.props.objectivesList.editing && this.props.objectivesList.active == this.props.index) {
			titleEl       =   (<input type='text'
																className='template-title'
																defaultValue={ this.props.objective.title }
																ref='objectiveTitle'
												/>);
			descriptionEl = (<textarea className='template-description'
																 defaultValue={this.props.objective.description}
																 ref='objectiveDescription'
											/>);
			categoryEl    = (<select className='template-category' 
															 ref='selectCategory'  
															 defaultValue={categoryId}>
															 { this.props.categories.list.map((category, index) => {
																 return <option key={index} value={category._id}>{category.title}</option>
															 })}
											</select>);
			editSave      =  ( <button onClick={this.saveChanges}
																 className='btn btn-green editing'
																 aria-hidden="true"
																 title='Save'>
																 <i className='fi-1 flaticon-1-check'></i>
												</button> );
			cancel        =  (  <button onClick={ this.cancelEdit }
																	className="btn btn-red cancel"
																	title='Cancel'
																	aria-hidden="true">
																	<i className="fi flaticon-multiply"></i>
												</button> );
		} else {
			titleEl       = (<div className='name'>{ this.props.objective.title }</div>);
			descriptionEl = (<div className='description'>{ this.props.objective.description }</div>);
			categoryEl    = (<div className='category'>{ category.title }</div>);
			editSave      =  ( <button onClick= { this.editObjective }
																 className='btn btn-blue-hover edit'
																 aria-hidden="true"
																 title='Edit'>
																 <i className='fi flaticon-edit'></i>
												</button> );   
			cancel        =  ( <button title="Delete"
																 type="button"
																 className="btn btn-red-hover delete"
																 onClick={this.deleteObjective} >
																 <i className="fi flaticon-garbage-2"></i>
											 </button> )
		}

		return (
			<div>
				<div className='objective-template'>
							<form onSubmit={ this.editObjective }>
							<div className='edit-objective'>
										{ editSave }
										{ cancel }
							</div>
							{ categoryEl }
							{ titleEl }
							{ descriptionEl }
						</form>
				</div>
				<div className='key-result'>
					<KeyResults objective = { this.props.objective }
											cancelEdit = { this.props.cancelEdit }
											data = { this.props.objective.keyResults }
											cancelEdit = { this.props.cancelEdit }/>
				</div>
			</div>
		)
	}
}

export default ObjectiveData
