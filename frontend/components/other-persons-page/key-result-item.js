import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

	}
	
	render() {
	
		return (
			<li id="r">
         		{this.props.item.title}
		    </li>        
		)
	}
}

export default KeyResult