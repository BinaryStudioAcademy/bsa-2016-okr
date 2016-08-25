import React from 'react';
import './tabs.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/userDashboardActions.js";

class Tabs extends React.Component{
	constructor(props){
		super(props);

		this.handleTabClick = this.handleTabClick.bind(this);
		this.handleTopClick = this.handleTopClick.bind(this);
		this.renderTopTabs= this.renderTopTabs.bind(this);
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

	isVisibleTab() {
		if(this.props.userDashboard.showTopTabs)
			return "showTab"
		return "hideTab"
	}

	renderTopTabs() {
		console.log(this.props.userDashboard.showTopTabs)
		if(this.props.userDashboard.showTopTabs)
		{
			return (
				<ul className="tabLine">
					<li className="tab" onClick={()=>this.handleTabClick(2)}>Users</li>
					<li className="tab" onClick={()=>this.handleTabClick(3)}>Objectives</li>
					<li className="tab" onClick={()=>this.handleTabClick(4)}>Key Results</li>
				</ul>
			)
		}
		else return;
	}

	render() {

		return (
			<div className="dashboard-tabs">
				<ul className="tabLine mainTabs">
					<li className="tab" onClick={()=>this.handleTabClick(1)}>History</li>
					<li className="tab" onClick={()=>this.handleTopClick()}>Top</li>
				</ul>

				<ul className={this.isVisibleTab() + " tabLine"}>
					<li className="tab" onClick={()=>this.handleTabClick(2)}>Users</li>
					<li className="tab" onClick={()=>this.handleTabClick(3)}>Objectives</li>
					<li className="tab" onClick={()=>this.handleTabClick(4)}>Key Results</li>
				</ul>
				
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