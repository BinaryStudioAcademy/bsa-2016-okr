import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import sweetalert from 'sweetalert';
import { isEmpty } from '../../../../../backend/utils/ValidateService';
import '../../../common/styles/sweetalert.css';

class NewCategory extends Component {
	constructor(props) {
		super(props);

		this.resetAddingCategoryInput = this.resetAddingCategoryInput.bind(this);
		this.addNewCategory = this.addNewCategory.bind(this);
	}

	addNewCategory() {
		let title = this.refs.newCategory.value.toLowerCase();

		if(isEmpty(title)) {
			sweetalert({
  			title: 'Error!',
  			text: 'Category title cannot be empty',
  			type: 'error',
  		}, () => {	
  			ReactDOM.findDOMNode(this.refs.newCategory).focus(); 
  		});
		} else {
			sweetalert({
				title: "Do you really want to add new category?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#4caf50",
				confirmButtonText: "OK",
				closeOnConfirm: false,
			}, () => {
				this.props.addCategory(title);
				this.resetAddingCategoryInput();
			});
		}
	}

	resetAddingCategoryInput() {
		this.props.hideAddInput();
		this.refs.newCategory.value = '';
	}

	render() {
		return (
			<section className="add-new-key-result undisplay">
				<input type='text' className='add-new-category' ref="newCategory" placeholder='Enter category' />
				<div className='add-category-icon'>
					<i className="fi-1 flaticon-1-check add" aria-hidden="true" title='Save' onClick={this.addNewCategory}></i>
					<i className="fi flaticon-multiply delete" title='Cancel' onClick={ this.resetAddingCategoryInput } aria-hidden="true"></i>
				</div>
			</section>
		)
	}
}

export default NewCategory;
