import React, { Component } from 'react';
import CentralWindow from "../../../containers/central-window.jsx";
import ObjectiveList from './components/ObjectiveList';
import ActiveObjective from './components/ActiveObjective';
import Searchbar from './components/SearchBar';
import Toolbar from './components/Toolbar';

import './OKRmanaging.scss';



/*var objectives = [{
	"title": "Improve technology infrastructure efficiency",
	"description": "Operation Efficiency Improvements for IT Infrastructure through Runbook Automation Technology",
	"category": "Projects",
	"creator": "Walter Ahumada"
}, {
	"title": "Significant revenue increase per customer",
	"description": "Implement new customer support software",
	"category": "Projects",
	"creator": "Lakeisha Breen"

}, {
	"title": "Automate financial processes for scale",
	"description": "Processes are successfully using Finance Automation to achieve real results",
	"category": "Knowledge",
	"creator": "Jayna Bhatti"

}, {
	"title": "Build an engaged and vibrant employee culture",
	"description": "Creating a vibrant wWorkplace culture and fostering employee",
	"category": "Knowledge",
	"creator": "Parker Hohlt"

}, {
	"title": "Deliver very agile HR function to stakeholders",
	"description": "Create flexible organizational structures that include highly skilled HR practitioners and agile delivery models",
	"category": "Expertise",
	"creator": "Leana Bowley"

}, {
	"title": "Deliver superior quality new leads",
	"description": "Superior quality, exclusive leads in real time",
	"category": "Knowledge",
	"creator": "Neva April"

}, {
	"title": "Optimize marketing spend to drive superior ROI",
	"description": "Drive superior marketing performance across the full multichannel customer experience",
	"category": "Knowledge",
	"creator": "Epifania Leo"

}, {
	"title": "Launch awesome, re-designed mobile app",
	"description": "Creating awesome web, mobile and UI designs and concepts",
	"category": "Expertise",
	"creator": "Nam Beaudin"

}, {
	"title": "Implement a new user-testing process",
	"description": "Evaluates the usability, functionality, user experience, and design of mobile app",
	"category": "Knowledge",
	"creator": "Luana Hack"

}, {
	"title": "Accelerate recurring revenue growth this quarter",
	"description": "Recurring software revenue 70% of total non-IFRS software revenue",
	"category": "Projects",
	"creator": "Son Gossage"

},{
	"title": "Improve technology infrastructure efficiency",
	"description": "Operation Efficiency Improvements for IT Infrastructure through Runbook Automation Technology",
	"category": "Projects",
	"creator": "Walter Ahumada"
}, {
	"title": "Significant revenue increase per customer",
	"description": "Implement new customer support software",
	"category": "Projects",
	"creator": "Lakeisha Breen"

}, {
	"title": "Automate financial processes for scale",
	"description": "Processes are successfully using Finance Automation to achieve real results",
	"category": "Knowledge",
	"creator": "Jayna Bhatti"

}, {
	"title": "Build an engaged and vibrant employee culture",
	"description": "Creating a vibrant wWorkplace culture and fostering employee",
	"category": "Knowledge",
	"creator": "Parker Hohlt"

}, {
	"title": "Deliver very agile HR function to stakeholders",
	"description": "Create flexible organizational structures that include highly skilled HR practitioners and agile delivery models",
	"category": "Expertise",
	"creator": "Leana Bowley"

}, {
	"title": "Deliver superior quality new leads",
	"description": "Superior quality, exclusive leads in real time",
	"category": "Knowledge",
	"creator": "Neva April"

}, {
	"title": "Optimize marketing spend to drive superior ROI",
	"description": "Drive superior marketing performance across the full multichannel customer experience",
	"category": "Knowledge",
	"creator": "Epifania Leo"

}, {
	"title": "Launch awesome, re-designed mobile app",
	"description": "Creating awesome web, mobile and UI designs and concepts",
	"category": "Expertise",
	"creator": "Nam Beaudin"

}, {
	"title": "Implement a new user-testing process",
	"description": "Evaluates the usability, functionality, user experience, and design of mobile app",
	"category": "Knowledge",
	"creator": "Luana Hack"

}, {
	"title": "Accelerate recurring revenue growth this quarter",
	"description": "Recurring software revenue 70% of total non-IFRS software revenue",
	"category": "Projects",
	"creator": "Son Gossage"

},{
	"title": "Improve technology infrastructure efficiency",
	"description": "Operation Efficiency Improvements for IT Infrastructure through Runbook Automation Technology",
	"category": "Projects",
	"creator": "Walter Ahumada"
}, {
	"title": "Significant revenue increase per customer",
	"description": "Implement new customer support software",
	"category": "Projects",
	"creator": "Lakeisha Breen"

}, {
	"title": "Automate financial processes for scale",
	"description": "Processes are successfully using Finance Automation to achieve real results",
	"category": "Knowledge",
	"creator": "Jayna Bhatti"

}, {
	"title": "Build an engaged and vibrant employee culture",
	"description": "Creating a vibrant wWorkplace culture and fostering employee",
	"category": "Knowledge",
	"creator": "Parker Hohlt"

}, {
	"title": "Deliver very agile HR function to stakeholders",
	"description": "Create flexible organizational structures that include highly skilled HR practitioners and agile delivery models",
	"category": "Expertise",
	"creator": "Leana Bowley"

}, {
	"title": "Deliver superior quality new leads",
	"description": "Superior quality, exclusive leads in real time",
	"category": "Knowledge",
	"creator": "Neva April"

}, {
	"title": "Optimize marketing spend to drive superior ROI",
	"description": "Drive superior marketing performance across the full multichannel customer experience",
	"category": "Knowledge",
	"creator": "Epifania Leo"

}, {
	"title": "Launch awesome, re-designed mobile app",
	"description": "Creating awesome web, mobile and UI designs and concepts",
	"category": "Expertise",
	"creator": "Nam Beaudin"

}, {
	"title": "Implement a new user-testing process",
	"description": "Evaluates the usability, functionality, user experience, and design of mobile app",
	"category": "Knowledge",
	"creator": "Luana Hack"

}, {
	"title": "Accelerate recurring revenue growth this quarter",
	"description": "Recurring software revenue 70% of total non-IFRS software revenue",
	"category": "Projects",
	"creator": "Son Gossage"

}];*/


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    //  data: objectives,
      active: 0,
      term: '',
      editing: false
    }

    this.updateData= this.updateData.bind(this);
    this.removeData= this.removeData.bind(this);
    this.editData= this.editData.bind(this);
    this.editingDone= this.editingDone.bind(this);
    this.editingChange= this.editingChange.bind(this);
  }
	
	updateData(config) {
		this.setState(config);
	}

	removeData(event, item) {

		if(confirm('Are you sure you want to delete this item?')) {

			console.log(item)

            let index = this.state.data.indexOf(item);
            let objectiveList = this.state.data.slice();
            objectiveList.splice(index, 1);

            this.setState({data: objectiveList})
        }		
	}

	editData (event) {
		this.setState({editing: true})
	}

	editingDone(event) {
		if (event.keyCode === 13) {
			this.setState({editing: false});
		}
	}

	editingChange (event) {
		let _changedText = event.target.value;
		this.setState({changedText:_changedText})
	}


render() {

    return (

    	<CentralWindow>

			<div className="OKR-managing app container">

				<div className="OKR-managing fixed-header">
					<div className="OKR-managing search">
							<Searchbar
							/*term={this.state.term}
							data={objectives}
							update={this.updateData}*/
							/>
						</div>

						<div className="OKR-managing toolbar">
							<Toolbar 
								/*data={objectives} 
								objectives={objectives} 
								update={this.updateData}*/ />
						</div>
				</div>			

				<div className="OKR-mnaging active objective">
					<ActiveObjective 
						/*data={objectives} 
						active={this.state.active}
						edit={this.editData}
						editing={this.state.editing}
						remove={this.removeData} */
					/>
				</div>

				<div className="OKR-managing objective-list">
					<ObjectiveList 
					//	data={this.props.objectivesList.objectives} 
						
					/>
					{/*update={this.updateData}
						edit={this.editData}
						editingDone={this.editingDone}
						editingChange ={this.editingChange} 
						remove={this.removeData} 
						editing={this.state.editing} */}
				</div>

			</div>
		</CentralWindow>

    );
  }
}

export default App
