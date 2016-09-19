import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../../actions/okrManagingActions.js";

import sweetalert from 'sweetalert';

import KeyResultItem from './Key-result-item.jsx';
import KeyResultAdd from './key-result-add.jsx';

import { isEmpty } from '../../../../../backend/utils/ValidateService';

class KeyResults extends Component {
	constructor(props) {
		super(props);

		this.textHandleShow = this.textHandleShow.bind(this);
		this.setShowKeyResultElement = this.setShowKeyResultElement.bind(this);
		this.showAddKeyResultInput = this.showAddKeyResultInput.bind(this);
		this.hideAddKeyResultInput = this.hideAddKeyResultInput.bind(this);
		this.saveEditKeyResult = this.saveEditKeyResult.bind(this);
		this.getDuplicateKeyResult = this.getDuplicateKeyResult.bind(this);
		this.focusAddInput = this.focusAddInput.bind(this);
		this.focusEditInput = this.focusEditInput.bind(this);
	}

	showAddKeyResultInput() {
		this.props.cancelEdit();

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

		this.focusAddInput();
	}

	focusAddInput() {
		let inputEl = this.refs[`keyResultAdd-${ this.props.objective._id }`].refs.keyResultTitle;
		ReactDOM.findDOMNode(inputEl).focus();
	}

	focusEditInput(id) {
    let inputEl = this.refs[`keyResultTemplate-${ id }`].refs.keyResultTitle;
    ReactDOM.findDOMNode(inputEl).focus();
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

	setShowKeyResultElement(keyResultElement) {
		this.props.cancelEdit();

		if (keyResultElement.classList.contains('undisplay')) {
			keyResultElement.classList.remove('undisplay');
			keyResultElement.classList.add('display');
		}
		else {
			keyResultElement.classList.remove('display');
			keyResultElement.classList.add('undisplay');
		}
	}

	textHandleShow(e) {
		var keyResultElement = e.target.nextElementSibling;
		this.setShowKeyResultElement(keyResultElement);
	}

	getDuplicateKeyResult(id, title) {
		const { data } = this.props;
		let keyResultIndex = data.findIndex((keyResult) => {
			return (keyResult.title.toUpperCase() === title.toUpperCase()) && (keyResult._id !== id);
		});

		return (keyResultIndex === -1) ? null : data[keyResultIndex];
	}

	saveEditKeyResult(id, title, difficulty) {
		let duplicateItem = this.getDuplicateKeyResult(id, title);
		
		if(isEmpty(duplicateItem)) {
			let reqBody = {
				title: title,
				difficulty: difficulty
			};

			if(!isEmpty(id)) {
				this.props.editKeyResult(id, reqBody);
			} else {
				reqBody.objectiveId = this.props.objective._id,
				this.props.addKeyResult(reqBody);
			}
			
			sweetalert.close();
		} else if(duplicateItem.isDeleted) {
			sweetalert({
				title: 'Do you want to restore deleted key result?',
				text: 'Key result with such title for that objective exists, but deleted by someone',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#4caf50',
				confirmButtonText: 'Yes, restore'
			}, () => {
				this.props.deleteKeyResult(duplicateItem._id, duplicateItem.objectiveId, false);
			});
		} else {
			sweetalert({
				title: 'Error!',
				text: 'Key result with such title for that objective already exists',
				type: 'error',
			}, () => {
				setTimeout(() => {
					this.focusEditInput(id);
				}, 0);
			});
		}
	}

	setDefaultKeyResult(objectiveId) {
		return (...args) => {
			this.props.setDefaultKeyResult.call(null, objectiveId, ...args);
		}
	}

	render() {
		const { data } = this.props;
		
		let displayedKeyResults = data.filter((keyResult) => {
			return !keyResult.isDeleted;
		}).map((item, index) => {
			return <KeyResultItem index = { index } 
														objective = { this.props.objective } 
														key = { index } 
														item = { item }
														hideAddKeyResultInput = { this.hideAddKeyResultInput }
														saveChanges = { this.saveEditKeyResult }
														editingKeyResult = { this.props.okrManaging.editingKeyResult }
														activeKeyResult = { this.props.okrManaging.activeKeyResult }
														setActiveKeyResult = { this.props.setActiveKeyResult }
														setDefaultKeyResult = { this.setDefaultKeyResult(this.props.objective._id) }
														cancelEdit = { this.props.cancelEdit }
														deleteKeyResult = { this.props.deleteKeyResult }
														ref={ `keyResultTemplate-${ item._id }` }
							/>
		});
		
		return (
			<div className='key-results'>
				<button className="btn btn-blue-hover change" onClick={ this.textHandleShow }>Key results
				</button>
				<div className='key-result-details undisplay'>
					<ul>
						{ displayedKeyResults }
					</ul>
					<div id="new-obj-keyresults">
						<a ref="newKeyResultButton" className='add-new-keyresult-btn display' onClick={ this.showAddKeyResultInput }>
							+Add new key result
						</a>
						<KeyResultAdd 
							ref={`keyResultAdd-${this.props.objective._id}`}
							objectiveId={ this.props.objective._id } 
							hideAddKeyResultInput={ this.hideAddKeyResultInput }
							saveEditKeyResult={ this.saveEditKeyResult }
							focusAddInput={ this.focusAddInput }
						/>
					</div>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		okrManaging: state.okrManaging,
	};
}

const KeyResultsConnected = connect(mapStateToProps, mapDispatchToProps)(KeyResults);

export default KeyResultsConnected;