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
		this.focusEditInput = this.focusEditInput.bind(this);
		this.selectEditText = this.selectEditText.bind(this);
	}

	componentDidUpdate() {
		if (this.props.categories.edit && this.props.categories.activeCategory == this.props.index) {
			this.selectEditText();
		}
	}

	selectEditText() {
		let inputEl = this.refs.categoryInput;
		ReactDOM.findDOMNode(inputEl).setSelectionRange(0, inputEl.value.length);
	}

	focusEditInput() {
		let editEl = this.refs.categoryInput;
		ReactDOM.findDOMNode(editEl).focus();
	}

	cancelEdit(){
		this.props.cancelEdit();
	}

	delete() {
		this.props.hideAddInput();

		let category = this.props.objectives.find(item => {
			return item.category == this.props.category._id
		})

		sweetalert({
			title: `Delete category '${this.props.category.title}' ?`,
			text: 'Category should be empty (without objectives)',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#f44336',
			confirmButtonText: 'Yes, delete',
			closeOnConfirm: false
		}, (isConfirm) => {
				if(isConfirm && category == undefined) {
					this.props.deleteCategory(this.props.category._id, true);
					sweetalert.close();
				} else if(isConfirm && category != undefined){
          sweetalert('Cannot delete category', 'This category isn\'t empty.', 'error');
        }
			});
	}

	editCategory() {
		this.props.hideAddInput();
		this.props.activeCategory(this.props.index);
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
  			setTimeout(this.focusEditInput, 0);
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
		    this.props.editCategory(id, title); 
		 	});
		}
	}

	render() {
		let titleEl;
    let edit;
    let cancel;
    
    if( this.props.categories.edit && 
    		this.props.categories.activeCategory == this.props.index ) {
    	titleEl = ( <input type='text' ref="categoryInput"
    										 className='category-edit-title' 
    										 defaultValue={ this.props.category.title } 
    						/> );
	    edit 		= ( <button  onClick={ this.saveChanges }
									 				 className="btn btn-green save"
													 aria-hidden="true"
													 title="Save">
									 				 <i className='fi-1 flaticon-1-check'></i> 
									</button> );
	    cancel  = ( <button onClick={ this.cancelEdit }
													className="btn btn-red cancel"
													title='Cancel'
													aria-hidden="true">
													<i className="fi flaticon-multiply cancel" ></i>
									</button> );
    } else {
    	titleEl = ( <span>{ this.props.category.title }</span> );
	    edit 		= ( <button aria-hidden="true"
													title="Edit"
												 	className="btn btn-blue-hover edit"
												 	onClick={this.editCategory}>
													<i className='fi flaticon-edit'></i>
									</button>	);
	    cancel  = ( <button title="Delete"
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
					{ edit }
					{ cancel }
				</div>
			</li>
			)
	}
}

export default CategoryItem;
