import React from 'react';
import sweetalert from 'sweetalert';
import '../../../common/styles/sweetalert.css';

class NewCategory extends React.Component {
	constructor(props) {
		super(props);

		this.onDeleteCategory = this.onDeleteCategory.bind(this);
		this.addNewCategory = this.addNewCategory.bind(this);
	}

	addNewCategory() {
		let handler = function() {
			let title = this.refs.newCategory.value;
			const body = {
				title: title,
			};

			this.props.addCategory(body);

			this.props.onDelete();
			this.refs.newCategory.value = '';
		}.bind(this);

		sweetalert({
			title: "Do you really want to add new category?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, function(){handler();});
	}

	onDeleteCategory() {
		this.props.onDelete();
		this.refs.newCategory.value = '';
	}

	render() {
		return (
			<section className="add-new-key-result undisplay">
				<input type='text' className='add-new-category' ref="newCategory" placeholder='Enter category' />
				<div className='add-category-icon'>
					<i className="fi flaticon-success add" aria-hidden="true" title='Save' onClick={this.addNewCategory}></i>
					<i className="fi flaticon-multiply delete" title='Cancel' onClick={this.onDeleteCategory} aria-hidden="true"></i>
				</div>
			</section>
		)
	}
}

export default NewCategory;
