import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

export default class DashboardStats extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: [],
			score: {},
			bottom: {}
		};
	}

	renderRow(row, i) {
		return (
			<tr>
				<td>
					{ `${ row.userInfo.firstName } ${ row.userInfo.lastName }` }
					{/*<Link to={ `/user/${ row._id }` }>{ `${ row.userInfo.firstName } ${ row.userInfo.lastName }` }</Link>*/}
				</td>
				<td>
					{ Math.round(row.totalScore * 100) + '%' }
				</td>
			</tr>
			)
	}

	componentDidMount() {
		axios.get(this.props.urlUsers)
		.then(response => { this.setState({ rows: response.data }); });
		axios.get(this.props.urlProgress)
		.then(response => { this.setState({ score: response.data }); });
		axios.get(this.props.urlBottom)
		.then(response => { this.setState({ bottom: response.data[0] }); });
	}


	render() {
		return (
			<div className="main">
				<div className="countInfo">
					<p><span><b>{Math.round(this.state.score.progress * 100) + '%'}</b> Medium progress by all users</span></p>
				</div>
				<div className="tableInfo">
					<table>
						<caption><p><span>Top 5 Users by performance</span></p></caption>
						<th>Name</th><th>Completed</th>
						{ this.state.rows.map(this.renderRow) }
					</table>
					<table className="second">
						<tr><td>...</td><td>...</td></tr>
						<tr><td>Lowest result</td><td>{ Math.round(this.state.bottom.totalScore * 100) + '%' }</td></tr>
					</table>
				</div>
			</div>
			)
	}
}