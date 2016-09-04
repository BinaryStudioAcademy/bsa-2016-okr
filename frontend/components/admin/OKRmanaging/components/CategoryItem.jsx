import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/categoriesActions.js";

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

	delete(){
		let category = this.props.objectives.find(item => {
			return item.category == this.props.category._id
		})
			
		let result = confirm('Do you really want to delete category?');
    if (result && category == undefined){
			this.props.deleteCategory(this.props.category._id, true);
		}	
		else alert("This category isn't empty.");
	}

	editCategory(){
		this.props.activeCategory(this.props.index);
	}

	saveChanges(){
		let result = confirm('Do you really want to save changes?');
    if (result){
      let reqBody = {};
      let categoryTitle = document.querySelector("input.category-title").value;

      reqBody.title = categoryTitle;
      
    	this.props.editCategory(this.props.category._id, reqBody);
		}
	}

	render(){
		let titleEl;
    let edit;
    let editSaveIcon;
    let editSaveTitle;
    let cancel;
    if(this.props.categories.edit && this.props.categories.activeCategory == this.props.index){
    	titleEl = (<input type='text' className='category-title' defaultValue={this.props.category.title} />);
	    edit =(<i className='fi flaticon-success save' aria-hidden="true" title='Save' onClick={this.saveChanges}></i>);
	    cancel = (<i className="fi flaticon-multiply cancel" title='Cancel' aria-hidden="true" onClick={this.cancelEdit}></i>);
    } else {
    	titleEl = (<span>{this.props.category.title} </span>);
	    edit = (<i className='fi flaticon-edit edit' aria-hidden="true" title='Edit' onClick={this.editCategory}></i>);
	    cancel = (<i className='fi flaticon-garbage-2 delete' aria-hidden="true" title='Delete' onClick={this.delete}></i>);
    }

		return (
			<li className='category-item'>
				{titleEl}
				<div className='edit-category'>
					{edit}
					{cancel}
				</div>
			</li>
			)
	}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    objectives: state.okrManaging.objectives
  };
}

const CategoryItemConnected = connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
export default CategoryItemConnected