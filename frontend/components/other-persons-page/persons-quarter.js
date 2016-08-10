import React, { Component } from 'react'

class Quarter extends Component {
constructor() {
      super();
      this.hendleClick = this.hendleClick.bind(this);
   }
   hendleClick(e){
      var li = document.getElementsByClassName('quater');
      for (var i=0; i<4; i++) {
         li[i].classList.remove('active');
      }
      e.target.classList.add('active');
   }
   
   render() {
      return (
         <div id='quaterPanel'>
            <ul id='quaterList'>
               <li className="quater active" onClick={this.hendleClick}>1-st quater</li>
               <li className="quater" onClick={this.hendleClick}>2-nd quater</li>
               <li className="quater" onClick={this.hendleClick}>3-rd quater</li>
               <li className="quater" onClick={this.hendleClick}>4-th quater</li>
            </ul>
         </div>
      )
   }
}

export default Quarter