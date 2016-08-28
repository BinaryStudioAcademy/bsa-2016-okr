import React, { Component } from 'react';
import KeyResultItem from './key-result-item.js';

class KeyResults extends Component {
	constructor(props) {
		super(props);
		
		this.textHandleShow = this.textHandleShow.bind(this);
		this.setShowKeyResultElement = this.setShowKeyResultElement.bind(this);
	}
	
	setShowKeyResultElement(keyResultElement) {
		if (keyResultElement.classList.contains('undisplay')) {
			keyResultElement.classList.remove('undisplay');
			keyResultElement.classList.add('display');
		}
		else {
			keyResultElement.classList.remove('display');
			keyResultElement.classList.add('undisplay');
		}
	}

	textHandleShow(e) {
		var keyResultElement = e.target.nextElementSibling;
		this.setShowKeyResultElement(keyResultElement);
	}

	render() {
		let item = this.props.data.map((item, index) => {
			return <KeyResultItem index={index} key={index} item={item}/>
		})
		return (
			<div className='users-key-results'>
				<button className="btn btn-blue-hover change" onClick={this.textHandleShow}>Key results
				</button>
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