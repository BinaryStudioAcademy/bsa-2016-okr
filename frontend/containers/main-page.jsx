import React from 'react';
import NewObjective from '../components/new-obj-components/new-objective.jsx';
import "./main-page.scss";

export default class MainPage extends React.Component{
   render(){
      return(
         <div id="main">
            <NewObjective />
            {this.props.children}
         </div>
      )
   }
}