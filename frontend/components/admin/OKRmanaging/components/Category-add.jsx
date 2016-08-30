import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../../actions/categoriesActions.js";

class NewCategory extends React.Component {
	constructor(props) {
		super(props);

		this.onDeleteCategory = this.onDeleteCategory.bind(this);
		this.addNewCategory = this.addNewCategory.bind(this);
	}

	addNewCategory() {
		
	}

	onDeleteCategory() {
		this.props.onDelete();
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		category: state.categories
	};
}

const NewCategoryConnected = connect(mapStateToProps, mapDispatchToProps)(NewCategory);

export default NewCategoryConnected;