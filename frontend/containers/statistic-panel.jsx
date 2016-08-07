import React from 'react';
import "statistic-panel.css";

export default class StatiscticPanel extends React.Component{
   render(){
      return(
         <aside id="inter-panel">
            {this.props.children}
         </aside>
      )
   }
}