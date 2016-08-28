import React from 'react';
import './tabs.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/userDashboardActions.js";

class Tabs extends React.Component{
	constructor(props){
		super(props);

		this.handleTabClick = this.handleTabClick.bind(this);
		this.handleTopClick = this.handleTopClick.bind(this);
		this.isVisibleTab = this.isVisibleTab.bind(this);
	}

	handleTabClick(index) {
		if(index === 1 && this.props.userDashboard.showTopTabs) 
			this.props.changeShowTopTabs();
		this.props.setTab(index);
	}

	handleTopClick() {
		this.handleTabClick(5);
		this.props.changeShowTopTabs();
	}

	activeTab(index){
		if(index === this.props.userDashboard.tabIndex)
			return "active"
		else return ""
	}

	isVisibleTab() {
		if(this.props.userDashboard.showTopTabs)
			return "showTab"
		return "hideTab"
	}

	
	render() {

		return (
			<div className="dashboard-tabs">
				<div className="tab-wrapper mainTabs">
					<ul className="tabLine">
						<li className={this.activeTab(1)+" tab"} onClick={()=>this.handleTabClick(1)}>History</li>
						<li className={this.activeTab(2)+" tab"} onClick={()=>this.handleTabClick(2)}>Statistic</li>
					</ul>
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
		userDashboard: state.userDashboard
	};
}

const TabsConnected = connect(mapStateToProps, mapDispatchToProps)(Tabs);

export default TabsConnected;