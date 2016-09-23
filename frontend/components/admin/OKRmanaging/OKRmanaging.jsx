import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../../actions/okrManagingActions';

import sweetalert from 'sweetalert';

import CONST from '../../../../backend/config/constants';
import { isEmpty } from '../../../../backend/utils/ValidateService';

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
		this.saveEditObjective = this.saveEditObjective.bind(this);
		this.getDuplicateObjective = this.getDuplicateObjective.bind(this);
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

		let keyResults = [''];

		this.props.addKeyResultToTemplate(keyResults);

		document.getElementsByClassName('new-key-result-title')[0].value = '';
		document.getElementsByClassName('new-key-result-difficulty')[0].value = CONST.keyResult.EASY;
	}

	getDuplicateObjective(id, title, description, category) {
    const { objectives } = this.props.okrManaging;
    let objectiveIndex = objectives.findIndex((objective) => {
      return (
				(objective.title === title)
				&& (objective.description === description)
				&& (objective.category === category)
				&& (objective._id !== id)
      );
    });

    return (objectiveIndex === -1) ? null : objectives[objectiveIndex];
  }

	saveEditObjective(id, data, focusWrongInputFn) {
		let duplicateItem = this.getDuplicateObjective(null, data.title, data.description, data.category);

		if(isEmpty(duplicateItem)) {
			if(isEmpty(id)) {
				this.props.createNewTemplate(data);
				this.closeNewObjectiveWindow();
			} else {
				this.props.editObjectiveTemplate(id, data);
			}

			sweetalert.close();
		} else if(duplicateItem.isDeleted) {
			sweetalert({
        title: 'Do you want to restore deleted objective?',
        text: 'Objective with such title for that category exists, but deleted by someone',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4caf50',
        confirmButtonText: 'Yes, restore'
      }, () => {
        this.props.deleteObjective(duplicateItem._id, false);

        if(isEmpty(id)) {
	        this.closeNewObjectiveWindow();
	      }
      });
		} else {
			sweetalert({
				title: 'Error!',
				text: 'Objective with such title/description for that category already exists',
				type: 'error',
			}, () => {
				setTimeout(focusWrongInputFn, 0);
			});
		}
	}

	render() {
		const { edit: editCategory, activeCategory, list: categories } = this.props.categories;
		const { objectives } = this.props.okrManaging;
		let displayedCategories = [];

		if (!isEmpty(categories)) {
			displayedCategories = categories.filter((category) => {
				return !category.isDeleted;
			});
		}

		return (
			<div>
				<CentralWindow>
					<NewObjective
						closeNewObjectiveWindow={ this.closeNewObjectiveWindow }
						saveEditObjective={ this.saveEditObjective }
						addKeyResultToTemplate={ this.props.addKeyResultToTemplate }
						removeKeyResultFromTemplate={ this.props.removeKeyResultFromTemplate }
						keyResults={ this.props.okrManaging.keyResults }
						categories={ displayedCategories }
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
							<ObjectiveList
								saveEditObjective={ this.saveEditObjective }
								categories={ displayedCategories }
								deleteObjective={ this.props.deleteObjective }
							/>
						</div>
				</div>
			</CentralWindow>
			<StatPanel>
				<div className="OKR-managing category">
						<CategoryList
							objectives={ objectives }
							categories={ categories }
							displayedCategories={ displayedCategories }
							edit={ editCategory }
							activeCategory={ activeCategory } />
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
