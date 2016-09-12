import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../../actions/okrManagingActions';

import sweetalert from 'sweetalert';

import CONST from '../../../../backend/config/constants';

import CentralWindow from '../../../containers/central-window.jsx';
import ObjectiveList from './components/ObjectiveList.jsx';
import CategoryList from './components/CategoryList.jsx';
import Searchbar from './components/SearchBar.jsx';
import Toolbar from './components/Toolbar.jsx';
import StatPanel from '../../../containers/statistic-panel.jsx';
import NewObjective from '../../new-objective/new-objective.jsx';

import './OKRmanaging.scss';

class OKRmanaging extends Component {
	constructor(props) {
		super(props);

		this.searchObjective = this.searchObjective.bind(this);
		this.closeNewObjectiveWindow = this.closeNewObjectiveWindow.bind(this);
		this.resetNewObjectiveWindow = this.resetNewObjectiveWindow.bind(this);
		this.createNewTemplate = this.createNewTemplate.bind(this);
		this.isNotDuplicateObjective = this.isNotDuplicateObjective.bind(this);
		this.focusAddObjectiveInput = this.focusAddObjectiveInput.bind(this);
	}

	searchObjective(e) {
		this.props.searchObjective(e.target.value);
	}

	closeNewObjectiveWindow() {
		this.resetNewObjectiveWindow();

		var newObjWindow = document.getElementById('new-objective');

		if(!newObjWindow.classList.contains('opened')) {
			newObjWindow.classList.add('opened');
		} else { 
			newObjWindow.classList.remove('opened'); 
		}
	}

	resetNewObjectiveWindow() {
		document.getElementById('new-obj-title').value = '';
		document.getElementById('new-obj-desc').value = '';
		
		const keyResultTitleElements = document.getElementsByClassName('new-key-result-title');
		const keyResultDifficultyElements = document.getElementsByClassName('new-key-result-difficulty');

		for(let i = 0; i < keyResultTitleElements.length; i++) {
			 keyResultTitleElements[i].value = '';
			 keyResultDifficultyElements[i].value = CONST.keyResult.EASY;
		}
	}

	isNotDuplicateObjective(title, category, focusInputFn) {
		let objectiveIndex = this.props.okrManaging.objectives.findIndex((objective) => {
			if(objective.title === title && objective.category === category) {
				return true;
			} else {
				return false;
			}
		});

		if(objectiveIndex === -1) {
			return true;
		} else {
			sweetalert({
				title: 'Error!',
				text: 'Objective with such title for that category already exists',
				type: 'error',
			}, () => {
				setTimeout(focusInputFn, 0);
			});

			return false;
		}
	}

	focusAddObjectiveInput() {
		let inputEl = document.getElementById('new-obj-title');
		ReactDOM.findDOMNode(inputEl).focus();
	}

	createNewTemplate(data) {
		if(this.isNotDuplicateObjective(data.title, data.category, this.focusAddObjectiveInput)) {
			this.props.createNewTemplate(data);
			this.closeNewObjectiveWindow();
		}
	}

	render() {
		return (
			<div>
				<CentralWindow>
					<NewObjective 
						closeNewObjectiveWindow={ this.closeNewObjectiveWindow }
						createNewTemplate={ this.createNewTemplate }
						addKeyResultToTemplate={ this.props.addKeyResultToTemplate }
						removeKeyResultFromTemplate={ this.props.removeKeyResultFromTemplate }
						keyResults={ this.props.okrManaging.keyResults }
						categories={ this.props.categories.list }
					/>
					<div className="OKR-managing app container">
						<Toolbar/>
						<div className="OKR-managing fixed-header">
							<div className="OKR-managing search">
							<Searchbar searchObjective={ this.searchObjective } />
						</div>
						
						<div id="OKR-managing-title"> 
							<p><span>Template management</span></p>
						</div>
						</div>			
						<div className="OKR-managing objective-list">
							<ObjectiveList />
						</div>
				</div>
			</CentralWindow>
			<StatPanel>
				<div className="OKR-managing category">
						<CategoryList />
				</div>
			</StatPanel>
		</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		okrManaging: state.okrManaging,
		categories: state.categories
	};
}

const OKRmanagingConnected = connect(mapStateToProps, mapDispatchToProps)(OKRmanaging);
export default OKRmanagingConnected;
