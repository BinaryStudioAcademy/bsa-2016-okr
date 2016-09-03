import React from 'react';
import AutocompleteInput from '../../autocomplete-input/autocomplete-input.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/keyResultActions";

class KeyResult extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.onDeleteKeyResultClick = this.onDeleteKeyResultClick.bind(this);
		this.getAutocompleteData = this.getAutocompleteData.bind(this);
		this.setAutocompleteSelectedItem = this.setAutocompleteSelectedItem.bind(this);
		this.addNewItem = this.addNewItem.bind(this);
		this.isValid = this.isValid.bind(this);
	}

	addNewItem() {
		let title = this.refs[`autocompleteInput-${this.props.objectiveId}`].refs['autocompleteInput'].value;
		if (title !== '') {
			const body = {
				title: title,
				keyResultId: this.props.keyResultsReducer.selectedItem._id || '',
			};

			let userObjectiveId = this.props.objectiveId;

			this.props.addNewKeyResults(userObjectiveId, body);
			this.props.onDeleteKeyResultClick();
		}
	};

	onDeleteKeyResultClick() {
		this.props.onDeleteKeyResultClick();
	}

	getAutocompleteData(title) {
		let objectiveId = this.props.objectiveId;
		this.props.getAutocompleteKeyResults(objectiveId, title);
	}

	setAutocompleteSelectedItem(item) {
		this.props.setAutocompleteKeyResultsSelectedItem(item);
	}

	isValid(value) {
		return true;
	}

	render() {
		return (
			<section className="autocomplete undisplay">

				<AutocompleteInput
					getAutocompleteData={ this.getAutocompleteData }
					setAutocompleteSelectedItem={ this.setAutocompleteSelectedItem }
					autocompleteData={ this.props.keyResultsReducer.data }
					autocompletePlaceholder='key result'
					addNewItem={ this.addNewItem }
				  isValid={ this.isValid }
					selectedItem={ this.props.keyResultsReducer.selectedItem }
				  ref={ `autocompleteInput-${this.props.objectiveId}` }
				/>

				<div className="autocomplete-button">
					<button type="button" className="btn btn-blue-hover add-button-key-result"
					        onClick={ this.addNewItem }>
						<i className="fi flaticon-add" aria-hidden="true"></i>
					</button>
				</div>

				<div className="autocomplete-button">
					<button type="button" className="btn btn-red-hover delete-button-key-result"
					        onClick={ this.onDeleteKeyResultClick }>
						<i className="fi flaticon-multiply" aria-hidden="true"></i>
					</button>
				</div>
			</section>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		keyResultsReducer: state.keyResults
	};
}

const KeyResultConnected = connect(mapStateToProps, mapDispatchToProps)(KeyResult);

export default KeyResultConnected;