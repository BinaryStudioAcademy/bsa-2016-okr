import React from 'react'
import './history-item-list.scss'
import HistoryItem from './history-item'

class HistoryItemList extends React.Component {

    constructor(props) {
        super(props);
        console.log('history-item-list hello');
        this.state = {
            its: this.props.historyItems
        }
    }

    render() {

        return(
            <div className="history-item-list">
            	<table>
            		<tr>
            			<th>User</th>
            			<th>Type of action</th>
            			<th>Object</th>
            			<th>Created at</th>
            			<th>Updated at</th>
            		</tr>
	                {
	                	this.state.its.map(function(item, i) {
	                		return(<tr id={i}>
	                			<td>{item.authorId}</td>
								<td>{item.type}</td>
								<td>{item.typeId}</td>
								<td>{item.createdAt}</td>
								<td>{item.updatedAt}</td>
								</tr>)
	                	})
					}
				</table>	
            </div>
        )
    }
}

export default HistoryItemList