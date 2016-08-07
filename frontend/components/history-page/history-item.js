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
                        <img className="history-item-user-avatar" src="http://vignette1.wikia.nocookie.net/legomessageboards/images/9/91/Avatar-placeholder.png/revision/latest?cb=20150616201536"/>
                    </div>
                    <div className="history-item-info">
                        <div className="history-item-author">AuthorId: {this.state.item.authorId}</div>
                        <div>TypeId: {this.state.item.typeId}</div>
                        <div>Type: {this.state.item.type}</div>
                    </div>
                    <div className="history-item-date">
                        <div className="history-item-date-icon-container">
                            <img className="history-item-date-icon" src="https://cdn0.iconfinder.com/data/icons/feather/96/clock-128.png"/>
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