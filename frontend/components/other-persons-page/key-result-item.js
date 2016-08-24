import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

	}
	render() {
			return (
				<li className="user-key-result">
					{this.props.item.templateId.title}
					<div className='score'>{this.props.item.score}</div>
				</li>
			)
	}
}

export default KeyResult