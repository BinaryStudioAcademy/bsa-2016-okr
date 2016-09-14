import React from 'react';
import ObjectiveInput from './objectiveInput.jsx';
import { isEmpty } from '../../../../backend/utils/ValidateService';
import './objective.scss';

class ObjectiveList extends React.Component{

 	constructor(props) {
 		super(props);

 		this.getCategoryItems = this.getCategoryItems.bind(this);
 		this.changeCategoryContentVisibility = this.changeCategoryContentVisibility.bind(this);
 	}

 	changeCategoryContentVisibility(id) {
 		let icoId = id + " icon";
 		let categoryEl = document.getElementById(id);
 		let categoryIconEl = document.getElementById(icoId);

 		if (categoryEl.children[1].className === "hidden-category-content"){
 			categoryEl.children[1].className = "visible-category-content";
 			categoryIconEl.className = "fi flaticon-folder-10";
 		} else {
 			categoryEl.children[1].className = "hidden-category-content";
 			categoryIconEl.className = "fi flaticon-folder-2";
 		}
 	}

 	getCategoryItems() {
 		const categories = this.props.categories || [];
		const objectives = this.props.objectives || [];
		const ObjectiveItem = this.props.ObjectiveItem;
    const updateUserObjectiveApi = this.props.updateUserObjectiveApi;
		const softDeleteMyObjectiveByIdApi = this.props.softDeleteMyObjectiveByIdApi;
		const changeKeyResultScore = this.props.changeKeyResultScore;
		const isArchived = this.props.archived;
		const isAdmin = this.props.isAdmin;
		const changeArchive = this.props.changeArchive;
		const mentorId = this.props.mentorId;
	  let isItHomePage = this.props.isItHomePage;

		var categoryItems = [];

		if(!isEmpty(categories)) {

			categoryItems = categories.map((category, index) => {
				let input;

				var objectiveItems = objectives
					.filter((objective) => {
						return objective.templateId.category == category._id
					})
					.map((item, index) => {
						return <ObjectiveItem index={ index } key={ item._id } item={ item }
																	isArchived = { item.isArchived }
																	isAdmin = { isAdmin }
																	mentorId = { mentorId }
																	changeArchive = { changeArchive }
										              updateUserObjectiveApi = { updateUserObjectiveApi }
																	softDeleteMyObjectiveByIdApi={ softDeleteMyObjectiveByIdApi }
																	changeKeyResultScoreOne={ changeKeyResultScore }
																	softDeleteObjectiveKeyResultByIdApi={ this.props.softDeleteObjectiveKeyResultByIdApi }
																	isItHomePage = { isItHomePage }
																	editKeyResult = { this.props.editKeyResult }
						/>
					});

				if(!isArchived) {
					input = <ObjectiveInput
						createObjective={ this.props.createObjective(category._id) }
						getObjectiveAutocompleteData={ this.props.getObjectiveAutocompleteData(category._id) }
						key={ index }
						isItHomePage = { isItHomePage }
					/>
				}

				return (
					<div key={ index } id={ category.title }>
					<p className="category-title-container">
						<span className="category-title" onClick={ ()=>this.changeCategoryContentVisibility(category.title) }>
							<i className="fi flaticon-folder-10" id={category.title + ' icon'} aria-hidden="true"></i>
							{ category.title } <span className="obj-count-panel">{ objectiveItems.length }</span>
						</span>
					</p>
						<div className="visible-category-content" >
							{ input }
							{ objectiveItems }
						</div>
					</div>
				)
			});
		}
		return categoryItems;
 	}

 	render() {
		return (
			<div id="project-category" className="category">{ this.getCategoryItems() }</div>
		);

	}
}

export default ObjectiveList