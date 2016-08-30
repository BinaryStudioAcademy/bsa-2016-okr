import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

	}
	render() {
			return (
				<li className="user-key-result">
					<div className='name'>{this.props.item.templateId.title}</div>
					<div className='score'>{this.props.item.score}</div>
					<div className='difficulty'>{this.props.item.templateId.difficulty}</div>
				</li>
			)
	}
}

export default KeyResult