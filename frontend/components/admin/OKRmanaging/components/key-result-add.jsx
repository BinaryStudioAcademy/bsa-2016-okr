import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../../actions/okrManagingActions.js";
var CONST = require('../../../../../backend/config/constants');

class KeyResult extends React.Component {
	constructor(props) {
		super(props);

		this.onDeleteKeyResultClick = this.onDeleteKeyResultClick.bind(this);
		this.addNewKeyResult = this.addNewKeyResult.bind(this);
	}

	addNewKeyResult() {
		let title = this.refs.keyResultTitle.value;
		let difficulty = this.refs.keyResultDifficulty.value;
		const body = {
			title: title,
			difficulty: difficulty,
			objectiveId: this.props.objectiveId,
		};

		console.log(body)
		this.props.addKeyResult(body);
		this.props.onDeleteKeyResultClick();
		this.refs.keyResultTitle.value = '';
		this.refs.keyResultDifficulty.value = CONST.keyResult.EASY;
	};

	onDeleteKeyResultClick() {
		this.props.onDeleteKeyResultClick();
	}

	render() {
		return (
			<section className="add-new-key-result undisplay">
				<input type='text' className='add-new-key-result-title' ref="keyResultTitle" placeholder='Enter key result title' />
				<select className='add-key-result-difficulty' ref="keyResultDifficulty" defaultValue={CONST.keyResult.EASY}>
					<option value={CONST.keyResult.EASY}>{CONST.keyResult.EASY}</option>
					<option value={CONST.keyResult.INTERMEDIATE}>{CONST.keyResult.INTERMEDIATE}</option>
					<option value={CONST.keyResult.ADVANCED}>{CONST.keyResult.ADVANCED}</option>
				</select>
				<div className='add-key-result-icon'>
					<i className="fi flaticon-success add" aria-hidden="true" title='Save' onClick={this.addNewKeyResult}></i>
					<i className="fi flaticon-multiply delete" title='Cancel' onClick={this.onDeleteKeyResultClick} aria-hidden="true"></i>
				</div>
			</section>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		okrManaging: state.okrManaging
	};
}

const KeyResultConnected = connect(mapStateToProps, mapDispatchToProps)(KeyResult);

export default KeyResultConnected;