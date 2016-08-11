import React from 'react';

export default class DashboardStats extends React.Component {
    constructor(props) {
        super(props);
    }

    renderHeader(column) {
        return (
            <th>{column}</th>
        )
    }
    renderRow(row) {
        var renderCell = (cell) => {
            return (
                <td>{cell}</td>
            )
        }
        return (
            <tr>{row.map(renderCell) }</tr>
        )
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
                        {this.props.rows.map(this.renderRow) }
                    </table>
                </div>
            </div>
        )
    }
}