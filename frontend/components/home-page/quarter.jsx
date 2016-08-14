import React, { Component } from 'react'

class Quarter extends Component {
   constructor() {
      super();

      this.hendleClick = this.hendleClick.bind(this);
   }

   hendleClick(e) {
      var li = document.getElementsByClassName('quater');
      
      for (var i=0; i<4; i++) {
         li[i].classList.remove('active');
         if ( li[i] == e.target)
            var currentTab = i;
      }

      e.target.classList.add('active');
      this.props.changeTab(++currentTab);
   }
   
   render() {
      return (
         <div id='quaterPanel'>
            <ul id='quaterList'>
               <select className='year'>
                  <option>2016</option>
                  <option>2017</option>
               </select>
               <li className="quater active" onClick={this.hendleClick}>1-st quarter</li>
               <li className="quater" onClick={this.hendleClick}>2-nd quarter</li>
               <li className="quater" onClick={this.hendleClick}>3-rd quarter</li>
               <li className="quater"onClick={this.hendleClick}>4-th quarter</li>
            </ul>
         </div>
      )
   }
}

export default Quarter