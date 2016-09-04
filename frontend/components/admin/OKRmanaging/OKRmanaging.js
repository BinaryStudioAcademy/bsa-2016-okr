import React, { Component } from 'react';
import CentralWindow from "../../../containers/central-window.jsx";
import ObjectiveList from './components/ObjectiveList';
import CategoryList from './components/CategoryList.jsx';
import Searchbar from './components/SearchBar';
import Toolbar from './components/Toolbar';
import StatPanel from "../../../containers/statistic-panel.jsx";
import NewObjective from '../../new-objective/new-objective.jsx';

import './OKRmanaging.scss';

class OKRmanaging extends Component {
  constructor(props) {
    super(props); 
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
								<Searchbar />
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
				<div className="OKR-mnaging category">
					<CategoryList />
				</div>
			</StatPanel>
		</div>
    )
  }
}

export default OKRmanaging
