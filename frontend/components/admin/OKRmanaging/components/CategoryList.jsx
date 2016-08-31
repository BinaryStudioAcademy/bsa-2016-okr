import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryItem from './CategoryItem.jsx'
import NewCategory from './Category-add.jsx'
import * as actions from "../../../../actions/categoriesActions.js";

class CategoryList extends Component {
	constructor(props){
		super(props);

		this.onDelete = this.onDelete.bind(this);
		this.addNewCategory = this.addNewCategory.bind(this);
  }

	addNewCategory() {
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
		}

		onDelete() {
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

render() {
	return(
		<div>
			<p>
				<span>Categories</span>
			</p>
			<ul className='category-list'>
			{this.props.category.map((item, index) => {
				return <CategoryItem index={index} category={item} key={index} />
			})}
			</ul>
			<div id="new-category">
						<a ref="newCategoryButton" className='add-new-category-btn display' onClick={this.addNewCategory}>
							+Add new category</a>
						<NewCategory  onDelete={this.onDelete} />
			</div>
		</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		category: state.categories.list
	};
}

const CategoryListConnected = connect(mapStateToProps, mapDispatchToProps)(CategoryList);
export default CategoryListConnected

