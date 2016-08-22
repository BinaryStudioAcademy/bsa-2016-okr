import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

	}
	render() {
	if (this.props.item.completed == 'true')
		return (
			<li className="user-key-result">
				<span className='completed'>{this.props.item.title}</span>
				<div className='score'>{this.props.item.score}</div>
			</li>
		)
		else
			return (
				<li className="user-key-result">
					{this.props.item.templateId.title}
					<div className='score'>{this.props.item.score}</div>
				</li>
			)
	}
}

export default KeyResult