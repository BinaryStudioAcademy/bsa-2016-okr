import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as categoriesActions from "../../../../actions/categoriesActions.js";
import * as okrManagingActions from "../../../../actions/okrManagingActions.js";

import sweetalert from 'sweetalert';

import { isEmpty } from '../../../../../backend/utils/ValidateService';

import CategoryItem from './CategoryItem.jsx';
import NewCategory from './Category-add.jsx';

class CategoryList extends Component {
	constructor(props){
		super(props);

		this.showAddCategoryInput = this.showAddCategoryInput.bind(this);
		this.isNotDuplicate = this.isNotDuplicate.bind(this);
		this.addCategory = this.addCategory.bind(this);
		this.editCategory = this.editCategory.bind(this);
		this.hideAddInput = this.hideAddInput.bind(this);
		this.focusAddInput = this.focusAddInput.bind(this);
		this.focusEditInput = this.focusEditInput.bind(this);
	}

	showAddCategoryInput() {
		this.props.categoriesActions.cancelEdit();
		this.props.okrManagingActions.cancelEdit();

		let categoryAddBtn = this.refs.newCategoryButton;
		let categoryAddElement = this.refs.newCategoryButton.nextElementSibling;

		if (categoryAddElement.classList.contains('undisplay')) {
			categoryAddElement.classList.remove('undisplay');
			categoryAddElement.classList.add('display');
		}

		if (categoryAddBtn.classList.contains('display')) {
			categoryAddBtn.classList.remove('display');
			categoryAddBtn.classList.add('undisplay');
		}

		this.focusAddInput();
	}
	
	focusAddInput() {
		let inputEl = this.refs.newCategoryComponent.refs.newCategory;
		ReactDOM.findDOMNode(inputEl).focus();
	}

  focusEditInput(id) {
    let inputEl = this.refs[`category-${ id }`].refs.categoryInput;
    ReactDOM.findDOMNode(inputEl).focus();
  }

	isNotDuplicate(id, title) {
		let categoryIndex = this.props.category.list.findIndex((el) => {
			return el.title === title;
		});
		

		if(categoryIndex === -1) {
			sweetalert.close();
			return true;
		} else {
			sweetalert({
				title: 'Error!',
				text: 'Category with such title already exists',
				type: 'error',
			}, () => {
				setTimeout(() => {
					if(!isEmpty(id)) {
	          this.focusEditInput(id);
					}
        }, 0);
			});
			
			return false;
		}
	}

	addCategory(title) {
		if(this.isNotDuplicate(null, title)) {
			let reqBody = {
				title,
			};
			this.props.categoriesActions.addCategory(reqBody);
		}
	}

	editCategory(id, title) {
		if(this.isNotDuplicate(id, title)) {
			let reqBody = {
				title,
			};

			this.props.categoriesActions.editCategory(id, reqBody);
		}
	}

	hideAddInput() {
		let categoryAddBtn = this.refs.newCategoryButton;
		let categoryAddElement = this.refs.newCategoryButton.nextElementSibling;

		if (categoryAddElement.classList.contains('display')) {
			categoryAddElement.classList.remove('display');
			categoryAddElement.classList.add('undisplay');
		}

		if (categoryAddBtn.classList.contains('undisplay')) {
			categoryAddBtn.classList.remove('undisplay');
			categoryAddBtn.classList.add('display');
		}
	}

	componentWillMount(){
		this.props.categoriesActions.cancelEdit();
		this.props.categoriesActions.getAllCategories();
	}

render() {
	return(
		<div>
			<p>
				<span>Categories</span>
			</p>
			<ul className='category-list'>
				{this.props.category.list.map((item, index) => {
					return <CategoryItem index = { index } 
															 category = { item } 
															 key = { index } 
															 categories = { this.props.category } 
															 objectives = { this.props.objectives } 
															 editCategory = { this.editCategory }
															 activeCategory = { this.props.categoriesActions.activeCategory }
															 cancelEdit = { this.props.categoriesActions.cancelEdit }
															 deleteCategory = { this.props.categoriesActions.deleteCategory }
															 hideAddInput = { this.hideAddInput }
															 ref={ `category-${ item._id }` }
									/>
				})}
			</ul>
			<div id="new-category">
						<a ref="newCategoryButton" className='add-new-category-btn display' onClick={ this.showAddCategoryInput }>
							+Add new category</a>
						<NewCategory 
							ref={'newCategoryComponent'}
							category={ this.props.category }
							addCategory={ this.addCategory }
							hideAddInput={ this.hideAddInput }
							focusAddInput={ this.focusAddInput }
						/>
			</div>
		</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		categoriesActions: bindActionCreators(categoriesActions, dispatch),
		okrManagingActions: bindActionCreators(okrManagingActions, dispatch),
	}
}

function mapStateToProps(state) {
	return {
		category: state.categories,
		objectives: state.okrManaging.objectives
	};
}

const CategoryListConnected = connect(mapStateToProps, mapDispatchToProps)(CategoryList);
export default CategoryListConnected

