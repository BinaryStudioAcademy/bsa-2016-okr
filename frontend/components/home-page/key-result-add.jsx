import React from 'react';
import './key-result-add.scss';
import AutocompleteInput from '../autocomplete-input/autocomplete-input.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/keyResultActions";

class KeyResult extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.onAddKeyResultClick = this.onAddKeyResultClick.bind(this);
		this.onDeleteKeyResultClick = this.onDeleteKeyResultClick.bind(this);
		this.getAutocompleteData = this.getAutocompleteData.bind(this);
		this.setAutocompleteSelectedItem = this.setAutocompleteSelectedItem.bind(this);
	}

	onAddKeyResultClick() {
		console.log('-----ADD----');
	}

	onDeleteKeyResultClick() {
		this.props.onDeleteKeyResultClick();
	}

	getAutocompleteData(title) {
		let objectId = this.props.objectiveId;
		this.props.getAutocompleteKeyResults(objectId, title);
	}

	setAutocompleteSelectedItem(item) {
		this.props.setAutocompleteKeyResultsSelectedItem(item);
	}

	render() {
		return (
			<section className="undisplay">

				<AutocompleteInput
					getAutocompleteData={this.getAutocompleteData}
					setAutocompleteSelectedItem={this.setAutocompleteSelectedItem}
					autocompleteData={this.props.keyResultsReducer.data}
					autocompleteType='key result'
				/>

				<div>
					<button type="button" className="btn btn-blue-hover add-button-key-result"
					        onClick={this.onAddKeyResultClick}>
						<i className="fi flaticon-add" aria-hidden="true"></i>
					</button>
				</div>

				<div>
					<button type="button" className="btn btn-red-hover delete-button-key-result"
					        onClick={this.onDeleteKeyResultClick}>
						<i className="fi flaticon-garbage-2" aria-hidden="true"></i>
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