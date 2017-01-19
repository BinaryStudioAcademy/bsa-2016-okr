import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';

import 'alertifyjs/build/css/alertify.css';
import alertify from 'alertifyjs';

import * as userBacklogActions from "../../actions/userBacklogActions";
import * as objectiveActions from "../../actions/objectiveActions";
import * as myStateActions from "../../actions/myStateActions";
import * as keyResultActions from '../../actions/keyResultActions';
import * as otherPersonActions from '../../actions/otherPersonActions';

import { isEmpty, isCorrectId, isMentorActionAllowed } from '../../../backend/utils/ValidateService';
import { isStringsEqual } from '../../../backend/utils/HelpService';
import { getYears, getObjectivesData } from '../../../backend/utils/UIHelpService';
import CONST from '../../../backend/config/constants.js';

import CategoriesTabs from './CategoryTabs';
import ObjectiveInput from '../common/objective/objectiveInput.jsx';
import ObjectiveItem from '../common/objective/objective.jsx';

import './userBacklog.scss';

const session = cookie.load('user-id');

const notifications = require("../../actions/notifications.js");

class UserBacklog extends Component {

    constructor(props) {
        super(props);

        this.selectCategory = this.selectCategory.bind(this);
        this.createBacklogObjective = this.createBacklogObjective.bind(this);
        this.getObjectiveAutoCompleteData = this.getObjectiveAutoCompleteData.bind(this);
        this.isDuplicateObjective = this.isDuplicateObjective.bind(this);
        this.renderObjectives = this.renderObjectives.bind(this);
        this.changeKeyResultScore = this.changeKeyResultScore.bind(this);
        this.updateUserObjectiveApi = this.updateUserObjectiveApi.bind(this);
        this.softDeleteMyObjectiveByIdApi = this.softDeleteMyObjectiveByIdApi.bind(this);
        this.addToQuarter = this.addToQuarter.bind(this);

        this.state = {
            errors: []
        };

        this.selectedCategory = {};
        this.userId = props.userId || session;
    }

    isDuplicateObjective(objective) {
        return this.props.userBacklog.backlogObjectives.find((item) => {
            return item.templateId._id === objective._id;
        });
    }

    createBacklogObjective(title, objective) {
        if (!isEmpty(objective) && this.isDuplicateObjective(objective)) {
            console.log('duplicate objective ' + title);
            return;
        }

        let body = {
            title: title,
            userId: this.userId,
            objectiveId: objective._id,
            categoryId: this.selectedCategory._id,
        };

        this.props.userBacklogActions.addBacklogObjective(body);
    }

    selectCategory(category) {
        this.props.userBacklogActions.clearErrors();
        this.selectedCategory = category;
        this.props.userBacklogActions.getObjectivesByCategory(this.userId, category._id);
    }

    componentWillMount() {
        this.props.userBacklogActions.setActiveTab(0);
        this.selectedCategory = this.props.categories.list[0] || {};
        this.props.userBacklogActions.getObjectivesByCategory(this.userId, this.selectedCategory._id);
    }

    componentWillUnmount() {
        this.props.userBacklogActions.clearErrors();
    }

    updateUserObjectiveApi(id, description, title) {
        this.props.userBacklogActions.updateBacklogObjective(id, description, title);
    }

    softDeleteMyObjectiveByIdApi(id, flag) {
        this.props.userBacklogActions.softDeleteBacklogObjective(id, flag);
    }

    changeKeyResultScore(objectiveId) {
        const userId = this.userId;        
        const { user } = this.props.userPage;
        const isItHomePage = !isStringsEqual(user._id, userId);     

        let apiCall;

        if(isItHomePage) {
            apiCall = this.props.myStateActions.changeKeyResultScore;
        } else {
            apiCall = this.props.otherPersonActions.changeKeyResultScore;
        }

        return (keyResultId) => {
            return (score, mentorId) => {
                if (!isCorrectId(objectiveId)
                    || !isCorrectId(keyResultId)) {
                    return;
                }

                let body = {
                    keyResultId: keyResultId,
                    score: score,
                    userId: userId
                };

                if (mentorId != undefined) {
                    apiCall(objectiveId, body, notifications.notificationApprenticeUpdateKey, mentorId);
                } else {
                    apiCall(objectiveId, body);
                }
            };
        };
    }

    sortObjectives(objectives) {
        return objectives.sort((prev, next) => {
            return new Date(prev.createdAt).getTime() > new Date(next.createdAt).getTime() ? -1 : 1;
        });
    }

    addToQuarter(backlogObjectiveId, quarterInd, callback) {
        this.props.userBacklogActions.addToQuarter(backlogObjectiveId, quarterInd, this.userId);
    }

