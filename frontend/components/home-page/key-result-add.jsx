import React from 'react';
import './key-result-add.scss';
import AutocompleteInput from '../autocomplete-input/autocomplete-input.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/keyResultActions";

class KeyResult extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            data: [
            ],
            selected: null
        }

        this.handleDelKeyRes = this.handleDelKeyRes.bind(this);
        this.getAutocompleteData = this.getAutocompleteData.bind(this);
    }

    handleDelKeyRes() {
        this.props.onClick(this.props.id);
    }

    getAutocompleteData(title){
        let objectId='57b75e5a9b3eae4c20ade2f8';
        this.props.getAutocompleteKeyResults(objectId, title);
    }

    render() {
        return (
            <li className="keyresult-group">
                <section>

                    <AutocompleteInput
                        getAutocompleteData={this.getAutocompleteData}
                        autocompleteData = {this.props.stateFromReducer.keyResults.data}
                        autocompleteType = 'key result'
                    />

                    <div>
                        <button type="button" className="btn btn-blue-hover add-button-key-result"
                                onClick={this.handleDelKeyRes}>
                            <i className="fi flaticon-add" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div>
                        <button type="button" className="btn btn-red-hover delete-button-key-result"
                                onClick={this.handleDelKeyRes}>
                            <i className="fi flaticon-garbage-2" aria-hidden="true"></i>
                        </button>
                    </div>
                </section>
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}

const KeyResultConnected = connect(mapStateToProps, mapDispatchToProps)(KeyResult);

export default KeyResultConnected;

