import React, { Component } from 'react';
import KeyResult from './key-result.js';
import './key-result.scss';
class KeyResults extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let item = this.props.data.map((item, index) => {
			return <KeyResult index={index} key={index} item={item} />
		})
		return (
			<ul>
         		{item}
		    </ul>        
		)
	}
}

export default KeyResults