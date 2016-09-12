import React, { Component, PropTypes } from 'react';

import sweetalert from 'sweetalert';

import { isEmpty } from '../../../backend/utils/ValidateService';
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
		
		let keyResults = [''];
		let data = {};
		let count = 0;

		for(let i = 0; i < keyResultTitleElements.length; i++) {
			if(keyResultTitleElements[i].value != '') {
				data.title = keyResultTitleElements[i].value;
				data.difficulty = keyResultDifficultyElements[i].value;
				keyResults.splice(-1, 0, data);
				data = {};
				count++;
			}
		} 

		if(keyResultTitleElements.length == count) {
			this.props.addKeyResultToTemplate(keyResults)
		}
	}

	delete(index) {
		const keyResultTitleElements = document.getElementsByClassName('new-key-result-title');
		const keyResultDifficultyElements = document.getElementsByClassName('new-key-result-difficulty');
		let keyResults = [];
		let data = {};
		
		for(let i = 0; i < keyResultTitleElements.length; i++) {
			data.title = keyResultTitleElements[i].value;
			data.difficulty = keyResultDifficultyElements[i].value;
			keyResults.splice(i, 0, data);
			data = {}; 
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

		let reqBody = {};
		let objectiveTitle = this.refs.newObjectiveTitle.value;
		let objectiveDesctiption = this.refs.newObjectiveDescription.value;
		let objectiveCategory = this.refs.newObjectiveCategory.value;
		let keyResults = [];
		let data = {};
		let correct = 0;

		for(let i = 0; i < keyResultTitleElements.length; i++) {
			data.title = keyResultTitleElements[i].value;
			
			if(!isEmpty(keyResultTitleElements[i].value)) {
				correct++;
			}

			data.difficulty = keyResultDifficultyElements[i].value;
			keyResults.splice(i, 0, data);
			data = {}; 
		}

		reqBody.title = objectiveTitle;
		reqBody.description = objectiveDesctiption;
		reqBody.category = objectiveCategory;
		reqBody.keyResults = keyResults;

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
			this.props.createNewTemplate(reqBody);

			keyResults = [''];
			this.props.addKeyResultToTemplate(keyResults);
		}
	}

	render() {
		let keyResults;
		
		if(this.props.keyResults.length != 0) {
			keyResults = this.props.keyResults.map((keyResult, index) => {
				return <NewKeyResult keyResult={ this.props.keyResults } delete={ this.delete } key={ index } num={ index }/>
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