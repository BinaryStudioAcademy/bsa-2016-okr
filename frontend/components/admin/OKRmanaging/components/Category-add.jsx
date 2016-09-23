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
  			setTimeout(this.props.focusAddInput, 0);
  		});
		} else {
			let displayedTitle = title.length > 12 ? `${title.substr(0, 12)}...` : title;

			sweetalert({
				title: `Create category '${displayedTitle}'?`,
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#4caf50',
				confirmButtonText: 'Yes, create',
				closeOnConfirm: false,
			}, () => {
				this.props.saveEditCategory(null, title);
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
					<button  onClick={this.addNewCategory}
									 className="btn btn-green add"
									 aria-hidden="true"
									 title="Save">
									 <i className="fi-1 flaticon-1-check"></i>
					</button>
					<button onClick={ this.resetAddingCategoryInput }
									className="btn btn-red delete"
									title='Cancel'
									aria-hidden="true">
									<i className="fi flaticon-multiply"></i>
					</button>
				</div>
			</section>
		)
	}
}

export default NewCategory;
