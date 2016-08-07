import React from 'react';
import Header from "../containers/header.jsx";
import NavMenu from "./nav-menu.jsx";
import Search from './search-bar.jsx';
import CentralPage from "../containers/central-page.jsx";
import StatPanel from "../containers/statistic-panel.jsx";

class Home extends React.Component{
   constructor(){
      super();
   }

   render(){
      return(
         <div>
            <Header>
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