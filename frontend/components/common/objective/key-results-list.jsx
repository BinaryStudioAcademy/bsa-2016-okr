import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import KeyResultItem from './key-result.jsx';
import KeyResultAdd from './key-result-add.jsx';
import './key-results.scss';
import sweetalert from 'sweetalert';
import '../styles/sweetalert.css';
import { isEmpty } from '../../../../backend/utils/ValidateService';
import cookie from 'react-cookie';

const session = cookie.load('user-id');

class KeyResults extends Component {
	constructor(props) {
		super(props);

		this.textHandleShow = this.textHandleShow.bind(this);
		this.setShowKeyResultElement = this.setShowKeyResultElement.bind(this);

		this.onAddNewKeyResultClick = this.onAddNewKeyResultClick.bind(this);
		this.resetAutocompleteState = this.resetAutocompleteState.bind(this);
		this.hideAddKeyResultInput = this.hideAddKeyResultInput.bind(this);
		this.saveEditedKeyResult = this.saveEditedKeyResult.bind(this);
		this.isNotDuplicate = this.isNotDuplicate.bind(this);
		this.focusEditInput = this.focusEditInput.bind(this);
	}

	focusEditInput(id) {
		let inputEl = this.refs[`keyResult-${ id }`].refs.keyResultTitle;
		ReactDOM.findDOMNode(inputEl).focus();
	}

	isNotDuplicate(id, title, difficulty) {
		let keyResultIndex = this.props.data.findIndex((keyResult) => {
			return keyResult.templateId.title === title;
		});

		if( keyResultIndex === -1 ) { //|| (!isEmpty(id) && this.props.data[keyResultIndex].templateId._id === id)
			return true;
		} else {
			if(this.props.data[keyResultIndex].templateId.difficulty === difficulty) {
				sweetalert({
					title: 'Error!',
					text: 'Key result with such title for that objective already exists',
					type: 'error',
				}, () => {
					setTimeout(() => {
						this.focusEditInput(id);
					}, 0);
				});

				return false;
			} else {
				return true;
			}
		}
	}

	saveEditedKeyResult(id, title, difficulty) {
		if(this.isNotDuplicate(id, title, difficulty)) {
			let objectiveId = this.props.objectiveId;
			let reqBody = {
				keyResultId: id,
				title: title,
				difficulty: difficulty
			};

			this.props.editKeyResult.editTitleAndDifficulty(objectiveId, reqBody);
			sweetalert.close();
		}
	}

	hideAddKeyResultInput() {
		let keyResultAddBtn = this.refs.newKeyResultButton;
		let keyResultAddElement = this.refs.newKeyResultButton.nextElementSibling;

		if (keyResultAddElement.classList.contains('display')) {
			keyResultAddElement.classList.remove('display');
			keyResultAddElement.classList.add('undisplay');
		}

		if (keyResultAddBtn.classList.contains('undisplay')) {
			keyResultAddBtn.classList.remove('undisplay');
			keyResultAddBtn.classList.add('display');
		}
	}

	onAddNewKeyResultClick() {
		let keyResultAddBtn = this.refs.newKeyResultButton;
		let keyResultAddElement = this.refs.newKeyResultButton.nextElementSibling;

		if (keyResultAddElement.classList.contains('undisplay')) {
			keyResultAddElement.classList.remove('undisplay');
			keyResultAddElement.classList.add('display');
		}

		if (keyResultAddBtn.classList.contains('display')) {
			keyResultAddBtn.classList.remove('display');
			keyResultAddBtn.classList.add('undisplay');
		}
	}

	resetAutocompleteState() {
		console.log('Hiding key result input...');
		let keyResultAddBtn = this.refs.newKeyResultButton;
		let keyResultAddElement = this.refs.newKeyResultButton.nextElementSibling;

		if (keyResultAddElement.classList.contains('display')) {
			keyResultAddElement.classList.remove('display');
			keyResultAddElement.classList.add('undisplay');
		}

		if (keyResultAddBtn.classList.contains('undisplay')) {
			keyResultAddBtn.classList.remove('undisplay');
			keyResultAddBtn.classList.add('display');
		}
	}

	setShowKeyResultElement(keyResultElement) {
		if (keyResultElement.classList.contains('undisplay')) {
			keyResultElement.classList.remove('undisplay');
			keyResultElement.classList.add('display');
		} else {
			keyResultElement.classList.remove('display');
			keyResultElement.classList.add('undisplay');
		}
	}

	textHandleShow(e) {
		var keyResultElement = e.target.nextElementSibling;
		this.setShowKeyResultElement(keyResultElement);
	}

	render() {
		let isArchived = this.props.isArchived;
		let changeScore = this.props.changeScore;
		let addNewKeyResult;
		let items;
		let isItHomePage = this.props.isItHomePage;

		if (!isArchived) {
			addNewKeyResult = (
				<div id="new-obj-keyresults">
					<a ref="newKeyResultButton"
					   className='add-new-keyresult-btn display'
					   onClick={ this.onAddNewKeyResultClick }>
						+Add new key result
					</a>
					<KeyResultAdd
						objectiveId={ this.props.objectiveId }
						resetAutocompleteState={ this.resetAutocompleteState }
						isItHomePage={ isItHomePage }
					/>
				</div>
			);
			items = this.props.data.map((item, index) => {
				return <KeyResultItem index={index} key={index} item={item}
				                      mentorId={this.props.mentorId}
				                      isArchived={ isArchived }
				                      changeScore={ changeScore(item._id) }
				                      objectiveId={ this.props.objectiveId }
				                      softDeleteObjectiveKeyResultByIdApi={ this.props.softDeleteObjectiveKeyResultByIdApi }
				                      hideAddKeyResultInput = { this.hideAddKeyResultInput }
				                      editKeyResult = { this.props.editKeyResult }
				                      saveEditedKeyResult = { this.saveEditedKeyResult }
				                      ref={ `keyResult-${ item._id }` }
				/>
			});
		} else {
			items = this.props.data.map((item, index) => {
				return <KeyResultItem index={index}
				                      key={index}
				                      item={item}
				                      isArchived={ isArchived }
				                      editKeyResult = { this.props.editKeyResult }
				/>
			});
		}

		return (
			<div className='key-results'>
				<button className="btn btn-blue-hover change" onClick={this.textHandleShow}>Key results
				</button>
				<div className='key-result-details undisplay'>
					<ul className='key-result-details-ul'>
						{ items }
					</ul>
					{ addNewKeyResult }
				</div>
			</div>
		)
	}
}

export default KeyResults
