import React, { Component } from 'react';
import KeyResultItem from './key-result.jsx';
import KeyResultAdd from './key-result-add.jsx';
import './key-results.scss';

class KeyResults extends Component {
	constructor(props) {
		super(props);
		
		this.textHandleShow = this.textHandleShow.bind(this);
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
		let keyResults = this.props.data;
		let changeScore = this.props.changeScore;
		let items = keyResults.map((item, index) => {
			return <KeyResultItem
								index={index}
								key={index}
								item={item}
								changeScore={ changeScore(item._id) }
								softDeleteObjectiveKeyResultByIdApi={ this.props.softDeleteObjectiveKeyResultByIdApi }
			/>
		});

		return (
			<div className='key-results'>
				<button className="btn btn-blue-hover change" onClick={this.textHandleShow}>Key results
				</button>
				<div className='key-result-details undisplay'>
					<ul className='key-result-details-ul'>
						{ items }
					</ul>

					<div id="new-obj-keyresults">
						<a ref="newKeyResultButton" className='add-new-keyresult-btn display' onClick={ this.onAddNewKeyResultClick }>
							+Add new key result</a>

						<KeyResultAdd objectiveId={ this.props.objectiveId } onDeleteKeyResultClick={ this.onDeleteKeyResultClick } />
					</div>
				</div>
			</div>
		)
	}
}

export default KeyResults