import React from 'react';
import "./main-page.scss";

export default class MainPage extends React.Component{
   render(){
      return(
         <div id="main">
            {this.props.children}
         </div>
      )
   }
}