    renderObjectives() {
        let objectives = this.sortObjectives(this.props.userBacklog.backlogObjectives);
        let archived;
        // Edit key result on HomePage or UserPage
        let editKeyResult = {};
        // If you need to know is it user HomePage "/" or UserPage "/user/:id" - use this variable
        const userId = this.userId;
        const { user } = this.props.userPage;
        const isItHomePage = !isStringsEqual(user._id, userId);
        let isAdmin = this.props.myState.me.localRole === CONST.user.localRole.ADMIN;
        let selectedYear, selectedTab;
        selectedYear = CONST.currentYear;
        selectedTab = CONST.currentQuarter;

        editKeyResult = {
            id: this.props.myState.editKeyResultId,
            isEditing: this.props.myState.editKeyResultIsEditing,
            enableEdit: this.props.myStateActions.editKeyResultEnableEditOnHomePage,
            disableEdit: this.props.myStateActions.editKeyResultDisabledEditOnHomePage,
            editTitleAndDifficulty: this.props.userBacklogActions.editKeyResultEditTitleAndDifficulty,
        };

        let userInfo = {};

        userInfo = isItHomePage ? getObjectivesData(this.props.myState.me, selectedYear, selectedTab) :
            getObjectivesData(user, selectedYear, selectedTab);

        archived = false;

        return objectives.map((item, index) => {
            return <ObjectiveItem index={ index } key={ item._id } item={ item } isBacklog={ true } addToQuarter={ this.addToQuarter }
                                  isArchived = { archived }
                                  isArchivedObjective = { item.isArchived }
                                  isAdmin = { isAdmin }
                                  mentorId = { userInfo.mentorId }
                                  selectedYear= { this.props.selectedYear }
                                  selectedTab={ this.props.selectedTab }
                                  changeArchive = { this.changeArchive }
                                  updateUserObjectiveApi = { this.updateUserObjectiveApi }
                                  softDeleteMyObjectiveByIdApi={ this.softDeleteMyObjectiveByIdApi }
                                  changeKeyResultScoreOne={ this.changeKeyResultScore }
                                  softDeleteObjectiveKeyResultByIdApi={ this.props.userBacklogActions.softDeleteObjectiveKeyResultByIdApi }
                                  isItHomePage = { isItHomePage }
                                  editKeyResult = { editKeyResult }
                                  addNewKeyResults = { this.props.userBacklogActions.addNewBacklogObjectiveKeyResults }
                                  getAutocompleteKeyResults = { this.props.keyResultActions.getAutocompleteKeyResults }
                                  setAutocompleteKeyResultsSelectedItem = { this.props.keyResultActions.setAutocompleteKeyResultsSelectedItem }
            />
        });
    }

    getObjectiveAutoCompleteData(title) {
        let category = isEmpty(this.selectedCategory) ? this.props.categories.list[0] : this.selectedCategory;
        this.props.objectiveActions.getAutocompleteObjectivesBacklog(category._id, title);
    }

    showAlertMessage() {
        alertify.notify(this.props.userBacklog.errorMessage, 'error', 5, () => {
            this.props.userBacklogActions.clearErrors();
        });
    }

    render() {
        let objectives = this.renderObjectives();

        if (isEmpty(this.props.categories.list)) {
            return <h1 className="placeholder">No categories</h1>;
        }

        if (this.props.userBacklog.errorMessage) {
            this.showAlertMessage();
        }

        return (
            <div className={ this.props.userId ? '' : 'main-content'}>
                <div className="backlog-title">
                    <p><span>Backlog</span></p>
                </div>
                <CategoriesTabs selectCategory={ this.selectCategory }/>
                <ObjectiveInput
                    createObjective={ this.createBacklogObjective }
                    getObjectiveAutocompleteData={ this.getObjectiveAutoCompleteData }
                    isItHomePage = { false }
                />
                <div id='objectives' className="" >
                    { objectives }
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        objectiveActions: bindActionCreators(objectiveActions, dispatch),
        userBacklogActions: bindActionCreators(userBacklogActions, dispatch),
        myStateActions: bindActionCreators(myStateActions, dispatch),
        keyResultActions: bindActionCreators(keyResultActions, dispatch),
        otherPersonActions: bindActionCreators(otherPersonActions, dispatch),
    };
}

function mapStateToProps(state) {
    return {
        userBacklog: state.userBacklog,
        myState: state.myState,
        userPage: state.userPage,
        categories: state.categories
    };
}

const UserDashboardConnected = connect(mapStateToProps, mapDispatchToProps)(UserBacklog);

export default UserDashboardConnected;