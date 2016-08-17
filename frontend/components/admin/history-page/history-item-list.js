import React from 'react'
import ReactList from 'react-list';
import './history-item-list.scss'
import '../../common/styles/table.scss'
import $ from 'jquery';
//import historyMock from '../../../components/mockData/historyPageMock.js'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/historyActions";

class HistoryItemList extends React.Component {

	state ={
		historyItems: []
	}
    constructor() {
        super();
		//this.historyItems = [];
		// console.log(this.historyItems);
        this.getActionColor = this.getActionColor.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
		//this.displayList = this.displayList.bind(this);
		this.url = '/api/history';
    }

    getHistoryItems() {
    	$.ajax({
    		url: this.url,
    		dataType: 'json',
    		type: 'GET',
    		cache: false,
    		success: function(historyItems){
    			this.setState({historyItems});
    		}.bind(this),
    		error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
    	});
    }

    getObjectId(item) {
        return item.keyId || item.commentId || item.categoryId || item.userId || item.objectiveId;
    }
    componentWillMount() {
    	this.getHistoryItems.call(this);
    	//this.forceUpdate.call(this)
    }

    getActionColor(actionType) {
        switch(actionType.split(' ')[0]) {
            case 'add': 
                return 'actionCreate';
                break;
            case 'update': 
                return 'actionUpdate';
                break;
            case 'change': 
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

	renderItem(index, key) {
		let item = this.state.historyItems[index];
   		return(
   			<tr key={item._id}>
				<td><img className="history-item-user-avatar"/>{item.authorId}</td>
				<td className={this.getActionColor(item.type)}>{item.type}</td>
				<td><a href="#">{this.getObjectId(item)}</a></td>
				<td>{item.createdAt}</td>
			</tr>)
  	}

  	renderItems(items, ref) {
  		return ( <tr ref={ref}>{items}</tr> )
  	}

    render() {
        return(
            <div className="history-item-list">
            	<table className="table" id="historyTable">
					<thead>
						<tr>
							<th>User</th>
							<th>Action</th>
							<th>Object</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
	               		<ReactList
							itemRenderer={::this.renderItem}
							itemsRenderer={::this.renderItems}
							length={this.state.historyItems.length}
							type='simple'
							pageSize={20}
						/>
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