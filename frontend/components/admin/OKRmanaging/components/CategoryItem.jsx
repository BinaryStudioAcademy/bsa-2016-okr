import React, {Component} from 'react';
import sweetalert from 'sweetalert';
import '../../../common/styles/sweetalert.css';

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
		this.props.onDeleteNewCategory();

		let category = this.props.objectives.find(item => {
			return item.category == this.props.category._id
		})

		let handler = function() {
			this.props.deleteCategory(this.props.category._id, true);
		}.bind(this);

		sweetalert({
			title: "Do you really want to delete category?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: false
		}, function(isConfirm){
				if(isConfirm && category == undefined){
					handler();
					sweetalert.close();
				} else if(isConfirm && category != undefined){
            sweetalert("This category isn't empty.", "error");
        }
			});
	}

	editCategory(){
		this.props.onDeleteNewCategory();
		this.props.activeCategory(this.props.index);
	}

	saveChanges(){
		let handler = function() {
			let reqBody = {};
      let categoryTitle = document.querySelector("input.category-title").value;

      reqBody.title = categoryTitle;

    	this.props.editCategory(this.props.category._id, reqBody);
		}.bind(this);

		sweetalert({
			title: "Do you really want to save changes?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, function(){handler();});
	}

	render(){
		let titleEl;
    let edit;
    let editSaveIcon;
    let editSaveTitle;
    let cancel;
    if( this.props.categories.edit && 
    		this.props.categories.activeCategory == this.props.index ) {
    	titleEl = ( <input type='text' 
    										 className='category-edit-title' 
    										 defaultValue={this.props.category.title} 
    						/> );
	    edit 		= ( <i className='fi-1 flaticon-1-check-rounded save' 
	    							 aria-hidden="true" 
	    							 title='Save' 
	    							 onClick={this.saveChanges}>
	    					</i> );
	    cancel  = ( <i className="fi flaticon-multiply cancel" 
	    							 title='Cancel' 
	    							 aria-hidden="true"
	    							 onClick={this.cancelEdit}>
	    					</i>);
    } else {
    	titleEl = ( <span>{this.props.category.title} </span> );
	    edit 		= ( <i className='fi flaticon-edit edit' 
	    							 aria-hidden="true" 
	    							 title='Edit' 
	    							 onClick={this.editCategory}>
	    					</i>);
	    cancel  = (<i className='fi flaticon-garbage-2 delete' 
	    							aria-hidden="true" 
	    							title='Delete' 
	    							onClick={this.delete}>
	    					</i>);
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

export default CategoryItem
