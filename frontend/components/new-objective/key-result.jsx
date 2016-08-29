import React from 'react';
import './key-result.scss';
var CONST = require('../../../backend/config/constants');


class KeyResult extends React.Component {
	constructor(props) {
		super(props);

		this.handleDelKeyRes = this.handleDelKeyRes.bind(this);
	}

	handleDelKeyRes() {
		this.props.delete(this.props.index);
	}


	render() {
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


export default KeyResult;
