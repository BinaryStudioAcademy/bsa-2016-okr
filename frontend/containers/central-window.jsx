import React from 'react';
import "./central-window.scss";

export default class CentralWindow extends React.Component{
   render(){
      return(
         <div id="central-window" className={this.props.fullScreen ? "full-screen" : ""}>
            <div className="main-content">
               {this.props.children}
            </div>
         </div>
      )
   }
}