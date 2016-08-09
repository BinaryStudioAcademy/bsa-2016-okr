import React, { Component } from 'react';
import KeyResultItem from './key-result-item.js';

class KeyResult extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let item = this.props.data.map((item, index) => {
			return <KeyResultItem index={index} key={index} item={item} />
		})
		return (
			<ol>
         		{item}
		    </ol>        
		)
	}
}

export default KeyResult