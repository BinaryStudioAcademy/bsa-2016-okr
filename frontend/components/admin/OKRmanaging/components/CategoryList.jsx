import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as categoriesActions from "../../../../actions/categoriesActions.js";
import * as okrManagingActions from "../../../../actions/okrManagingActions.js";

import sweetalert from 'sweetalert';
import '../../../common/styles/sweetalert.css';

import { isEmpty } from '../../../../../backend/utils/ValidateService';

import CategoryItem from './CategoryItem.jsx';
import NewCategory from './Category-add.jsx';

class CategoryList extends Component {
	constructor(props){
		super(props);

		this.showAddCategoryInput = this.showAddCategoryInput.bind(this);
		this.saveEditCategory = this.saveEditCategory.bind(this);
		this.getDuplicateCategory = this.getDuplicateCategory.bind(this);
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

  getDuplicateCategory(id, title) {
  	const { categories } = this.props;

  	let categoryIndex = categories.findIndex((category) => {
  		return (category.title === title) && (category._id !== id)
  	});

  	return (categoryIndex === -1) ? null : categories[categoryIndex];
  }

	saveEditCategory(id, title) {
		let duplicateItem = this.getDuplicateCategory(id, title);

		if(isEmpty(duplicateItem)) {
			let reqBody = {	title	};

			if(isEmpty(id)) {
				this.props.categoriesActions.addCategory(reqBody);
			} else {
				this.props.categoriesActions.editCategory(id, reqBody);
			}

			sweetalert.close();
		} else if(duplicateItem.isDeleted) {
			sweetalert({
				title: 'Do you want to restore deleted category?',
				text: 'Category with such title exists, but deleted by someone',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#4caf50',
				confirmButtonText: 'Yes, restore'
			}, (isConfirm) => {
				if(isConfirm) {
					this.props.categoriesActions.deleteCategory(duplicateItem._id, false);
				}

				this.props.categoriesActions.cancelEdit();
			});
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
	const { edit, activeCategory, displayedCategories, objectives } = this.props;
	const { setActiveCategory, cancelEdit, deleteCategory } = this.props.categoriesActions;

	let displayedCategoriesEl = displayedCategories.sort((a, b) => {
		return a.title.localeCompare(b.title);
	}).map((category, index) => {
		let objectiveIndex = objectives.findIndex((objective) => {
			return objective.category === category._id && objective.isDeleted == false;
		});

		let isEmptyCategory = (objectiveIndex === -1) ? true : false;

		return (
			<CategoryItem
				index={ index }
				category={ category }
				key={ index }
				isEmptyCategory={ isEmptyCategory }
				edit={ edit }
				saveEditCategory={ this.saveEditCategory }
				activeCategory={ activeCategory }
				setActiveCategory={ setActiveCategory }
				cancelEdit={ cancelEdit }
				deleteCategory={ deleteCategory }
				hideAddInput={ this.hideAddInput }
				ref={ `category-${ category._id }` }
				id={ `category-${ category._id }` }
			/>
		);
	});

	return(
		<div>
			<p>
				<span>Categories</span>
			</p>
			<ul className='category-list'>
				{ displayedCategoriesEl }
			</ul>
			<div id="new-category">
						<a ref="newCategoryButton" className='add-new-category-btn display' tabIndex='0' onClick={ this.showAddCategoryInput }>
							+Add new category</a>
						<NewCategory
							ref={'newCategoryComponent'}
							category={ this.props.category }
							saveEditCategory={ this.saveEditCategory }
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

const CategoryListConnected = connect(null, mapDispatchToProps)(CategoryList);
export default CategoryListConnected
