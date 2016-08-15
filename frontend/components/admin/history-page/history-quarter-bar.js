import React from 'react'
import './history-quarter-bar.scss'

class HistoryQuarterBar extends React.Component {

    constructor() {
        super();
    }

    render() {

        return(
            <div className="history-quarter-bar">
                <div className="history-quarters-container">
                    <div className="history-quarter active">1-st quarter</div>
                    <div className="history-quarter">2-nd quarter</div>
                    <div className="history-quarter">3-rd quarter</div>
                    <div className="history-quarter">4-th quarter</div>
                </div>
            </div>
        )
    }
}

export default HistoryQuarterBar