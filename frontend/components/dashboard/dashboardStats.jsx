import React from 'react';
import axios from 'axios';

export default class DashboardStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rows: [] };
    }

    renderHeader(column) {
        return (
            <th>{column}</th>
        )
    }
    renderRow(row) {
        return (
            <tr><td>{row.user}</td><td>{row.totalScore * 100 + '%'}</td></tr>
        )
    }

    componentDidMount() {
        axios.get(this.props.url)
            .then(response => { this.setState({ rows: response.data }); });
    }

    render() {
        return (

            <div className="main">
                <div className="countInfo">
                    <p><b>{this.props.count}</b> {this.props.counterName}</p>
                </div>
                <div className="tableInfo">
                    <table>
                        <caption>{this.props.caption}</caption>
                        {this.props.columns.map(this.renderHeader) }
                        {this.state.rows.map(this.renderRow) }
                    </table>
                </div>
            </div>
        )
    }
}