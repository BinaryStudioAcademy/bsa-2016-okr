import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rating from '../rating/rating.jsx';
import { debounce, getDifficultyNumber, getNumberDifficulty } from '../../../../backend/utils/HelpService';
const session = require('../../../../backend/config/session');
import { isEmpty } from '../../../../backend/utils/ValidateService';
import sweetalert from 'sweetalert';
import '../styles/sweetalert.scss';

const notifications = require("../../../actions/notifications.js");

class KeyResult extends Component {
	constructor(props) {
		super(props);

		this.state = {
			score: this.props.item.score,
			rating: getDifficultyNumber(this.props.item.templateId.difficulty) || 2
		};

		this.changeScore = debounce(this.changeScore.bind(this), 500);
		this.onChange = this.onChange.bind(this);
		this.handleDelKeyResult = this.handleDelKeyResult.bind(this);
		this.editKeyResult = this.editKeyResult.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.setRating = this.setRating.bind(this);
		this.saveChanges = this.saveChanges.bind(this);
		this.focusEditTitle = this.focusEditTitle.bind(this);
	}

	focusEditTitle() {
		let editEl = this.refs.keyResultTitle;
		ReactDOM.findDOMNode(editEl).focus();
	}

	saveChanges(e) {
		e.preventDefault();
		this.props.hideAddKeyResultInput();

		let id = this.props.item._id;
		let title = this.refs.keyResultTitle.value.trim();
		let difficulty = getNumberDifficulty(this.state.rating);
		let isNotChanged = (title === this.props.item.templateId.title &&
		this.state.rating === getDifficultyNumber(this.props.item.templateId.difficulty));

		if (isEmpty(title)) {
			sweetalert({
				title: 'Error!',
				text: 'Key result title cannot be empty',
				type: 'error',
			}, () => {
				setTimeout(this.focusEditTitle, 0);
			});
		} else if (isNotChanged) {
			this.cancelEdit();
		} else {
			sweetalert({
				title: 'Save all changes?',
				text: 'This fill affect on all users',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#4caf50',
				confirmButtonText: 'Yes, save',
				closeOnConfirm: false
			}, () => {
				this.props.saveEditedKeyResult(id, title, difficulty);
			});
		}
	}

	setRating(difficulty) {
		this.setState({
			rating: difficulty
		});
	}

	cancelEdit() {
		this.props.editKeyResult.disableEdit();
		this.setState({
			rating: getDifficultyNumber(this.props.item.templateId.difficulty) || 2
		});
	}

	editKeyResult(e) {
		if (!this.props.editKeyResult.isEditing) {
			e.preventDefault();
			this.props.hideAddKeyResultInput();
			let id = this.props.item._id;
			this.props.editKeyResult.enableEdit(id, true);
		}
	}

	handleDelKeyResult() {
		let handler = function () {

			if (this.props.mentorId != undefined)
				this.props.softDeleteObjectiveKeyResultByIdApi(this.props.objectiveId, this.props.item._id,
					notifications.otificationApprenticeDeletedKey, this.props.mentorId);
			else
				this.props.softDeleteObjectiveKeyResultByIdApi(this.props.objectiveId, this.props.item._id);

		}.bind(this);

		sweetalert({
			title: "Do you really want to delete this key result?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, function () {
			handler();
		});
	}

	changeScore() {
		this.props.changeScore(this.state.score, this.props.mentorId);
	}

	onChange(e) {
		var score = e.target.value;

		this.setState({
			score: score
		});
	}

	render() {
		const { item, isArchived } = this.props;
		let { id, isEditing } = this.props.editKeyResult;
		let score;
		let editSave;
		let cancelElement;
		let notApproved;
		let titleElement;
		let rangeElement;
		let deleteElement;
		let ratingElement;
		let scoreElement;

		if (!isArchived) {
			if (isEditing && item._id == id) {
				// ---=== THEN BEGIN ===---
				if (!item.templateId.isApproved) {
					editSave = (
						<button onClick={ this.saveChanges }
						        className='btn btn-green key-result-edit-button' aria-hidden="true" title='Save'>
							<i className='fi-1 flaticon-1-check'></i>
						</button>
					);

					cancelElement = (
						<button onClick={ this.cancelEdit }
						        className="btn btn-red key-result-cancel-button" aria-hidden="true" title='Cancel'>
							<i className="fi flaticon-multiply"></i>
						</button>
					);
					//notApproved = (<span className='fi flaticon-push-pin notApproved' title='not approved'></span>);
				}

				titleElement = (
					<input defaultValue={ item.templateId.title }
					       className='keyResult-title'
					       type='text'
					       ref="keyResultTitle"
					/>
				);

				ratingElement = (
					<Rating
						rating={ this.state.rating }
						setRating={ this.setRating }
						isEdit={ true }
					/>
				);
				// ---=== THEN END ===---
			} else {
				score = this.state.score;

				scoreElement = ( <span className='score'>{ score }</span> );

				if (!item.templateId.isApproved) {
					editSave = (
						<button onClick={ this.editKeyResult }
						        className='btn btn-blue-hover key-result-edit-button'
						        aria-hidden="true"
						        title='Edit'>
							<i className='fi flaticon-edit'></i>
						</button>
					);

					notApproved = (<span className='fi flaticon-push-pin notApproved' title='not approved'></span>);
				}

				titleElement = (
					<div className='key-result-title'>{ item.templateId.title }</div>
				);

				deleteElement = (
					<button
						onClick={ this.handleDelKeyResult }
						type="button"
						className="btn btn-red-hover key-result-delete-button"
						aria-hidden="true"
						title='Delete'>
						<i className="fi flaticon-garbage-2"></i>
					</button>
				);

				rangeElement = (
					<input type="range" min="0" max="1" step="0.1" className="range keyScore"
					       value={ score } onMouseUp={ this.changeScore } onChange={ this.onChange }/>
				);

				ratingElement = (
					<Rating
						rating={ this.state.rating }
						isEdit={ false }
					/>
				);

			}
		} else {

			score = this.props.item.score;

			scoreElement = (
				<span className='score'>{ score }</span>
			);

			titleElement = (
				<div className='key-result-title'>{ item.templateId.title }</div>
			);

			ratingElement = (
				<Rating
					rating={ this.state.rating }
					isEdit={ false }
				/>
			);
		}

		return (
			<li className="key-result clearfix" tabIndex="0">
				{ notApproved }
				{ titleElement }
				{ deleteElement }
				{ cancelElement }
				{ editSave }
				{ scoreElement }
				{ rangeElement }
				{ ratingElement }
			</li>
		)
	}
}

export default KeyResult
