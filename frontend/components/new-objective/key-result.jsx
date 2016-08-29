import React from 'react';
import './key-result.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/okrManagingActions.js";

var CONST = require('../../../backend/config/constants');


class KeyResult extends React.Component {
	constructor(props) {
		super(props);

		this.handleDelKeyRes = this.handleDelKeyRes.bind(this);
	}

	handleDelKeyRes() {
		this.props.delete(this.props.num);
	}


	render() {

		console.log('num ' + this.props.num)
		return (
				<li className="keyresult-group">
					<i className="fi flaticon-multiply delete-new-key-result" title='Cancel' onClick={this.handleDelKeyRes} aria-hidden="true"></i>
					<input type='text' className='new-key-result-title' ref="keyResultTitle" placeholder='Enter key result title' />
					<select className='new-key-result-difficulty' ref="keyResultDifficulty" defaultValue={CONST.keyResult.EASY}>
						<option value={CONST.keyResult.EASY}>{CONST.keyResult.EASY}</option>
						<option value={CONST.keyResult.INTERMEDIATE}>{CONST.keyResult.INTERMEDIATE}</option>
						<option value={CONST.keyResult.ADVANCED}>{CONST.keyResult.ADVANCED}</option>
					</select>
				</li>
		)
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    index: state.okrManaging.index
  };
}

const KeyResultConnected = connect(mapStateToProps, mapDispatchToProps)(KeyResult);
export default KeyResultConnected;
