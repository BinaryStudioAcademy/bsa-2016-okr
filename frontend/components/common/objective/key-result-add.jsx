import React from 'react';
import AutocompleteInput from '../../autocomplete-input/autocomplete-input.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { keyResult } from '../../../../backend/config/constants';

const notifications = require("../../../actions/notifications.js");
//import * as actions from "../../../actions/keyResultActions";

class KeyResult extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.resetAutocompleteState = this.resetAutocompleteState.bind(this);
		this.getAutocompleteData = this.getAutocompleteData.bind(this);
		this.setAutocompleteSelectedItem = this.setAutocompleteSelectedItem.bind(this);
		this.addNewItem = this.addNewItem.bind(this);
		this.isValid = this.isValid.bind(this);
	}

	addNewItem(title) {
		if (title !== '') {
			let selectedItemId = this.props.keyResultsReducer.selectedItem._id || '';
			let difficulty = keyResult.INTERMEDIATE;

			this.props.saveEditKeyResult(null, title, difficulty, selectedItemId);

			this.props.resetAutocompleteState();
		}
	};

	resetAutocompleteState() {
		this.props.resetAutocompleteState();
	};

	getAutocompleteData(title) {
		let objectiveId = this.props.objectiveId;
		this.props.getAutocompleteKeyResults(objectiveId, title);
	};

	setAutocompleteSelectedItem(item) {
		this.props.setAutocompleteKeyResultsSelectedItem(item);
	};

	isValid(value) {
		return true;
	};

	render() {
		return (
			<section className="autocomplete undisplay">
				<AutocompleteInput
					getAutocompleteData={ this.getAutocompleteData }
					autocompleteData={ this.props.keyResultsReducer.data }
					autocompletePlaceholder='key result'

					setAutocompleteSelectedItem={ this.setAutocompleteSelectedItem }
					selectedItem={ this.props.keyResultsReducer.selectedItem }

					addNewItem={ this.addNewItem }
					resetAutocompleteState={ this.resetAutocompleteState }
				  isValid={ this.isValid }
					refInput={ `autocompleteInput-${this.props.objectiveId}` }
				/>
			</section>
		)
	}
}

function mapStateToProps(state) {
	return {
		keyResultsReducer: state.keyResults
	};
}

const KeyResultConnected = connect(mapStateToProps)(KeyResult);

export default KeyResultConnected;