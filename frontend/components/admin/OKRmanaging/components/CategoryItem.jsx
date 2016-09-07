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
	}

	cancelEdit(){
		this.props.cancelEdit();
	}

	delete() {
		this.props.onDeleteNewCategory();

		let category = this.props.objectives.find(item => {
			return item.category == this.props.category._id
		})

		let handler = function() {
			this.props.deleteCategory(this.props.category._id, true);
		}.bind(this);

		sweetalert({
			title: "Do you really want to delete category?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: false
		}, function(isConfirm){
				if(isConfirm && category == undefined){
					handler();
					sweetalert.close();
				} else if(isConfirm && category != undefined){
            sweetalert("This category isn't empty.", "error");
        }
			});
	}

	editCategory() {
		this.props.onDeleteNewCategory();
		this.props.activeCategory(this.props.index);
	}

	saveChanges() {
    let title = this.refs.categoryInput.value.toLowerCase(); 

		if(isEmpty(title)) {
			sweetalert({
  			title: 'Error!',
  			text: 'Category title cannot be empty',
  			type: 'error',
  		}, () => {	
  			ReactDOM.findDOMNode(this.refs.categoryInput).focus(); 
  		});
		} else if(title === this.props.category.title) {
			this.cancelEdit();
		} else {
			sweetalert({
				title: "Do you really want to save changes?",
				text: "This fill affect on all users",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#4caf50",
				confirmButtonText: "OK",
				closeOnConfirm: false,
			}, () => {
		    this.props.editCategory(this.props.category._id, title); 
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
