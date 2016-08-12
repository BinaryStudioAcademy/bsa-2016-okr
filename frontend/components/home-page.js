import React from 'react';
import './home-page-components/home-page.scss';
import Quarter from './home-page-components/quarter.jsx';
import UserObjectives from './home-page-components/objectives.jsx';
import CentralWindow from '../containers/central-window.jsx';
import StatPanel from "../containers/statistic-panel.jsx";
import Dashboard from "./dashboard/dashboard.jsx";

class Home extends React.Component {
   constructor() {
      super();
     
      this.menu_handle_click = this.menu_handle_click.bind(this);
   }


   menu_handle_click(event) {
      var target = event.target,
         menu = document.getElementById('navbar');

      if (!target.classList.contains('active')) {
         target.classList.add('active');
         menu.classList.add('opened');
      } else {
         target.classList.remove('active');
         menu.classList.remove('opened');
      }
   }

   render() {
      return (
         <div>
               <CentralWindow>
                  
                  <UserObjectives />
               </CentralWindow>
               <StatPanel>
               <Dashboard></Dashboard>
               </StatPanel>
         </div>
      )
   }
}

export default Home;