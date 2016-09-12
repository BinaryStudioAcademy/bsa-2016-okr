import React, { Component, PropTypes } from 'react';

var CONST = require('../../../backend/config/constants');

import './key-result.scss';

class KeyResult extends Component {
	constructor(props) {
		super(props);

		this.deleteKeyResult = this.deleteKeyResult.bind(this);
	}

	deleteKeyResult() {
		this.props.delete(this.props.num);
	}

	render() {
		let { keyResult, num } = this.props;
		
		if(keyResult.title != undefined && keyResult.difficulty != undefined) {
			this.refs.keyResultTitle.value = keyResult.title;
			this.refs.keyResultDifficulty.value = keyResult.difficulty;
		}

		return (
				<li className="keyresult-group">
					<i className="fi flaticon-multiply delete-new-key-result" 
						title='Cancel' 
						tabIndex='0' 
						onClick={ this.deleteKeyResult } 
						aria-hidden="true"
					></i>
					<input type='text' className='new-key-result-title' ref="keyResultTitle" 
									 placeholder='Enter key result title' />
					<select className='new-key-result-difficulty' ref="keyResultDifficulty" >
						<option value={ CONST.keyResult.EASY }>{ CONST.keyResult.EASY }</option>
						<option value={ CONST.keyResult.INTERMEDIATE }>{ CONST.keyResult.INTERMEDIATE }</option>
						<option value={ CONST.keyResult.ADVANCED }>{ CONST.keyResult.ADVANCED }</option>
					</select>
				</li>
		)
	}
}

KeyResult.propTypes = {
	keyResult: PropTypes.object.isRequired,
	num: PropTypes.number.isRequired,
};

export default KeyResult;
