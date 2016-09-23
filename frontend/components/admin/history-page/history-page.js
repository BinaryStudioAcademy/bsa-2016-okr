import React from 'react'
import StatPanel from '../../../containers/statistic-panel.jsx';
// import Dashboard from "../../dashboard/dashboard.jsx";
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
      this.incrementHistoryLimit = this.incrementHistoryLimit.bind(this);
      this.scroller = this.scroller.bind(this);
   }

   handleFilterShow(event){
      let filter = document.querySelector("button.btn.btn-blue");
      filter.blur();
      handler_filter_click.call(this, event);
      this.handleFilterButton();
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

   scroller(e) {
     if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
       if (this.props.history.limit <= this.props.history.historyItems.length) {
         this.incrementHistoryLimit();
       }
     }
   }

   componentDidMount() {
     var scrollContainer = document.getElementById("central-window");
     scrollContainer.addEventListener('scroll', this.scroller);
   }

   componentWillUnmount() {
     var scrollContainer = document.getElementById("central-window");
     scrollContainer.removeEventListener('scroll', this.scroller);
   }

   render() {

       // if (this.props.history.historyItems.length === 0) {

       //    return (

       //       <div>
       //          <CentralWindow fullScreen={ true }>
       //           <div className="history-page">
       //              <div id="top-panel">
       //                   <div className="history-page-header">
       //                         <div className="history-page-title">
       //                            <p><span>History</span></p>
       //                         </div>
       //                   </div>
       //                </div>

       //                <h1 className="placeholder">History is empty!</h1>

       //             </div>
       //          </CentralWindow>
       //       </div>
       //    );
       // }
      let showFilters = this.props.history.showHistoryFilters;
      return (
         <div>
            <CentralWindow fullScreen={ true }>
               <div className="history-page">
                  <div id="top-panel">
                     <div className="history-page-header">
                           <div className="history-page-title">
                              <p><span>History</span></p>
                           </div>
                        <button className="btn btn-blue" onClick={this.handleFilterShow}>
                           <i className="fi flaticon-funnel"/>
                           &nbsp;Filter
                           <i className={ `fi-1 flaticon-1-arrow-${ showFilters ? 'up' : 'down' } upIcon` }/>
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

   incrementHistoryLimit() {
     var currentLimit = this.props.history.limit
     this.props.setHistoryLimit(currentLimit + 100);
     //determine last history api call and repeat it with updated limit
     if (this.props.history.lastHistoryRequest == 'GET_FILTERED_ITEMS') {
       this.props.getFilteredItems();
     } else if (this.props.history.lastHistoryRequest == 'GET_HISTORY_ITEMS') {
       this.props.getHistoryItems();
     }
   }

    componentWillMount() {
        this.props.getHistoryItems();
    }

    componentWillUnmount(){
      this.props.clearState();
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

   let filter_container = document.querySelector('.history-filter-container');

   if(!filter_container.classList.contains('opened')){
      filter_container.classList.add('opened');
   }
   else {
      filter_container.classList.remove('opened');
   }
}
