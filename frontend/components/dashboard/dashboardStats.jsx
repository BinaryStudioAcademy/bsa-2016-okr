import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import * as actions from "../../actions/userDashboardActions";

import ProgressBar from './progressBar.jsx';
import './progressBar.scss';

class DashboardStats extends Component {
	constructor(props) {
		super(props);
		this.handleUserClick = this.handleUserClick.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.getProgressBar = this.getProgressBar.bind(this);
	}

	handleUserClick (classname) {
		for (let i = 1; i < 5; i++) {
			let quarter = document.getElementsByClassName(parseInt(classname) + i)
			
			if(quarter[0].className.indexOf('hidden') != -1) {
				quarter[0].className =  quarter[0].className.substring(0, quarter[0].className.indexOf('hidden'));
			}	else {
				quarter[0].className = quarter[0].className + 'hidden'
			}
		}
	}

	renderRow(row, i) {
		if(row.userInfo || row.name) {
				if(row.name) {
					return(
						<tr key={i} className={`quarter-score ${i} hidden `}>
							<td> { `${ row.name }` }</td>
							<td className="score">{ Math.round(row.totalScore * 100) + '%' }</td>
						</tr>)
				}	else {
					return (
						<tr key={i} className={`quarter-score ${i} hidden `}>
							<td> { `${ row.name }` }</td>
							<td className="score">{ Math.round(row.totalScore * 100) + '%' }</td>
						</tr>
					);
				}
			}	else {
				return (
					<tr key={i} onClick={() => { this.handleUserClick(i) }}>
						<td  className="pointer"> { `${ row.userInfo.firstName } ${ row.userInfo.lastName }` } </td>
						<td className="score"> { Math.round(row.totalScore * 100) + '%' } </td>
					</tr>
				);
			}
		}
	}

	getProgressBar () {
		let score;
		let { where } = this.props;
		
		if(where == undefined) {
			score = Math.round(this.props.userDashboard.totalScore.progress * 100);
			
			return (
				<div className="countInfo" id="parent">
					<p><span>Average progress by all users</span></p>
					<div className="progressBar">
						<ProgressBar 
							strokeWidth="10" 
							radius="80" 
							percentage={ score }/>
					</div>
				</div>
			);
		}	else {
			let selectedYear;
			score = Math.round(this.props.userDashboard.userStats.totalScore * 100);

			if(where === "otherPersonPage") {
				({ selectedYear } = this.props.userPage);
			} else {
				({ selectedYear } = this.props.myState);
			}

			return (
				<div className="countInfo" id="parent">
					<p><span>{`Your progress in ${selectedYear} year`}</span></p>
					<div className="progressBar">
						<ProgressBar  strokeWidth="10" radius="80" percentage={ score }/>
					</div>
				</div>
			);
		}
	}

	render() {
		let scores = [];
		let obj;
		let tbody;
		
		this.props.userDashboard.topUsersList.forEach((item, index) => {
			let name;

			if(item.userInfo) {
				scores.push(item);
				
				name = '1-st quarter';
				obj = {name, totalScore:item[1]};
				scores.push(obj);
	
				name = '2-nd quarter';
				obj = {name, totalScore:item[2]};
				scores.push(obj);
	
				name = '3-rd quarter';
				obj = {name, totalScore:item[3]};
				scores.push(obj);
	
				name = '4-th quarter';
				obj = {name, totalScore:item[4]};
				scores.push(obj);
			}
		});
		
		if(!this.props.userDashboard.userStats.inTop && this.props.userDashboard.userStats.userInfo) {
			tbody = (
				<tbody>
					<tr><td className="dots">● ● ●</td><td className="score">● ● ●</td></tr>
					<tr onClick={() => {this.handleUserClick(-5)}}>
						<td className="pointer bold">{ `${ this.props.userDashboard.userStats.userInfo.firstName } ${ this.props.userDashboard.userStats.userInfo.lastName }` }</td>
						<td className="score bold">{ Math.round(this.props.userDashboard.userStats.totalScore * 100) + '%' }</td>
					</tr>
					<tr className={`quarter-score -4 hidden `}>
						<td>1-st quarter</td>
						<td className="score">{ Math.round(this.props.userDashboard.userStats[1] * 100) + '%' }</td>
					</tr>
					<tr className={`quarter-score -3 hidden `}>
						<td>2-nd quarter</td>
						<td className="score">{ Math.round(this.props.userDashboard.userStats[2] * 100) + '%' }</td>
					</tr>
					<tr className={`quarter-score -2 hidden `}>
						<td>3-rd quarter</td>
						<td className="score">{ Math.round(this.props.userDashboard.userStats[3] * 100) + '%' }</td>
					</tr>
					<tr className={`quarter-score -1 hidden `}>
						<td>4-th quarter</td>
						<td className="score">{ Math.round(this.props.userDashboard.userStats[4] * 100) + '%' }</td>
					</tr>
					<tr><td className="dots">● ● ●</td><td className="score">● ● ●</td></tr>
					<tr><td>Lowest result</td><td className="score">{ Math.round(this.props.userDashboard.bottomStats.totalScore * 100) + '%' }</td></tr>
				</tbody>
			);
		}	else {
			tbody = (
				<tbody>
					<tr><td className="dots">● ● ●</td><td className="score">● ● ●</td></tr>
					<tr><td>Lowest result</td><td className="score">{ Math.round(this.props.userDashboard.bottomStats.totalScore * 100) + '%' }</td></tr>
				</tbody>
			);
>>>>>>> auth
		}

		return (
			<div className="main">
				{ this.getProgressBar() }
				<div className="tableInfo">
					<div><p><span>Top 5 Users by performance</span></p></div>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Completed</th>
							</tr>
						</thead>
						<tbody>
							{ scores.map(this.renderRow) }
						</tbody>
					</table>
					<table className="second">
						{ tbody }
					</table>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userDashboard: state.userDashboard,
		myState: state.myState,
		userPage: state.userPage,
	};
}

const DashboardStatsConnected = connect(mapStateToProps)(DashboardStats);

export default DashboardStatsConnected;
