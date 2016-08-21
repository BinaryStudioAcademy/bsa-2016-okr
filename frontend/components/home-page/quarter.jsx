import React, { Component } from 'react'
import './quarter-bar.scss';

class Quarter extends Component {
   constructor() {
      super();

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
   activeTab1(){
      if (this.props.currentTab == 1) 
        return "current exist"
      else return ""
   }
   activeTab2(){
      if (this.props.currentTab == 2)     
         return "current exist"
      else return ""
   }
   activeTab3(){
      if (this.props.currentTab == 3) 
         return "current exist"
      else return ""
   }
   activeTab4(){
      if (this.props.currentTab == 4) 
         return "current exist"
      else return ""
   }  

   render() {
      return (
         <div id="quarter-bar">
            <select name="" id="business-year" onChange={this.handleYearChange}>
               <option value="">{this.props.today.getFullYear()}</option>
               <option value="">{this.props.today.getFullYear()+1}</option>
            </select>
            <ul>
               <li className={"quater " + this.activeTab1()} onClick={this.handleTabClick}>1-st quarter</li>
               <li className={"quater " + this.activeTab2()} onClick={this.handleTabClick}><a href="">+ Q2</a></li>
               <li className={"quater " + this.activeTab3()} onClick={this.handleTabClick}><a href="">+ Q3</a></li>
               <li className={"quater " + this.activeTab4()} onClick={this.handleTabClick}><a href="">+ Q4</a></li>
            </ul>
         </div>
      )
   }
}

Quarter.defaultProps = { 
   today: new Date()
};
export default Quarter;
