import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		
		if(this.props.item.completed == 'true') {
			AddStyle(this.props.index);
		}
		return (
			<li className="r">
         		{this.props.item.title}
		    </li>        
		)
	}
}
function AddStyle(i){
}
export default KeyResult