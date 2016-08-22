import React, { Component } from 'react';
import KeyResultItem from './key-result-item.js';

class KeyResults extends Component {
	constructor(props) {
		super(props);
		
		this.handleShow = this.handleShow.bind(this);
		this.textHandleShow = this.textHandleShow.bind(this);
		this.setShowKeyResultElement = this.setShowKeyResultElement.bind(this);
	}
	
	setShowKeyResultElement(iconElement, keyResultElement) {
		if (keyResultElement.classList.contains('undisplay')) {
			keyResultElement.classList.remove('undisplay');
			keyResultElement.classList.add('display');
			iconElement.classList.remove('fa-angle-double-down');
			iconElement.classList.add('fa-angle-double-up');
		}
		else {
			iconElement.classList.remove('fa-angle-double-up');
			iconElement.classList.add('fa-angle-double-down');
			keyResultElement.classList.remove('display');
			keyResultElement.classList.add('undisplay');
		}
	}

	textHandleShow(e) {
		var iconElement = e.target.nextElementSibling,
				keyResultElement = e.target.nextElementSibling.nextElementSibling;
		this.setShowKeyResultElement(iconElement, keyResultElement);
	}

	handleShow(e) {
		var iconElement = e.target,
				keyResultElement = e.target.nextElementSibling;
		this.setShowKeyResultElement(iconElement, keyResultElement);
	}

	render() {
		let item = this.props.data.map((item, index) => {
			return <KeyResultItem index={index} key={index} item={item}/>
		})
		return (
			<div className='users-key-results'>
				<span className="change" onClick={this.textHandleShow}>Key results</span>
				<span className="fa fa-angle-double-down fa-lg key-results-arrow change" 
							onClick={this.handleShow}></span>
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