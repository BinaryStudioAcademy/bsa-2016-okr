import React, { Component } from 'react';
import AutocompleteInput from '../autocomplete-input/autocomplete-input.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mappingActions from "../../actions/mappingActions.js";

import './userAutocomplete.scss';

class UserAutocompleteInput extends Component {

    constructor(props) {
        super(props);

        this.isValid = this.isValid.bind(this);
        this.getAutocompleteData = this.getAutocompleteData.bind(this);
        this.resetAutocompleteState = this.resetAutocompleteState.bind(this);
        this.setAutocompleteSelectedItem = this.setAutocompleteSelectedItem.bind(this);

        this.state = {
            selectedUser: {}
        };
    }

    resetAutocompleteState() {
        this.props.selectUser({});
    }

    isValid(value) {
        value = value || '';
        value = value.trim();

        // return value.length > 3;
        return true;
    }

    getAutocompleteData(userName) {
        if (!userName || userName.length <= 2) {
            return this.props.getUsers();
        }

        this.props.getAutocompleteUsers(userName.toLowerCase());
    }

    setAutocompleteSelectedItem(item) {
        this.setState({
            selectedUser: item
        });
        this.props.selectUser(item);
    }

    convertUsers(rawUsers) {
        return rawUsers.map(user => {
            return Object.assign(user, { title: user.name });
        });
    }

    render() {
        return (
            <div className="user-autocomplete">
                <div className="title-group">
                    <section className="autocomplete">
                        <AutocompleteInput className='red-border'
                                           getAutocompleteData={ this.getAutocompleteData }
                                           autocompleteData = { this.convertUsers(this.props.users) }
                                           autocompletePlaceholder="users"
                                           setAutocompleteSelectedItem={ this.setAutocompleteSelectedItem }
                                           selectedItem={ this.state.selectedUser }
                                           resetAutocompleteState = { this.resetAutocompleteState }
                                           isValid={ this.isValid }
                                           refInput="userAutocompleteInput"
                        />
                    </section>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(mappingActions, dispatch);
}

function mapStateToProps(state) {
    return {
        users: state.mapping.users,
    };
}

const UserAutoCompleteInputConnected = connect(mapStateToProps, mapDispatchToProps)(UserAutocompleteInput);

export default UserAutoCompleteInputConnected;
