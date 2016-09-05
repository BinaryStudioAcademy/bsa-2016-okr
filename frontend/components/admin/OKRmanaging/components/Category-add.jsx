import React from 'react';

class NewCategory extends React.Component {
	constructor(props) {
		super(props);

		this.onDeleteCategory = this.onDeleteCategory.bind(this);
		this.addNewCategory = this.addNewCategory.bind(this);
	}

	addNewCategory() {
		let result = confirm('Do you really want to add new category?');
    if (result){
			let title = this.refs.newCategory.value;
			const body = {
				title: title,
			};

			this.props.addCategory(body);

			this.props.onDelete();
			this.refs.newCategory.value = '';
		}
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