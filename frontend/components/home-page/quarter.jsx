import React, { Component } from 'react'
import './quarter-bar.scss';

class Quarter extends Component {
   constructor(props) {
      super(props);

      this.handleTabClick = this.handleTabClick.bind(this);
      this.handleYearChange = this.handleYearChange.bind(this);
   }

   handleYearChange(e){
      let value = e.target.value;
      this.props.changeYear(value)
   }
   handleTabClick(e) {
      var li = document.getElementsByClassName('quater');
      for (var i=0; i<4; i++) {
         if ( li[i] == e.target)
            var currentTab = i;
      } 
      this.props.changeTab(++currentTab);
   }
   activeTab(num){
      if (this.props.currentTab == num)
        return "current exist"
      else return ""
   }

   render() {
      function getQuarters(){
         var quarters = [];

         for(var i = 1; i <= 4; i++){
            if(this.props.existedQuarters.includes(i)){
               quarters.push( <li className={"quater " + this.activeTab(i)} onClick={this.handleTabClick}>{i}-st quarter</li> )
            } else {
               quarters.push( <li className={"quater " + this.activeTab(i)} onClick={this.handleTabClick}>+ Q{i}</li> )
            }
         }

         return quarters;
      }

      return (
         <div id="quarter-bar">
            <select name="" id="business-year" onChange={this.handleYearChange}>
               <option value="">{this.props.today.getFullYear()}</option>
               <option value="">{this.props.today.getFullYear()+1}</option>
            </select>
            <ul>
               {
                  getQuarters.call(this).map((quarter) => {
                     return quarter;
                  })
               }
            </ul>
         </div>
      )
   }
}

Quarter.defaultProps = { 
   today: new Date()
};
export default Quarter;
