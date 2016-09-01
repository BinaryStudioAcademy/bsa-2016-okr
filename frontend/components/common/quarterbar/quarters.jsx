import React, { Component } from 'react';
import "./quarters.scss";

class Quarterbar extends Component {
   constructor(props) {
      super(props);

      this.handleQuarterChange = this.handleQuarterChange.bind(this);
      this.handleYearChange = this.handleYearChange.bind(this);
      this.handleAddingNewQuarter = this.handleAddingNewQuarter.bind(this);
   }

   handleQuarterChange(event) {
      this.props.changeTab(parseInt(event.target.dataset.id));
      tab_click_feedback.call(this, event);
   }

   handleYearChange(event) {
      this.props.changeYear(event.target.value);
   }

   handleAddingNewQuarter() {

   }

   render() {
      return (
         <div id="quarter-bar">
            <select id="business-year" onChange={this.handleYearChange}>
               { getYears.call(this) }
            </select>
            <ul id="quarters" onClick={this.handleQuarterChange}>
               { getQuarters.call(this) }
            </ul>

         </div>
      )
   }
}

Quarterbar.defaultProps = {
   today: new Date()
};

export default Quarterbar;

function getQuarters() {
   let quarters_prefixes = ["1-st", "2-nd", "3-rd", "4-th"],
      current_year = this.props.currentYear,
      current_tab = this.props.currentQuarter,
      quarters = this.props.quarters,
      quarters_to_show;

   quarters_to_show = quarters.map(quarter => {
      return <li
         key={quarter.index}
         data-id={quarter.index}
         className={quarter.index == current_tab ? 'active' : ''}>
         {quarters_prefixes[quarter.index - 1]} quarter</li>
   });

   return quarters_to_show;

}

function getYears() {
   let years = [this.props.currentYear, this.props.currentYear + 1];

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