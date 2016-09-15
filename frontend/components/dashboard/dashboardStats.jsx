import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router';
import ProgressBar from './progressBar.jsx';
import './progressBar.scss';

import cookie from 'react-cookie';

const session = cookie.load('user-id');


export default class DashboardStats extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: [],
			score: {},
			user: {
				userInfo: ""
			},
			bottom: {}
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
			// let score = 0;
			// if(this.state.user == null){
			// 	console.log(this.state);
			// 	this.state.rows.forEach(( elem) => {
			// 		console.log('-------------')
			// 		console.log(elem.userInfo._id)
			// 		console.log(session._id)
			// 		if(elem.userInfo._id == session._id)
			// 			score = Math.round(elem.totalScore * 100);
			// 	})
			// }
			// else
			let score = Math.round(this.state.user.totalScore * 100);

			return (
				<div className="countInfo" id="parent">
					<p><span>Your progress in current year</span></p>
					<div className="progressBar">
						<ProgressBar  strokeWidth="10" radius="80" percentage={score}/>
					</div>
				</div>)
		}
	}


	componentWillMount() {
		axios.get(this.props.urlUsers)
		.then( response => {
			this.setState({
				rows:response.data.statArr,
				bottom: response.data.bottomStats,
				user: response.data.userStats
			})
		})
		// axios.get(this.props.urlUsers)
		// .then(response => { this.setState({ rows: response.data }); });
		axios.get(this.props.urlProgress)
		.then(response => { this.setState({ score: response.data }); });
		// axios.get(this.props.urlBottom)
		// .then(response => { this.setState({ bottom: response.data[0] }); });
	}


	render() {
		var scores = [];
		var obj;
		this.state.rows.forEach( (item) => {
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
		// let isUserInTop = this.state.rows.find((elem)=> {
		// 	if(elem.userInfo._id === this.state.user._id)
		// 		return true
		// 	else return false;
		// })
		if(!this.state.user.inTop ){
				var userRow = (<tbody>
									<tr><td className="dots">● ● ●</td><td className="score">● ● ●</td></tr>
									<tr onClick={() => {this.handleUserClick(-5)}}>
										<td  className="pointer">{ `${ this.state.user.userInfo.firstName } ${ this.state.user.userInfo.lastName }` }</td>
										<td className="score">{ Math.round(this.state.user.totalScore * 100) + '%' }</td>
									</tr>
									<tr className={`quarter-score -4 hidden `}>
										<td>1-st quarter</td>
										<td className="score">{ Math.round(this.state.user[1] * 100) + '%' }</td>
									</tr>
									<tr className={`quarter-score -3 hidden `}>
										<td>2-nd quarter</td>
										<td className="score">{ Math.round(this.state.user[2] * 100) + '%' }</td>
									</tr>
									<tr className={`quarter-score -2 hidden `}>
										<td>3-rd quarter</td>
										<td className="score">{ Math.round(this.state.user[3] * 100) + '%' }</td>
									</tr>
									<tr className={`quarter-score -1 hidden `}>
										<td>4-th quarter</td>
										<td className="score">{ Math.round(this.state.user[4] * 100) + '%' }</td>
									</tr>
									<tr><td className="dots">● ● ●</td><td className="score">● ● ●</td></tr>
									<tr><td>Lowest result</td><td className="score">{ Math.round(this.state.bottom.totalScore * 100) + '%' }</td></tr>
								</tbody>)
		}
		else {
				var userRow = (<tbody>
						<tr><td className="dots">● ● ●</td><td className="score">● ● ●</td></tr>
						<tr><td>Lowest result</td><td className="score">{ Math.round(this.state.bottom.totalScore * 100) + '%' }</td></tr>
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
