import React from 'react';
import ObjectiveItem from './objective.jsx';
import ObjectiveInput from '../new-objective/objectiveInput.jsx';
import { isEmpty } from '../../../backend/utils/ValidateService';

var ObjectiveList = (props) => {
	const categories = props.categories || [];
	const objectives = props.objectives || [];

	console.log('categories in Objective List', props.categories);
	console.log('objectives in Objective List', props.objectives);

	var categoryItems = [];

	if(!isEmpty(categories)) {

		categoryItems = categories.map((category, index) => {
			var objectiveItems = objectives
				.filter((objective) => {
					return objective.templateId.category == category._id
				})
				.map((item, index) => {
					return <ObjectiveItem index={ index } key={ item._id } item={ item } />
				});
			
			return (
				<div key={ index }>
				<p><span className="category-title">{ category.title }</span></p>
					<ObjectiveInput category={ category.title }/>
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
