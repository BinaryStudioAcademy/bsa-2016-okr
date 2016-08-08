import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

	}
	
	render() {
	
		return (
			<li className="keyResult">
         		{this.props.item.title}
		    </li>        
		)
	}
}

export default KeyResult