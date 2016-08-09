import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

	}
	
	render() {
	if (this.props.item.completed == 'true')
		return (
			<li className="user-key-result completed">
         		{this.props.item.title}
		    </li>        
		)
		else
			return (
				<li className="user-key-result">
	         		{this.props.item.title}
			    </li>        
			)
	}
}

export default KeyResult