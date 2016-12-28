import React, { Component } from 'react'
import ReactDom from "react-dom";

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as statActions from "../../actions/statsActions";

import UserAutoComplete from '../common/userAutoCompleteInput';

import { isEmpty, isCorrectId, isMentorActionAllowed } from '../../../backend/utils/ValidateService';
import { getYears } from '../../../backend/utils/UIHelpService';
import CONST from '../../../backend/config/constants.js';

import './statFilter.scss';

class StatFilter extends Component {

    constructor(props) {
        super(props);

        this.onChangeFrom = this.onChangeFrom.bind(this);
        this.onChangeTo = this.onChangeTo.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onChangeQuarterTab = this.onChangeQuarterTab.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.setDateFieldsDisabled = this.setDateFieldsDisabled.bind(this);
        this.setErrors = this.setErrors.bind(this);

        this.state = {
            errorMsg: {
                year: ''
            },
            disableDatePickers: false,
        };
    }

    onReset() {
        var inputDateFrom = ReactDom.findDOMNode(this.refs.dateFrom).querySelector('input');
        inputDateFrom.value = '';
        var inputDateTo = ReactDom.findDOMNode(this.refs.dateTo).querySelector('input');
        inputDateTo.value = '';
        this.props.statActions.resetFilters();
        this.props.statActions.getFilteredItems();
        this.refs.selectYear.value = -1;
        this.refs.selectQuarter.value = -1;
        this.setErrors({});
        this.setDateFieldsDisabled(false);
    }

    onChangeFrom(dateString, { dateMoment, timestamp }) {
        if (!dateString) {
            this.props.statActions.setFilterDateFrom(null);
            this.props.statActions.getFilteredItems();
            return;
        }

        this.props.statActions.setFilterDateFrom(dateString);
        this.props.statActions.getFilteredItems();
    }

    onChangeTo(dateString, { dateMoment, timestamp }) {
        if (!dateString) {
            this.props.statActions.setFilterDateTo(null);
            this.props.statActions.getFilteredItems();
            return;
        }

        this.props.statActions.setFilterDateTo(dateString);
        this.props.statActions.getFilteredItems();
    }

    onChangeUser(user) {
        if (isEmpty(user) || !user._id) {
            this.props.statActions.setUserIdFilter(null);
            this.props.statActions.getFilteredItems();
            return;
        }

        this.props.statActions.setUserIdFilter(user._id);
        this.props.statActions.getFilteredItems();
    }

    setDateFieldsDisabled(disabled) {
        this.setState({
            disableDatePickers: disabled
        });
    }

    onChangeYear(event) {
        if (event.target.value == -1) {
            this.refs.selectQuarter.value = -1;
            this.props.statActions.setQuarterFilter(null);
            this.props.statActions.setYearFilter(null);
            this.setDateFieldsDisabled(false);
            this.props.statActions.getFilteredItems();
            return;
        }

        this.setErrors({});
        this.setDateFieldsDisabled(true);
        var year = event.target.value;
        this.props.statActions.setYearFilter(year);
        this.props.statActions.getFilteredItems();
    }

    onChangeQuarterTab(event) {
        if (event.target.value == -1) {
            this.setErrors({});
            this.props.statActions.setQuarterFilter(null);
            this.props.statActions.getFilteredItems();
            return;
        }

        if (!this.props.statsData.filters.year) {
            this.setErrors({ year: 'Choose year first' });
            return;
        }

        var tabIndex = event.target.value;
        this.props.statActions.setQuarterFilter(tabIndex);
        this.props.statActions.getFilteredItems();
    }

    setErrors(errors) {
        if (!errors || isEmpty(errors)) {
            this.setState({
                errorMsg: {
                    year: ''
                }
            });
            return;
        }
        this.setState({
            errorMsg: Object.assign(this.state.errorMsg, errors)
        });
    }

    render() {
        let years = getYears();
        let quarters = ["1-st", "2-nd", "3-rd", "4-th"];

        return(
            <div className={"stat-filter-bar"}>
                <ul className="filters-list">
                    <li>
                        <UserAutoComplete
                            selectUser={ this.onChangeUser }
                        />
                    </li>
                    <li>
                        <select onChange={ this.onChangeYear } ref="selectYear">
                            <option value='-1'>All years</option>
                            { years.map((year, i) => {
                                return <option key={ i } value={ year }>{ year }</option>
                            })}
                        </select>
                    </li>
                    <li>
                        <select onChange={ this.onChangeQuarterTab } ref="selectQuarter">
                            <option value='-1'>All quarters</option>
                            { quarters.map((quarter, i) => {
                                return <option key={ i } value={ i + 1 }>{ quarter }</option>
                            })}
                        </select>
                    </li>
                    <li>
                        <button onClick={this.onReset} className="btn btn-filter">Reset</button>
                    </li>
                </ul>
                <div className="error-bar">{ Object.keys(this.state.errorMsg).map((key) => {
                    return this.state.errorMsg[key];
                }) }</div>
                <table className="stat-filter-table">
                    <tbody>
                    <tr>
                        <td className="cell-right-align">Date: </td>
                        <td>
                            <DateField
                                disabled={ this.state.disableDatePickers }
                                className="date-field"
                                placeholder="From"
                                dateFormat="D MMMM YYYY"
                                onChange={this.onChangeFrom}
                                footer={false}
                                updateOnDateClick={true}
                                collapseOnDateClick={true}
                                theme={false}
                                ref="dateFrom"/>
                            <DateField
                                disabled={ this.state.disableDatePickers }
                                className="date-field"
                                placeholder="To"
                                dateFormat="D MMMM YYYY"
                                onChange={this.onChangeTo}
                                footer={false}
                                updateOnDateClick={true}
                                collapseOnDateClick={true}
                                theme={false}
                                ref="dateTo"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        statActions: bindActionCreators(statActions, dispatch),
    };
}

function mapStateToProps(state) {
    return {
        statsData: state.stats,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatFilter);
