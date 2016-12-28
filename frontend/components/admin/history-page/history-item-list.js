import React from 'react'
import ReactList from 'react-list';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from "../../../actions/historyActions";

import './history-item-list.scss';
import '../../common/styles/table.scss';

class HistoryItemList extends React.Component {
    constructor(props) {
        super(props);
        this.onSort = this.onSort.bind(this);
        this.restoreDefaultIcons = this.restoreDefaultIcons.bind(this);
    }

    getObjectId(item) {
        return item.keyId || item.commentId || item.categoryId || item.userId || item.objectiveId;
    }

    onSort(sort) {
        this.props.setSort(sort);
        this.props.getFilteredItems();

        this.restoreDefaultIcons()
        if(this.props.sort.up)
           document.getElementById(sort).className = "fa fa-sort-desc"
         else document.getElementById(sort).className = "fa fa-sort-asc";
    }

    restoreDefaultIcons ()  {
      document.getElementById('user').className = "fa fa-sort";
      document.getElementById('action').className = "fa fa-sort";
      document.getElementById('target').className = "fa fa-sort";
      document.getElementById('date').className = "fa fa-sort";
    }

    getHistoryType(item) {
      let object = item.type.slice(item.type.indexOf(' ') + 1);
      if(item.type.indexOf('ADD') != -1)
        return 'added';
      else if (item.type.indexOf('UPDATE') != -1)
        return 'updated';
      else if (item.type.indexOf('CHANGE') != -1) {
        if (item.type.indexOf('SCORE') != -1)
          return 'has changed score to ' + item.userKeyResultScore;
        else if (item.type.indexOf('TITLE') != -1)
          return 'has changed title to ' + item.userKeyResultTitle;
        else if (item.type.indexOf('DIFFICULTY') != -1)
          return 'has changed difficulty to ' + item.userKeyResultDifficulty;
      }
      else if (item.type.indexOf('DELETE') != -1)
        return 'deleted';
      else if (item.type.indexOf('RESTORE') != -1)
        return 'restored';
      else if (item.type.indexOf('TOOK_APPRENTICE') != -1)
        return 'took apprentice';
      else if (item.type.indexOf('REMOVED_APPRENTICE') != -1)
        return 'removed apprentice';
      else if (item.type.indexOf('UNARCHIVED') != -1)
         return 'unarchived';
      else if (item.type.indexOf('ARCHIVED') != -1)
         return 'archived'
    }

    getHistoryObjectName(historyItem){
      if(historyItem.type.indexOf('USER_OBJECTIVE') !== -1){
        return ` user objective \'${historyItem.userObjective.templateId.title}\'`;
      }

      else if(historyItem.type.indexOf('OBJECTIVE') !== -1){
        return `objective \'${historyItem.objective.title}\'`;
       }

      else if(historyItem.type.indexOf('KEY_RESULT') !== -1){
         let keyResult;
        if (historyItem.userObjective){
          let keyResults = historyItem.userObjective.keyResults;

          keyResults.forEach((key) => {
            if (key.templateId._id == historyItem.userKeyResult || key._id == historyItem.userKeyResult)
            keyResult = key;

          })
          return `key result \'${keyResult.templateId.title} \'`;

        }
        else {
          keyResult = historyItem.keyResult;
          return `key result \'${keyResult.title} \'`;
        }

    }
      else if(historyItem.type.indexOf('CATEGORY') !== -1){
        return `category \'${historyItem.category.title}\'`;
       }
      else if(historyItem.type.indexOf('USER') !== -1){
        return `user \'${historyItem.user.userInfo.firstName} ${historyItem.user.userInfo.lastName}\'`;
      };

  }

	renderItem(index, key) {
		let item = this.props.historyItems[index];
   		return(
   			<tr key={item._id}>
				<td className="user" data-th="User"><img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg" className="history-item-user-avatar"/>
                    <span className="author-name">{item.author.userInfo.firstName + " " +item.author.userInfo.lastName}</span>
                </td>
				<td className="action" data-th="Action">{this.getHistoryType(item)}</td>
				<td className="target" data-th="Object"><a className="black-text"href="#"> <i className="fi flaticon-file-1"></i></a><span className="grey-text">{this.getHistoryObjectName(item)}</span></td>
				<td className="date" data-th="Date"><span className="grey-text">{moment(item.createdAt).format('D MMMM YYYY, H:mm')}</span></td>
			</tr>)
  	}

  	renderItems(items, ref) {
  		return ( <tbody ref={ref}>{items}</tbody> )
  	}

    render() {
        return(
            <div className="history-item-list">
            	<table className="table" id="historyTable">
      					<thead>
      						<tr>
      							<th ><span className="table-th" onClick={() => this.onSort("user")}><i id="user" className="fa fa-sort"></i>User</span></th>
      							<th ><span className="table-th" onClick={() => this.onSort("action")}><i id="action" className="fa fa-sort"></i>Action</span></th>
      							<th ><span className="table-th" onClick={() => this.onSort("target")}><i id="target" className="fa fa-sort"></i>Target</span></th>
      							<th ><span className="table-th" onClick={() => this.onSort("date")}><i id="date" className="fa fa-sort"></i>Date</span></th>
      						</tr>
      					</thead>
                        <ReactList
                            itemRenderer={::this.renderItem}
                            itemsRenderer={::this.renderItems}
                            length={this.props.historyItems.length}
                            type='simple'
                            pageSize={10}
                        />
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
        sort: state.history.sort,
        sortBy: state.history.sortBy,
		keyResultItems: state.keyResults.keyResultItems
	};
}

const HistoryItemListConnected = connect(mapStateToProps, mapDispatchToProps)(HistoryItemList);
export default HistoryItemListConnected
