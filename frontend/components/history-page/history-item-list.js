import React from 'react'
import './history-item-list.scss'
import HistoryItem from './history-item'

class HistoryItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            its: this.props.historyItems
        }
        this.getActionColor = this.getActionColor.bind(this);
    }

    getActionColor(actionType) {
        switch(actionType) {
            case 'create': 
                return 'actionCreate'
                break;
            case 'update': 
                return 'actionUpdate'
                break;
            case 'delete': 
                return 'actionDelete'
                break;
            default: 
                return 'actionDefault'
                break;
        }
    }

    render() {

        return(
            <div className="history-item-list">
            	<table>
                    <tbody>
            		<tr>
            			<th>User</th>
            			<th>Action</th>
            			<th>Object</th>
            			<th>Created at</th>
            			<th>Updated at</th>
            		</tr>
	                {
	                	this.state.its.map((function(item, i) {
	                		return(<tr key={item._id}>
	                			<td>
                                    <img className="history-item-user-avatar" src="https://pp.vk.me/c633829/v633829341/4566f/o8DWh-yGR5U.jpg"/> {item.authorId}
                                </td>
								<td className={this.getActionColor(item.type)}>{item.type}</td>
								<td><a href="#">{item.typeId}</a></td>
								<td>{item.createdAt}</td>
								<td>{item.updatedAt}</td>
								</tr>)
	                	}).bind(this))
					}
                    </tbody>
				</table>	
            </div>
        )
    }
}

export default HistoryItemList