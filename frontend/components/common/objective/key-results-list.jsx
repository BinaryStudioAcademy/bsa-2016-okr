import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import KeyResultItem from './key-result.jsx';
import KeyResultAdd from './key-result-add.jsx';
import './key-results.scss';
import sweetalert from 'sweetalert';
import '../styles/sweetalert.css';
import { isEmpty } from '../../../../backend/utils/ValidateService';

class KeyResults extends Component {
	constructor(props) {
		super(props);

		this.textHandleShow = this.textHandleShow.bind(this);
		this.setShowKeyResultElement = this.setShowKeyResultElement.bind(this);

		this.onAddNewKeyResultClick = this.onAddNewKeyResultClick.bind(this);
		this.resetAutocompleteState = this.resetAutocompleteState.bind(this);
		this.hideAddKeyResultInput = this.hideAddKeyResultInput.bind(this);
		this.saveEditKeyResult = this.saveEditKeyResult.bind(this);
		this.focusEditInput = this.focusEditInput.bind(this);
		this.getDuplicateKeyResult = this.getDuplicateKeyResult.bind(this);
	}

	focusEditInput(id) {
		let inputEl = this.refs[`keyResult-${ id }`].refs.keyResultTitle;
		ReactDOM.findDOMNode(inputEl).focus();
	}

	getDuplicateKeyResult(id, title) {
		const { data } = this.props;
		let keyResultIndex = data.findIndex((keyResult) => {
			return (keyResult.templateId.title === title) && (keyResult._id !== id);
		});

		return (keyResultIndex === -1) ? null : data[keyResultIndex];
	}

	saveEditKeyResult(id, title, difficulty, selectedItemId) {
		let duplicateItem = this.getDuplicateKeyResult(id, title);
		let userObjectiveId = this.props.objectiveId;

		if(isEmpty(duplicateItem)) {
			if(!isEmpty(id)) {

				let reqBody = {
					keyResultId: id,
					title: title,
					difficulty: difficulty
				};

				this.props.editKeyResult.editTitleAndDifficulty(userObjectiveId, reqBody);
				sweetalert.close();
			} else {
				const body = {
					title: title,
					keyResultId: selectedItemId,
					isItHomePage: this.props.isItHomePage || false,
					userId: this.props.userId
				};

				this.props.addNewKeyResults(userObjectiveId, body);
			}

			sweetalert.close();
		} else {
			if (duplicateItem.isDeleted) {
				sweetalert({
					title: 'Do you want to restore deleted key result?',
					text: 'Key result with such title for that objective exists, but deleted by someone',
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#4caf50',
					confirmButtonText: 'Yes, restore'
				}, () => {
					this.props.softDeleteObjectiveKeyResultByIdApi(userObjectiveId,
							duplicateItem._id, false);
				});
			} else {
				sweetalert({
					title: 'Error!',
					text: 'Key result with such title for that objective already exists',
					type: 'error',
				});
			}
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
		// console.log('Hiding key result input...');
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
						saveEditKeyResult={ this.saveEditKeyResult }
						getAutocompleteKeyResults = { this.props.getAutocompleteKeyResults }
						setAutocompleteKeyResultsSelectedItem = { this.props.setAutocompleteKeyResultsSelectedItem }
					/>
				</div>
			);
			items = this.props.data
				.filter((item) => {
					return (!item.isDeleted)
				})
				.sort((a, b) => {
					return ( a.templateId.title.localeCompare(b.templateId.title) )
				})
				.map((item, index) => {
				return <KeyResultItem index={index} key={index} item={item}
				                      mentorId={this.props.mentorId}
				                      isArchived={ isArchived }
				                      selectedYear= { this.props.selectedYear }
															selectedTab={ this.props.selectedTab }
				                      changeScore={ changeScore(item._id) }
				                      objectiveId={ this.props.objectiveId }
				                      softDeleteObjectiveKeyResultByIdApi={ this.props.softDeleteObjectiveKeyResultByIdApi }
				                      hideAddKeyResultInput = { this.hideAddKeyResultInput }
				                      editKeyResult = { this.props.editKeyResult }
				                      saveEditKeyResult = { this.saveEditKeyResult }
				                      ref={ `keyResult-${ item._id }` }
				/>
			});
		} else {
			items = this.props.data
				.filter((item) => {
					return (!item.isDeleted)
				})
				.map((item, index) => {
				return <KeyResultItem index={index}
				                      key={index}
				                      item={item}
									  changeScore={ changeScore(item._id) }
									  canEditArchived={ this.props.canEditArchived }
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
