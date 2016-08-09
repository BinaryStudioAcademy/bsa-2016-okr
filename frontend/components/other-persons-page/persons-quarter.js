import React, { Component } from 'react'

class Quarter extends Component {
   constructor() {
      super();
      this.hendleClick = this.hendleClick.bind(this);
      this.openTab = this.openTab.bind(this);
   }
   hendleClick(e){
      var li = document.getElementsByClassName('quater');
      for (var i=0; i<4; i++)
         li[i].classList.remove('active');
      e.target.classList.add('active');
      console.log()
   }
   openTab(){
      var li = document.getElementsByClassName('quater');
      let date = new Date();
      if (date < 1459432310417)
         li[0].classList.add('active');
      else if (date < 1467294710417)
         li[1].classList.add('active');
      else if (date < 1475329910417)
         li[2].classList.add('active');
      else if (date < 1483192310417)
         li[3].classList.add('active'); 
   }
   render() {
   //   this.openTab()
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