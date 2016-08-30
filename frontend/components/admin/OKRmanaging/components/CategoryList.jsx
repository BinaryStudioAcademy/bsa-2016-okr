import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CategoryItem from './CategoryItem.jsx'
import * as actions from "../../../../actions/categoriesActions.js";

class CategoryList extends Component {
	constructor(props){
		super(props);

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

