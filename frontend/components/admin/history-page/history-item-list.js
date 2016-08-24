import React from 'react'
import ReactList from 'react-list';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/historyActions";

import axios from 'axios';

import './history-item-list.scss';
import '../../common/styles/table.scss';

class HistoryItemList extends React.Component {
    constructor(props) {
        super(props);
        this.onSort = this.onSort.bind(this);
        this.getActionColor = this.getActionColor.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    getObjectId(item) {
        return item.keyId || item.commentId || item.categoryId || item.userId || item.objectiveId;
    }

    componentWillMount() {
        this.props.getHistoryItems();
        console.log(this.props.historyItems);
    }

    componentWillUnmount(){
    	this.props.clearState();
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

    onSort(sort) {
        this.props.setSort(sort);
        this.props.getFilteredItems();
    }

	renderItem(index, key) {
		let item = this.props.historyItems[index];
   		return(
   			<tr key={item._id}>
				<td><img className="history-item-user-avatar"/>{item.authorId}</td>
				<td>{item.type}</td>
				<td><a className="black-text"href="#"> <i className="fi flaticon-file-1"></i></a><span className="grey-text">{this.getObjectId(item)}</span></td>
				<td className="grey-text">{moment(item.createdAt).format('D MMMM YYYY, H:mm')}</td>
			</tr>)
  	}

  	renderItems(items, ref) {
  		return ( <tr className="no-hover"ref={ref}>{items}</tr> )
  	}

    render() {
        return(
            <div className="history-item-list">
            	<table className="table" id="historyTable">
					<thead>
						<tr>
							<th ><i onClick={() => this.onSort("user")} className="fa fa-sort"></i>User</th>
							<th ><i onClick={() => this.onSort("action")} className="fa fa-sort"></i>Action</th>
							<th ><i onClick={() => this.onSort("object")} className="fa fa-sort"></i>Object</th>
							<th ><i onClick={() => this.onSort("date")} className="fa fa-sort"></i>Date</th>
						</tr>
					</thead>
					<tbody>
	               		<ReactList
							itemRenderer={::this.renderItem}
							itemsRenderer={::this.renderItems}
							length={this.props.historyItems.length}
							type='simple'
							pageSize={10}
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
		historyItems: state.history.historyItems,
        sortBy: state.history.sortBy,
		keyResultItems: state.keyResults.keyResultItems
	};
}

const HistoryItemListConnected = connect(mapStateToProps, mapDispatchToProps)(HistoryItemList);
export default HistoryItemListConnected