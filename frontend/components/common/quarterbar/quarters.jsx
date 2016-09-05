import React, { Component } from 'react';
import "./quarters.scss";
import { currentYear, currentQuarter } from '../../../../backend/config/constants';

const session = require('../../../../backend/config/session');

class Quarterbar extends Component {
   constructor(props) {
      super(props);

      this.handleQuarterClick = this.handleQuarterClick.bind(this);
      this.handleYearChange = this.handleYearChange.bind(this);
   }

   handleQuarterClick(event) {
      let target = event.target;

      if(target.matches('li:not(.not-exist)') && target.matches('li:not(.disabled)')){

         this.props.changeTab(parseInt(event.target.dataset.id));
         tab_click_feedback.call(this, event);

      } else if(event.target.matches('li.not-exist')){

         //adding new quarter to database, API call
         this.props.addNewQuarter({
            year: this.props.selectedYear,
            index: parseInt(target.dataset.id),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            userObjectives: []
         });
      }
   }

   handleYearChange(event) {
      this.props.changeTab(currentQuarter);
      this.props.changeYear(event.target.value);
   }


   render() {
      return (
         <div id="quarter-bar">
            <select id="business-year" onChange={this.handleYearChange}>
               { getYears.call(this) }
            </select>
            <ul id="quarters" onClick={this.handleQuarterClick}>
               { getQuarters.call(this) }
            </ul>
         </div>
      )
   }
}

export default Quarterbar;

//basic functionality
function getQuarters() {
   var   quarters_prefixes = ["1-st", "2-nd", "3-rd", "4-th"],
         current_tab = this.props.selectedTab,
         quarters = this.props.quarters,
         isMe = this.props.me,
         mentorId = this.props.mentorId,
         quarters_to_show = [];

   for(let i = 0; i < 4; i++){
      if(quarters[i] != undefined){
         quarters_to_show.push( <li
            key={i}
            data-id={quarters[i].index}
            className={quarters[i].index == current_tab ? 'active' : ''}>
            {quarters_prefixes[i]} quarter</li> )
      } else {
         if(isMe != undefined && isMe == true || (mentorId == session._id)){
            quarters_to_show.push(
               <li className="not-exist" data-id={i + 1} key={i + 1}>Open {quarters_prefixes[i]} quarter</li>
            )
         } else {
            quarters_to_show.push(
               <li className="disabled" key={i + 1}>{quarters_prefixes[i]} quarter</li>
            )
         }
      }
   }

   return quarters_to_show;

}

function getYears() {
   let years = [currentYear, currentYear + 1];

   return years.map(year => {
      return <option key={year} value={ year }>{ year }</option>
   });
}

function tab_click_feedback(event) {
   var quarters = document.querySelectorAll('#quarters li'),
      target = event.target;

   if (!target.classList.contains('active')) {
      quarters.forEach((el) => {
         el.classList.remove('active');
      });
      target.classList.add('active');
   }
}