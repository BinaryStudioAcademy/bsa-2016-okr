import React, { Component } from 'react'

class Quarter extends Component {
   constructor() {
      super();

      this.handleTabClick = this.handleTabClick.bind(this);
      this.hendleChangeYear = this.hendleChangeYear.bind(this);
   }
   activeTab1(){
      if (this.props.currentTab == 1) {
         return "active"
      } else {
         return ""
      }
   }
   activeTab2(){
      if (this.props.currentTab == 2) {
         return "active"
      } else {
         return ""
      }
   }
   activeTab3(){
      if (this.props.currentTab == 3) {
         return "active"
      } else {
         return ""
      }
   }
   activeTab4(){
      if (this.props.currentTab == 4) {
         return "active"
      } else {
         return ""
      }
   }      
   hendleChangeYear(e){
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

   render() {
      return (
         <div id='quaterPanel'>
            <ul id='quaterList'>
            <select onChange={this.hendleChangeYear} className='year'>
               <option>{this.props.today.getFullYear()}</option>
               <option>{this.props.today.getFullYear()+1}</option>
            </select> 
               <li className={"quater " + this.activeTab1()} onClick={this.handleTabClick}>1-st quarter</li>
               <li className={"quater " + this.activeTab2()} onClick={this.handleTabClick}>2-nd quarter</li>
               <li className={"quater " + this.activeTab3()} onClick={this.handleTabClick}>3-rd quarter</li>
               <li className={"quater " + this.activeTab4()} onClick={this.handleTabClick}>4-th quarter</li>
            </ul>  
         </div>
      )
   }
}
Quarter.defaultProps = { 
   today: new Date()
};
export default Quarter