import React from 'react';
import Header from "../containers/header.jsx";
import NavMenu from "./nav-menu.jsx";
import Search from './search-bar.jsx';
import MainPage from '../containers/main-page.jsx';
import CentralWindow from '../containers/central-window.jsx';
import StatPanel from "../containers/statistic-panel.jsx";

class Home extends React.Component{
      constructor() {
      super();

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
               <Search />
            </Header>
            <NavMenu />
            <MainPage>
               <CentralWindow>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis et fugiat laudantium porro quam quis repudiandae tenetur vitae! Error harum illum, laboriosam optio possimus praesentium voluptate voluptatibus voluptatum! Cum dolore dolores ea est, et in iste nisi, nobis quod ratione repellat rerum suscipit tempore tenetur ullam, unde veniam voluptatem? Ab assumenda beatae, deserunt dolorum earum, est eveniet ipsam iure modi non numquam praesentium quam, quasi recusandae suscipit totam vel! Ab accusantium amet beatae, consectetur culpa cum cupiditate dicta distinctio doloremque ipsam natus nulla optio quibusdam quis quo repudiandae similique, tempora tempore tenetur veniam veritatis voluptas voluptates voluptatibus. Beatae, minus, numquam?</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis et fugiat laudantium porro quam quis repudiandae tenetur vitae! Error harum illum, laboriosam optio possimus praesentium voluptate voluptatibus voluptatum! Cum dolore dolores ea est, et in iste nisi, nobis quod ratione repellat rerum suscipit tempore tenetur ullam, unde veniam voluptatem? Ab assumenda beatae, deserunt dolorum earum, est eveniet ipsam iure modi non numquam praesentium quam, quasi recusandae suscipit totam vel! Ab accusantium amet beatae, consectetur culpa cum cupiditate dicta distinctio doloremque ipsam natus nulla optio quibusdam quis quo repudiandae similique, tempora tempore tenetur veniam veritatis voluptas voluptates voluptatibus. Beatae, minus, numquam?</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis et fugiat laudantium porro quam quis repudiandae tenetur vitae! Error harum illum, laboriosam optio possimus praesentium voluptate voluptatibus voluptatum! Cum dolore dolores ea est, et in iste nisi, nobis quod ratione repellat rerum suscipit tempore tenetur ullam, unde veniam voluptatem? Ab assumenda beatae, deserunt dolorum earum, est eveniet ipsam iure modi non numquam praesentium quam, quasi recusandae suscipit totam vel! Ab accusantium amet beatae, consectetur culpa cum cupiditate dicta distinctio doloremque ipsam natus nulla optio quibusdam quis quo repudiandae similique, tempora tempore tenetur veniam veritatis voluptas voluptates voluptatibus. Beatae, minus, numquam?</p></CentralWindow>
               <StatPanel></StatPanel>
            </MainPage>
         </div>
      )
   }
}

export default Home;