import React, { Component } from 'react';
import ObjectiveInput from './objectiveInput.jsx';
import ObjectiveItem from './objective.jsx';
import { isEmpty } from '../../../../backend/utils/ValidateService';
import './objective.scss';
import CONST from '../../../../backend/config/constants';

class ObjectiveList extends Component {

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
    const {
      objectives = [],
      categories = [],
      isArchived,
      category,
      isAdmin,
      changeArchive,
      mentorId,
	  userId,
      quarter = {},
      updateUserObjectiveApi,
      softDeleteMyObjectiveByIdApi,
      changeKeyResultScore,
      isItHomePage
    } = this.props;

		var categoryItems = [];

		if(!isEmpty(categories)) {

			categoryItems = categories.map((category, index) => {
				let input;

				var objectiveItems = objectives
					.filter((objective) => {
						return ((objective.templateId.category == category._id) && (!objective.isDeleted))
					})
					.sort((a, b) => {
						return ( a.templateId.title.localeCompare(b.templateId.title) )
					})
					.map((item, index) => {
						// let isEstimate = item.keyResults.some(keyres => keyres.score > 0);
						return <ObjectiveItem index={ index } key={ item._id } item={ item }
																	isArchived = { isArchived }
																	isArchivedObjective = { item.isArchived }
																	isAdmin = { isAdmin }
																	mentorId = { mentorId }
											  						userId = { userId }
																	selectedYear= { this.props.selectedYear }
																	selectedTab={ this.props.selectedTab }
																	changeArchive = { changeArchive }
																	canEditArchived={ this.props.canEditArchived }
																	showBacklogBtn={ this.props.showBacklogBtn }
											  						moveObjectiveToBacklog={ this.props.moveObjectiveToBacklog }
																	updateUserObjectiveApi = { updateUserObjectiveApi }
																	softDeleteMyObjectiveByIdApi={ softDeleteMyObjectiveByIdApi }
																	changeKeyResultScoreOne={ changeKeyResultScore }
																	softDeleteObjectiveKeyResultByIdApi={ this.props.softDeleteObjectiveKeyResultByIdApi }
																	isItHomePage = { isItHomePage }
																	editKeyResult = { this.props.editKeyResult }
																	addNewKeyResults = { this.props.addNewKeyResults }
																	getAutocompleteKeyResults = { this.props.getAutocompleteKeyResults }
																	setAutocompleteKeyResultsSelectedItem = { this.props.setAutocompleteKeyResultsSelectedItem }
						/>
					});

				if(!isArchived) {
					input = <ObjectiveInput
						createObjective={ this.props.createObjective(category._id, objectives) }
						getObjectiveAutocompleteData={ this.props.getObjectiveAutocompleteData(category._id, quarter._id) }
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

export default ObjectiveList;
