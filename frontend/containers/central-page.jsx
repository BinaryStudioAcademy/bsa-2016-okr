import React from 'react';
import "central-page.css";

export default class CentralPage extends React.Component{
   render(){
      return(
         <div id="central-window">
            <div className="main-content">
               {this.props.children}
            </div>
         </div>
      )
   }
}