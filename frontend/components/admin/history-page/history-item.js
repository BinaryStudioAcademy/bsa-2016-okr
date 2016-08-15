import React from 'react'
import './history-item.scss'

class HistoryItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        }
    }

    render() {

        return(
            <div className="history-item">
                <div className="history-item-user-avatar-container">
                    <img className="history-item-user-avatar" src="https://pp.vk.me/c633829/v633829341/4566f/o8DWh-yGR5U.jpg"/>
                </div>
                <div className="history-item-info">
                    <div className="history-item-author">AuthorId: {this.state.item.authorId}</div>
                    <div>TypeId: {this.state.item.typeId}</div>
                    <div>Type: {this.state.item.type}</div>
                </div>
                <div className="history-item-date">
                    <div className="history-item-date-icon-container">
                        <i className="fa fa-clock-o fa-2x" aria-hidden="true"/>
                    </div>
                    <div className="history-item-date-info">
                        {this.state.item.date}
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoryItem