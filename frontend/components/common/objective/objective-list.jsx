import React from 'react';
import ObjectiveInput from '../../new-objective/objectiveInput.jsx';
import { isEmpty } from '../../../../backend/utils/ValidateService';

var ObjectiveList = (props) => {
	const categories = props.categories || [];
	const objectives = props.objectives || [];
	const my = props.my;
	const ObjectiveItem = props.ObjectiveItem;
	const softDeleteMyObjectiveByIdApi = props.softDeleteMyObjectiveByIdApi;

	var categoryItems = [];

	if(!isEmpty(categories)) {

		categoryItems = categories.map((category, index) => {
			let input;

			var objectiveItems = objectives
				.filter((objective) => {
					return objective.templateId.category == category._id
				})
				.map((item, index) => {
					return <ObjectiveItem index={ index } key={ item._id } item={ item } softDeleteMyObjectiveByIdApi={ softDeleteMyObjectiveByIdApi } />
				});

			if(my) {
				input = <ObjectiveInput category={ category.title }/>
			}

			return (
				<div key={ index }>
				<p><span className="category-title">{ category.title }</span></p>
					{ input }
					{ objectiveItems }
				</div>
				)
		});
	}

	return (
		<div id="project-category" className="category">{ categoryItems }</div>
		);
}

export default ObjectiveList
