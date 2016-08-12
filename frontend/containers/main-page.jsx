import React from 'react';
import NewObjective from '../components/new-obj-components/new-objective.jsx';
import ListOfUsers from '../components/list-of-users/list-of-users.jsx';
import "./main-page.scss";

export default class MainPage extends React.Component{
   render(){
      return(
         <div id="main">
            <NewObjective />
            <ListOfUsers />
            {this.props.children}
         </div>
      )
   }
}