import React from 'react';
import Header from "../containers/header.jsx";
import NavMenu from "./nav-menu.jsx";
import Search from './search-bar.jsx';
import CentralPage from "../containers/central-page.jsx";
import StatPanel from "../containers/statistic-panel.jsx";

class Home extends React.Component{
   constructor(){
      super();

      this.menu_handle_click = this.menu_handle_click.bind(this);
   }

   menu_handle_click(event){
      var   target = event.target,
            menu = document.getElementById('navbar');

      if(!target.classList.contains('active')){
         target.classList.add('active');
         menu.classList.add('opened');
      } else {
         target.classList.remove('active');
         menu.classList.remove('opened');
      }
   }

   render(){
      return(
         <div>
            <Header>
               <div className="user-info clearfix">
                  <div className="logo">
                     <img src="http://www.appresume.com/cv_templates/cv_2_1/conf/images/profile.jpg" alt="" />
                  </div>
                  <div className="credentials">
                     <span className="name">John Doe</span><br/>
                     <span className="field">CEO</span>
                  </div>
               </div>
               <button id="bars">
                  <i className="fa fa-bars fa-lg" aria-hidden="true" onClick={this.menu_handle_click}></i>
               </button>
               <Search />
            </Header>
            <NavMenu />
            <CentralPage></CentralPage>
            <StatPanel></StatPanel>
         </div>
      )
   }
}

export default Home;