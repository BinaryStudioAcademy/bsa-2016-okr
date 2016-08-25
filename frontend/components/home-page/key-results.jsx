import React, { Component } from 'react';
import KeyResultItem from './key-result.jsx';
import KeyResultAdd from './key-result-add.jsx';
import './key-results.scss';

class KeyResults extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			keyResults: props.data
		};
		
		this.handleShow = this.handleShow.bind(this);
		this.textHandleShow = this.textHandleShow.bind(this);
		this.changeScore = this.changeScore.bind(this);
		this.setShowKeyResultElement = this.setShowKeyResultElement.bind(this);

		this.onAddNewKeyResultClick = this.onAddNewKeyResultClick.bind(this);
		this.onDeleteKeyResultClick = this.onDeleteKeyResultClick.bind(this);
	}

	onAddNewKeyResultClick() {
		let keyResultAddBtn = this.refs.newKeyResultButton;
		let keyResultAddElement = this.refs.newKeyResultButton.nextElementSibling;

		if (keyResultAddElement.classList.contains('undisplay')) {
			keyResultAddElement.classList.remove('undisplay');
			keyResultAddElement.classList.add('display');
		}

		if (keyResultAddBtn.classList.contains('display')) {
			keyResultAddBtn.classList.remove('display');
			keyResultAddBtn.classList.add('undisplay');
		}
	}

	onDeleteKeyResultClick() {
		let keyResultAddBtn = this.refs.newKeyResultButton;
		let keyResultAddElement = this.refs.newKeyResultButton.nextElementSibling;

		if (keyResultAddElement.classList.contains('display')) {
			keyResultAddElement.classList.remove('display');
			keyResultAddElement.classList.add('undisplay');
		}

		if (keyResultAddBtn.classList.contains('undisplay')) {
			keyResultAddBtn.classList.remove('undisplay');
			keyResultAddBtn.classList.add('display');
		}
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

	changeScore(keyResult) {
		this.props.changeScore()
	}

	render() {
		let items = this.state.keyResults.map((item, index) => {
			return <KeyResultItem index={index} key={index} item={item} changeScore={this.changeScore}/>
		});

		return (
			<div className='key-results'>
				<span className="change" onClick={this.textHandleShow}>Key results</span>
				<span className="fa fa-angle-double-down fa-lg key-results-arrow change" onClick={this.handleShow}></span>
				<div className='key-result-details undisplay'>
					<ul className='key-result-details-ul'>
						{ items }
					</ul>

					<div id="new-obj-keyresults">
						<a ref="newKeyResultButton" className='add-new-keyresult-btn display' onClick={this.onAddNewKeyResultClick}>
							+Add new key result</a>

						<KeyResultAdd objectiveId={ this.props.objectiveId } onDeleteKeyResultClick={this.onDeleteKeyResultClick}/>
					</div>
				</div>
			</div>
		)
	}
}

export default KeyResults