import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

	}
	render() {
	if (this.props.item.completed == 'true')
		return (
			<li className="user-key-result">
				<span className='score'>{this.props.item.score}</span>
         		<span className='completed'>{this.props.item.title}</span>
		    </li>        
		)
		else
			return (
				<li className="user-key-result">
	         		<span className='score'>{this.props.item.score}</span>
	         		{this.props.item.title}
			    </li>        
			)
	}
}

export default KeyResult