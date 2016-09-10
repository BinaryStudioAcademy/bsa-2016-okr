import React from 'react'
import StatPanel from '../../../containers/statistic-panel.jsx';
import Dashboard from "../../dashboard/dashboard.jsx";
import CentralWindow from "../../../containers/central-window.jsx";
// import HistoryItem from './history-item'
import HistoryItemList from './history-item-list';
// import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search';
import HistoryFilter from './history-filter';
import HistorySort from './history-sort';
import './history-page.scss'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/historyActions";

class HistoryPage extends React.Component {
   constructor(props) {
      super(props);
      this.filterButtonState = this.filterButtonState.bind(this);
      this.handleFilterButton = this.handleFilterButton.bind(this);
      this.handleFilterShow = this.handleFilterShow.bind(this);
   }

   handleFilterShow(event){
      handler_filter_click.call(this, event);
   }

   filterButtonState(show) {
      if (show) {
         return 'active-button'
      } else {
         return ''
      }
   }

   handleFilterButton() {
      let show = this.props.history.showHistoryFilters;
      this.props.showFilters(!show);
   }

   render() {
      return (
         <div>
            <CentralWindow fullScreen={ true }>
               <div className="history-page">
                  <div id="top-panel">
                     {/*historyItems: {console.log(this.props.historyItems)}*/}
                     <div className="history-page-header">
                           <div className="history-page-title">
                              <p><span>History</span></p>
                           </div>
                        <button className="btn btn-blue" onClick={this.handleFilterShow}>
                           <i className="fi flaticon-funnel"/>
                           &nbsp;Filter&nbsp;
                           <i className="fi-1 flaticon-1-arrow-down"/>
                        </button>
                        <div className="history-filter-container">
                           <div className="history-filter-bar-container">
                              <HistoryFilter/>
                           </div>

                        </div>
                     </div>
                  </div>
                  <HistoryItemList/>
               </div>
            </CentralWindow>
         </div>
      )
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
   return {
      history: state.history
   };
}

const HistoryPageConnected = connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
export default HistoryPageConnected

function handler_filter_click(event) {
   let   filter_container = document.querySelector('.history-filter-container'),
         button = document.querySelector('.history-page-header button');

   if(!filter_container.classList.contains('opened')){
      filter_container.classList.add('opened');
      button.classList.add('active');
   }
   else {
      filter_container.classList.remove('opened');
      button.classList.remove('active');
   }
}