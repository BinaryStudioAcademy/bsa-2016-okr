import React, { Component } from 'react'

class Quarter extends Component {
   constructor(props) {
      super(props);
      this.hendleQuarter = this.hendleQuarter.bind(this);
   }
   hendleQuarter(){
      
   }
   render() {
      return (
         <div id='quaterPanel'>
            <ul id='quaterList'>
               <li className="quater active">1-st quarter</li>
               <li className="quater" onClick={this.hendleQuarter}>2-nd quarter</li>
               <li className="quater">3-rd quarter</li>
               <li className="quater">4-th quarter</li>
            </ul>
         </div>
      )
   }
}

export default Quarter