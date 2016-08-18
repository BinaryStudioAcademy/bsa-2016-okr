import React from 'react'
import ReactList from 'react-list';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/historyActions";

import axios from 'axios';

import './history-item-list.scss';
import '../../common/styles/table.scss';

class HistoryItemList extends React.Component {
    constructor(props) {
        super(props);

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
		let item = this.props.historyItems[index];
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
		historyItems: state.history.historyItems
	};
}

const HistoryItemListConnected = connect(mapStateToProps, mapDispatchToProps)(HistoryItemList);
export default HistoryItemListConnected