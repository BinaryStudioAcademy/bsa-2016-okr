import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router';
import ProgressBar from './progressBar.jsx';
import './progressBar.scss';

import cookie from 'react-cookie';

const session = cookie.load('user-id');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../actions/userDashboardActions";

class DashboardStats extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score: {}
		};
		this.handleUserClick = this.handleUserClick.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.getProgressBar = this.getProgressBar.bind(this);
	}

	handleUserClick (classname) {
		for (let i = 1; i < 5; i++){
			let quarter = document.getElementsByClassName(parseInt(classname)+i)
			if(quarter[0].className.indexOf('hidden') != -1)
				quarter[0].className =  quarter[0].className.substring(0, quarter[0].className.indexOf('hidden'));
			else
				quarter[0].className = quarter[0].className + "hidden"
		}
	}

	renderRow(row, i) {
		if(row.userInfo){
				if(row.name){
					return(
						<tr key={i} className={`quarter-score ${i} hidden `}>
							<td> { `${ row.name }` }</td>
							<td className="score">{ Math.round(row.totalScore * 100) + '%' }</td>
						</tr>)
				}
				else
				return (
					<tr key={i} onClick={() => {this.handleUserClick(i)}}>
						<td  className="pointer"> { `${ row.userInfo.firstName } ${ row.userInfo.lastName }` } </td>
						<td className="score"> { Math.round(row.totalScore * 100) + '%' } </td>
					</tr>
					)
		}
	}

	getProgressBar () {
		if(this.props.where == undefined) {
			return (
				<div className="countInfo" id="parent">
					<p><span>Average progress by all users</span></p>
					<div className="progressBar">
						<ProgressBar  strokeWidth="10" radius="80" percentage={Math.round(this.state.score.progress * 100)}/>
					</div>
				</div>)
		}
		else {

			let score = Math.round(this.props.userDashboard.userStats.totalScore * 100);
			if(this.props.where === "otherPersonPage")
				var year = this.props.userPage.selectedYear;
			else
				var year = this.props.myState.selectedYear;
			return (
				<div className="countInfo" id="parent">
					<p><span>{`Your progress in ${year} year`}</span></p>
					<div className="progressBar">
						<ProgressBar  strokeWidth="10" radius="80" percentage={score}/>
					</div>
				</div>)
		}
	}


	componentWillMount() {

		this.props.getStats(this.props.where);
		axios.get(this.props.urlProgress)
		.then(response => { this.setState({ score: response.data }); });
	}


	render() {
		var scores = [];
		var obj;
		this.props.userDashboard.topUsersList.forEach( (item) => {
			let name;

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
		})
		console.log(this.props.userDashboard)
		if(!this.props.userDashboard.userStats.inTop && this.props.userDashboard.userStats.userInfo ){
				var userRow = (<tbody>
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
								</tbody>)
		}
		else {
				var userRow = (<tbody>
						<tr><td className="dots">● ● ●</td><td className="score">● ● ●</td></tr>
						<tr><td>Lowest result</td><td className="score">{ Math.round(this.props.userDashboard.bottomStats.totalScore * 100) + '%' }</td></tr>
						</tbody>)
		}


		return (
			<div className="main">
				{this.getProgressBar()}
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
						{userRow}
					</table>
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
        userDashboard: state.userDashboard,
        myState: state.myState,
        userPage: state.userPage
    };
}

const DashboardStatsConnected = connect(mapStateToProps, mapDispatchToProps)(DashboardStats);

export default DashboardStatsConnected;
