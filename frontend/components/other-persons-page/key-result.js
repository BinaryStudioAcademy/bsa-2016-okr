import React, { Component } from 'react';
import KeyResultItem from './key-result-item.js';

class KeyResults extends Component {
	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
	}
	handleShow(e) {
		var keyResult = e.target.nextElementSibling,
			icon = e.target;

		if (keyResult.classList.contains('undisplay')) {
			keyResult.classList.remove('undisplay');
			keyResult.classList.add('display');
			icon.classList.remove('fa-angle-double-down');
			icon.classList.add('fa-angle-double-up');
		}
		else {
			icon.classList.remove('fa-angle-double-up');
			icon.classList.add('fa-angle-double-down');
			keyResult.classList.remove('display');
			keyResult.classList.add('undisplay');
		} 
	}
	render() {
		let item = this.props.data.map((item, index) => {
			return <KeyResultItem index={index} key={index} item={item} />
		})
		return (
			<div className='user-key-results'>Key results
		        <span className="fa fa-angle-double-down fa-lg change" onClick={this.handleShow}></span>
		        <div className='key-result-details undisplay'>
		        	<ul>
         				{item}
		    		</ul>     	
		        </div>
		    </div>     
		)
	}
}

export default KeyResults