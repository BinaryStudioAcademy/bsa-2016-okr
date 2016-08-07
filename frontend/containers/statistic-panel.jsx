import React from 'react';
import "./statistic-panel.scss";

export default class StatiscticPanel extends React.Component{
   render(){
      return(
         <aside id="inter-panel">
            {this.props.children}
         </aside>
      )
   }
}