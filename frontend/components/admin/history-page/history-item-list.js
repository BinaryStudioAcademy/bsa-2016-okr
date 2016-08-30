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
        //this.getHistoryObjectName = this.getHistoryObjectName.bind(this);
       // this.componentWillMount = this.componentWillMount.bind(this)
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

    onSort(sort) {
        this.props.setSort(sort);
        this.props.getFilteredItems();
    }

    getHistoryType(item) {
      let object = item.type.slice(item.type.indexOf(' ') + 1);
      if(item.type.indexOf('ADD') != -1)
        return 'added';
      else if (item.type.indexOf('UPDATE') != -1)
        return 'updated'
      else if (item.type.indexOf('CHANGE') != -1)
        return 'has changed scrore to ' + item.userKeyResultScore;
      else if (item.type.indexOf('DELETE') != -1)
        return 'deleted';
    }

    getHistoryObjectName(historyItem){
      console.log(historyItem);
      if(historyItem.type.indexOf('USER_OBJECTIVE') !== -1){
        return ` user objective \'${historyItem.userObjective.templateId.title}\'`;
      };

      if(historyItem.type.indexOf('OBJECTIVE') !== -1){
        return `objective \'${historyItem.objective.title}\'`;
       };

      if(historyItem.type.indexOf('KEY_RESULT') !== -1){
        let keyResults = historyItem.userObjective.keyResults;
        let keyResult;
        keyResults.forEach((key) => {
          if (key.templateId._id == historyItem.userKeyResult || key._id == historyItem.userKeyResult)
          keyResult = key;
        })
      return `key result \'${keyResult.templateId.title} \'`;
    }
  }

	renderItem(index, key) {
		let item = this.props.historyItems[index];
   		return(
   			<tr key={item._id}>
				<td><img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="history-item-user-avatar"/>
          <span className="author-name">{item.author.userInfo.firstName} {item.author.userInfo.lastName}</span>
        </td>
				<td>{this.getHistoryType(item)}</td>
				<td><a className="black-text"href="#"> <i className="fi flaticon-file-1"></i></a><span className="grey-text">{this.getHistoryObjectName(item)}</span></td>
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
							<th ><i onClick={() => this.onSort("target")} className="fa fa-sort"></i>Target</th>
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