import React, { Component } from 'react';

export default class KeyResult extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { completed } = this.props.item;
		if (completed) {
			return (
				<div>
				<input className="keyResult-checked" type="checkbox" checked onChange={this.completed}/>
				<li className="user-key-result completed" style={{textDecoration:'line-through'}}>
	         		{ this.props.item.title }
			    </li>
			    </div>
			)
		}	else {
			return (
				<div>
				<input className="keyResult-check" type="checkbox" />
				<li className="user-key-result">
	         		{this.props.item.title}
	         		<span> — {this.props.item.score}</span>
			    </li>
			  </div>
			)
		}
	}
};
