import React, { Component } from 'react';
import AutocompleteInput from '../../autocomplete-input/autocomplete-input.jsx';
import './objectiveInput.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/objectiveActions";

class ObjectiveInput extends Component {
	constructor(props) {
		super(props);

		this.isValid = this.isValid.bind(this);
		this.getAutocompleteData = this.getAutocompleteData.bind(this);
		this.addNewItem = this.addNewItem.bind(this);
		this.resetAutocompleteState = this.resetAutocompleteState.bind(this);
		this.setAutocompleteSelectedItem = this.setAutocompleteSelectedItem.bind(this);
	}

	addNewItem(title) {
		if (title !== '') {
			let objectiveId = this.props.selectedTemplate;

			this.props.createObjective(title, objectiveId);
		}
	}

	resetAutocompleteState() {
		// Additional actions not needed yet
	}

	isValid(value) {
		value = value || '';
		value = value.trim();
		
		// return value.length > 3;
		return true;
	}

	getAutocompleteData(title) {
		this.props.getObjectiveAutocompleteData(title);
	}

	setAutocompleteSelectedItem(item) {
		this.props.setAutocompleteObjectivesSelectedItem(item);
	}

	render() {
		return (
			<div className="new-obj-creds">
				<div className="title-group">
					<section className="autocomplete undisplay">
						<AutocompleteInput className='red-border'
							getAutocompleteData={ this.getAutocompleteData }
              autocompleteData = { this.props.objectives }
              autocompletePlaceholder = 'objective'

							setAutocompleteSelectedItem={ this.setAutocompleteSelectedItem }
							selectedItem={ this.props.selectedTemplate }

							addNewItem={ this.addNewItem }
							resetAutocompleteState = { this.resetAutocompleteState }
							isValid={ this.isValid }
							refInput={ `autocompleteInput-${this.props.key}` }
						/>
					</section>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		objectives: state.objectives.data,
		selectedTemplate: state.objectives.selectedItem,
	};
}

const ObjectiveInputConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveInput);

export default ObjectiveInputConnected;
