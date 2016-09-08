import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../../actions/okrManagingActions';

import CentralWindow from '../../../containers/central-window.jsx';
import ObjectiveList from './components/ObjectiveList';
import CategoryList from './components/CategoryList.jsx';
import Searchbar from './components/SearchBar';
import Toolbar from './components/Toolbar';
import StatPanel from '../../../containers/statistic-panel.jsx';
import NewObjective from '../../new-objective/new-objective.jsx';

import './OKRmanaging.scss';

class OKRmanaging extends Component {
  constructor(props) {
    super(props);

    this.searchObjective = this.searchObjective.bind(this);
  }

  searchObjective(e) {
  	this.props.searchObjective(e.target.value);
  }

	render() {
	  return (
	   	<div>
	    	<CentralWindow>
	    		<NewObjective />
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


const OKRmanagingConnected = connect(null, mapDispatchToProps)(OKRmanaging);
export default OKRmanagingConnected;
