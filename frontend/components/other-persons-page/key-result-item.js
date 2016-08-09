import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

	}
	
	render() {
	if (this.props.item.completed == 'true')
		return (
			<li className="keyResult completed">
         		{this.props.item.title}
		    </li>        
		)
		else
			return (
				<li className="keyResult">
	         		{this.props.item.title}
			    </li>        
			)
	}
}

export default KeyResult