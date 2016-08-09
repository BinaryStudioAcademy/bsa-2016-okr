import React, { Component } from 'react'

class Quarter extends Component {
   constructor() {
      super();

   }

   render() {
      return (
         <div id='topPanel'>
            <div id='quaterPanel'>
               <ul id='quaterList'>
                  <li className="quater active">1-st quater</li>
                  <li className="quater">2-nd quater</li>
                  <li className="quater">3-rd quater</li>
                  <li className="quater">4-th quater</li>
               </ul>
            </div>
         </div>
      )
   }
}

export default Quarter