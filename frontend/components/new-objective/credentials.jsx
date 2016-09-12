import React, { Component, PropTypes } from 'react';

import sweetalert from 'sweetalert';

import { isEmpty } from '../../../backend/utils/ValidateService';
import { getUniqueValuesFromArrayOfObjects } from '../../../backend/utils/HelpService';
import CONST from '../../../backend/config/constants';

import NewKeyResult from './key-result.jsx';

import './credentials.scss';

class NewObjCredentials extends Component {
	constructor(props) {
		super(props);

		this.createTemplate = this.createTemplate.bind(this);
		this.addNewKeyResult = this.addNewKeyResult.bind(this);
		this.delete = this.delete.bind(this);
	}

	addNewKeyResult() {
		const keyResultTitleElements = document.getElementsByClassName('new-key-result-title');
		const keyResultDifficultyElements = document.getElementsByClassName('new-key-result-difficulty');
		
		let emptyKeyResult = '';

		let keyResults = [];
		let keyResultItem = {};
		let count = 0;

		for(let i = 0; i < keyResultTitleElements.length; i++) {
			if(!isEmpty(keyResultTitleElements[i].value)) {
				keyResultItem.title = keyResultTitleElements[i].value;
				keyResultItem.difficulty = keyResultDifficultyElements[i].value;
				// keyResults.splice(-1, 0, keyResultItem);
				keyResults.push(keyResultItem);
				keyResultItem = {};
				count++;
			}
		}

		keyResults.push(emptyKeyResult);

		if(keyResultTitleElements.length == count) {
			this.props.addKeyResultToTemplate(keyResults)
		}
	}

	delete(index) {
		const keyResultTitleElements = document.getElementsByClassName('new-key-result-title');
		const keyResultDifficultyElements = document.getElementsByClassName('new-key-result-difficulty');
		let keyResults = [];
		let keyResultItem = {};
		
		for(let i = 0; i < keyResultTitleElements.length; i++) {
			keyResultItem.title = keyResultTitleElements[i].value;
			keyResultItem.difficulty = keyResultDifficultyElements[i].value;
			keyResults.push(keyResultItem);
			keyResultItem = {}; 
		}  

		this.props.addKeyResultToTemplate(keyResults);
		if(this.props.keyResults.length != 1) {
			this.props.removeKeyResultFromTemplate(index);
		}
	}

	createTemplate(event) {
		event.preventDefault();

		const keyResultTitleElements = document.getElementsByClassName('new-key-result-title');
		const keyResultDifficultyElements = document.getElementsByClassName('new-key-result-difficulty');

		let objectiveTitle = this.refs.newObjectiveTitle.value;
		let objectiveDesctiption = this.refs.newObjectiveDescription.value;
		let objectiveCategory = this.refs.newObjectiveCategory.value;
		let keyResults = [];
		let keyResultItem = {};
		let correct = 0;

		for(let i = 0; i < keyResultTitleElements.length; i++) {
			keyResultItem.title = keyResultTitleElements[i].value;
			
			if(!isEmpty(keyResultTitleElements[i].value)) {
				correct++;
			}

			keyResultItem.difficulty = keyResultDifficultyElements[i].value;
			keyResults.push(keyResultItem);
			keyResultItem = {};
		}

		if(isEmpty(objectiveTitle)) {
			sweetalert({
				title: 'Error!',
				text: 'Objective title cannot be empty',
				type: 'error',
			});
		} else if(isEmpty(objectiveDesctiption)) {
			sweetalert({
				title: 'Error!',
				text: 'Objective description cannot be empty',
				type: 'error',
			});
		} else if(correct != keyResultTitleElements.length) {
			sweetalert({
				title: 'Error!',
				text: 'Key result title cannot be empty',
				type: 'error',
			});
		} else { 
			let reqBody = {
				title: objectiveTitle,
				description: objectiveDesctiption,
				category: objectiveCategory,
				keyResults: getUniqueValuesFromArrayOfObjects(keyResults, 'title')
			};

			this.props.createNewTemplate(reqBody);
		}
	}

	render() {
		let keyResults;
		
		if(this.props.keyResults.length != 0) {
			keyResults = this.props.keyResults.map((keyResult, index) => {
				return <NewKeyResult keyResult={ keyResult } delete={ this.delete } key={ index } num={ index } />
			});
		} else {
			keyResults = (<NewKeyResult delete={ this.delete }/>);
		}
		return (
			<div id="new-obj-creds">
				<div className="title-group">
					<label htmlFor="new-obj-title">New objective title</label>
					<input ref="newObjectiveTitle" type="text" placeholder="Title" id="new-obj-title" />
					<select ref="newObjectiveCategory" className='template-category' id="new-obj-category">
						{ this.props.categories.map((category, index) => {
								return <option key={ index } value={ category._id }>{ category.title }</option>
							})
						}
					</select>
				</div>
				<div className="desc-group">
					<label htmlFor="new-obj-desc">Description</label>
					<textarea id="newObjectiveTemplateDescription" ref="newObjectiveDescription" name="new-obj-desc" id="new-obj-desc" placeholder="Description"></textarea>
				</div>
				<div>
					<label htmlFor="new-key-result-title">Key result</label>
					{ keyResults }
					<p className="new-key-result" onClick={ this.addNewKeyResult } tabIndex='0'>Add new key results</p>
				</div>
				<button type="button" id="new-obj-submit-btn" onClick={ this.createTemplate }>Add new objective</button>
			</div>
		);
	}
}

NewObjCredentials.propTypes = {
	createNewTemplate: PropTypes.func.isRequired,
	addKeyResultToTemplate: PropTypes.func.isRequired,
	removeKeyResultFromTemplate: PropTypes.func.isRequired,
	closeNewObjectiveWindow: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
	keyResults: PropTypes.array.isRequired,
};

export default NewObjCredentials;