import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import sweetalert from 'sweetalert';

var CONST = require('../../../../../backend/config/constants');
import { isEmpty } from '../../../../../backend/utils/ValidateService';

class KeyResult extends Component {
	constructor(props) {
		super(props);

		this.cancelAddingKeyResult = this.cancelAddingKeyResult.bind(this);
		this.addNewKeyResult = this.addNewKeyResult.bind(this);
		this.resetAddingKeyResultInput = this.resetAddingKeyResultInput.bind(this);
	}

	addNewKeyResult() {
		let title = this.refs.keyResultTitle.value.trim();
		let difficulty = this.refs.keyResultDifficulty.value;

		if(isEmpty(title)) {
			sweetalert({
  			title: 'Error!',
  			text: 'Key result title cannot be empty',
  			type: 'error',
  		}, () => {
  			setTimeout(this.props.focusAddInput, 0);
  		});
		} else {
			let displayedTitle = title.length > 20 ? `${title.substr(0, 20)}...` : title;
			sweetalert({
				title: `Create key result '${ displayedTitle }'?`,
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#4caf50',
				confirmButtonText: 'Yes, create',
				closeOnConfirm: false,
			}, () => {
				this.props.addKeyResult(title, difficulty);
				this.resetAddingKeyResultInput();
				this.props.hideAddKeyResultInput();
			});
		}
	};

	resetAddingKeyResultInput() {
		this.refs.keyResultTitle.value = '';
		this.refs.keyResultDifficulty.value = CONST.keyResult.EASY;
	}

	cancelAddingKeyResult() {
		this.resetAddingKeyResultInput();
		this.props.hideAddKeyResultInput();
	}

	render() {
		return (
			<section className="add-new-key-result undisplay">
				<input type='text' className='add-new-key-result-title' ref="keyResultTitle" placeholder='Enter key result title' />
				<div className='add-key-result-icon'>
					<button onClick={this.addNewKeyResult}
									className="btn btn-green add"
									aria-hidden="true"
									title="Save">
									<i className="fi-1 flaticon-1-check"></i>
					</button>
					<button onClick={this.cancelAddingKeyResult}
									className="btn btn-red delete"
									title='Cancel'
									aria-hidden="true">
									<i className="fi flaticon-multiply"></i>
					</button>
				</div>
				<select className='add-key-result-difficulty' ref="keyResultDifficulty" defaultValue={CONST.keyResult.EASY}>
					<option value={CONST.keyResult.EASY}>{CONST.keyResult.EASY}</option>
					<option value={CONST.keyResult.INTERMEDIATE}>{CONST.keyResult.INTERMEDIATE}</option>
					<option value={CONST.keyResult.ADVANCED}>{CONST.keyResult.ADVANCED}</option>
				</select>
			</section>
		)
	}
}

export default KeyResult