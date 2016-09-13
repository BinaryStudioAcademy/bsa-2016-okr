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
				let data = {
					title: title,
					category: category
				};

				if(isDescriptionChanged) {
					data.description = description;
				}

				this.props.saveEditObjective(id, data, this.focusEditTitle);
			});
		}
	}

	editObjective(e) {
		e.preventDefault();
		this.props.activeObjective(this.props.index);
	}

	deleteObjective() {
		this.props.cancelEdit();
		let title = this.props.objective.title;
		let displayedTitle = title.length > 20 ? `${title.substr(0, 20)}...` : title;

		sweetalert({
			title: `Delete objective '${displayedTitle}' ?`,
			text: 'Objective will disappear from autocomplete' ,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#f44336',
			confirmButtonText: 'Yes, delete',
			closeOnConfirm: true
		}, () => {
			let i = this.props.objective._id;
			this.props.deleteObjective(i, true);
		});
	}

	render() {
		const { 
			objective, 
			categories, 
			objectivesList,
			index,
		} = this.props;

		let categoryId = objective.category;
		let category = categories.list.find((category) => {
			return category._id === categoryId;
		});

		let titleEl;
		let descriptionEl;
		let categoryEl;
		let editSave;
		let cancel;

		if (objectivesList.editing && objectivesList.active == index) {
			let objectiveTitle = objective.title;
			objectiveTitle = !isEmpty(objectiveTitle) ? objectiveTitle : 'No description yet...';
			
			titleEl       =   (<input type='text'
																className='template-title'
																defaultValue={ objective.title }
																ref='objectiveTitle'
												/>);
			descriptionEl = (<textarea className='template-description'
																 defaultValue={objective.description}
																 ref='objectiveDescription'
											/>);
			categoryEl    = (<select className='template-category' 
															 ref='selectCategory'  
															 defaultValue={categoryId}>
															 { categories.list.map((category, index) => {
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
			titleEl       = (<div className='name'>{ objective.title }</div>);
			descriptionEl = (<div className='description'>{ objective.description }</div>);
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
					<KeyResults objective = { objective }
											cancelEdit = { this.cancelEdit }
											data = { objective.keyResults } />
				</div>
			</div>
		)
	}
}

export default ObjectiveData
