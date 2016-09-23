import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import sweetalert from 'sweetalert';

import { isEmpty } from '../../../../../backend/utils/ValidateService';

import '../../../common/styles/sweetalert.css';

class CategoryItem extends Component {
	constructor(props){
		super(props);

		this.delete = this.delete.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.editCategory = this.editCategory.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
		this.focusEditTitle = this.focusEditTitle.bind(this);
		this.selectEditTitle = this.selectEditTitle.bind(this);
	}

	componentDidUpdate() {
		const { edit, activeCategory, index } = this.props;

		if (edit && activeCategory == index) {
			this.selectEditTitle();
		}
	}

	selectEditTitle() {
		let inputEl = this.refs.categoryInput;
		ReactDOM.findDOMNode(inputEl).setSelectionRange(0, inputEl.value.length);
	}

	focusEditTitle() {
		let editEl = this.refs.categoryInput;
		ReactDOM.findDOMNode(editEl).focus();
	}

	cancelEdit() {
		this.props.cancelEdit();
	}

	delete() {
		this.props.hideAddInput();

		if(this.props.isEmptyCategory) {
			sweetalert({
				title: `Delete category '${this.props.category.title}' ?`,
				text: 'Category should be empty (without objectives)',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#f44336',
				confirmButtonText: 'Yes, delete',
			}, () => {
				this.props.deleteCategory(this.props.category._id, true);
			});
		} else {
			sweetalert({
				title: 'Cannot delete category',
				text: 'This category isn\'t empty.',
				type: 'error'
			});
		}
	}

	editCategory() {
		this.props.hideAddInput();
		this.props.setActiveCategory(this.props.index);
	}

	saveChanges() {
    let title = this.refs.categoryInput.value.toLowerCase();
    let id = this.props.category._id;

		if(isEmpty(title)) {
			sweetalert({
  			title: 'Error!',
  			text: 'Category title cannot be empty',
  			type: 'error',
  		}, () => {
  			setTimeout(this.focusEditTitle, 0);
  		});
		} else if(title === this.props.category.title) {
			this.cancelEdit();
		} else {
			sweetalert({
				title: 'Save category changes?',
				text: 'This fill affect on all users',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#4caf50',
				confirmButtonText: 'Yes, save',
				closeOnConfirm: false,
			}, () => {
		    this.props.saveEditCategory(id, title);
		 	});
		}
	}

	render() {
    const { edit, activeCategory, index, category } = this.props;

		let titleEl;
    let editSaveBtn;
    let cancelDeleteBtn;

    if( edit && activeCategory == index ) {
    	titleEl = ( <input type='text' ref="categoryInput"
    										 className='category-edit-title'
    										 defaultValue={ category.title }
    						/> );
	    editSaveBtn 		= ( <button  onClick={ this.saveChanges }
									 				 className="btn btn-green save"
													 aria-hidden="true"
													 title="Save">
									 				 <i className='fi-1 flaticon-1-check'></i>
									</button> );
	    cancelDeleteBtn  = ( <button onClick={ this.cancelEdit }
													className="btn btn-red cancel"
													title='Cancel'
													aria-hidden="true">
													<i className="fi flaticon-multiply cancel" ></i>
									</button> );
    } else {
    	titleEl = ( <span>{ category.title }</span> );
	    editSaveBtn 		= ( <button aria-hidden="true"
													title="Edit"
												 	className="btn btn-blue-hover edit"
												 	onClick={this.editCategory}>
													<i className='fi flaticon-edit'></i>
									</button>	);
	    cancelDeleteBtn  = ( <button title="Delete"
			                    type="button"
			                    className="btn btn-red-hover delete"
			                    onClick={this.delete}>
													<i className='fi flaticon-garbage-2'></i>
									</button> );
    }

		return (
			<li className='category-item'>
				{ titleEl }
				<div className='edit-category'>
					{ editSaveBtn }
					{ cancelDeleteBtn }
				</div>
			</li>
			)
	}
}

export default CategoryItem;
