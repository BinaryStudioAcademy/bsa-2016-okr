import React from 'react';
import axios from 'axios';

export default class DashboardStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            score: {}
        };
    }

    renderRow(row) {
        return (
            <tr><td>{row.user}</td><td>{Math.round(row.totalScore * 100) + '%'}</td></tr>
        )
    }

    componentDidMount() {
        axios.get(this.props.urlUsers)
            .then(response => { this.setState({ rows: response.data }); });
        axios.get(this.props.urlProgress)
            .then(response => { this.setState({ score: response.data }); })
    }


    render() {
        return (

            <div className="main">
                <div className="countInfo">
                    <p><b>{Math.round(this.state.score.progress*100)+'%'}</b> Medium progress by all users</p>
                </div>
                <div className="tableInfo">
                    <table>
                        <caption>Top 5 Users by performance</caption>
                        <th>Name</th><th>Completed</th>
                        {this.state.rows.map(this.renderRow) }
                    </table>
                </div>
            </div>
        )
    }
}