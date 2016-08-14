import React from 'react'

import './history-item-list.scss'
import  '../../common/styles/commonStyles.scss'

import historyMock from '../../../components/mockData/historyPageMock.js'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/historyActions";

class HistoryItemList extends React.Component {

    constructor() {
        super();
		this.historyItems = historyMock;
		// console.log(this.historyItems);
        this.getActionColor = this.getActionColor.bind(this);
		this.displayList = this.displayList.bind(this);
    }

    getActionColor(actionType) {
        switch(actionType) {
            case 'create': 
                return 'actionCreate';
                break;
            case 'update': 
                return 'actionUpdate';
                break;
            case 'delete': 
                return 'actionDelete';
                break;
            default: 
                return 'actionDefault';
                break;
        }
    }

	displayList(item, i) {
		return(<tr key={item._id}>
			<td>
				<img className="history-item-user-avatar" src="https://pp.vk.me/c633829/v633829341/4566f/o8DWh-yGR5U.jpg"/> {item.authorId}
			</td>
			<td className={this.getActionColor(item.type)}>{item.type}</td>
			<td><a href="#">{item.typeId}</a></td>
			<td>{item.createdAt}</td>
		</tr>)
	}

    render() {

        return(
            <div className="history-item-list">
            	<table className="table">
                    <tbody>
            		<tr>
            			<th>User</th>
            			<th>Action</th>
            			<th>Object</th>
            			<th>Date</th>
            		</tr>
	                {
	                	this.historyItems.map(this.displayList)
					}
                    </tbody>
				</table>	
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		historyItems: state.historyItems
	};
}

const HistoryItemListConnected = connect(mapStateToProps, mapDispatchToProps)(HistoryItemList);
export default HistoryItemListConnected