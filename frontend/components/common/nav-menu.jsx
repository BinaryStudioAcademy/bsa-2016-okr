import React from 'react';
import { Link } from 'react-router';
import "./nav-menu.scss";

class NavMenu extends React.Component {
   constructor() {
      super();
   }

   handleShow() {
      ShowUsersList();
   }

   links_feedback_handler(event) {
      links_feedback(event);
   }

   render() {
      return (
         <aside id="navbar">
            <nav onClick={this.links_feedback_handler.bind(this)}>
               <ul>
                  <li>
                     <button id="new-obj-btn">
                        <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                        New Objective
                     </button>
                  </li>
                  <li><Link to="/">
                     <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                     Home
                  </Link></li>
                  <li onClick={this.handleShow.bind(this)}>
                     <button id="users-link">
                        <i className="fa fa-users fa-2x" aria-hidden="true"></i>
                        Users
                     </button>
                  </li>
                  <li><Link to="#">
                     <i className="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
                     Plan
                  </Link></li>
                  <li><Link to="/history">
                     <i className="fa fa-clock-o fa-2x" aria-hidden="true"></i>
                     History
                  </Link></li>
               </ul>
            </nav>
         </aside>
      )
   }
}
export default NavMenu;

function ShowUsersList() {
   var usersList = document.getElementById('usersList');
   if (usersList.classList.contains('undisplay')) {
      usersList.classList.remove('undisplay');
      usersList.classList.add('display');
   }
   else {
      usersList.classList.remove('display');
      usersList.classList.add('undisplay');
   }
}

function links_feedback(event) {
   var   target = event.target,
         links = document.querySelectorAll('#navbar a'),
         nav = document.getElementById('navbar');

   if (target.matches('#navbar #new-obj-btn')) {
      if (!isActive(target)) {
         switch_link_state(target, 'active');
         if (isOpen(nav)) close_nav();
      } else {
         switch_link_state(target, 'disactive');
         console.log('disactive');
         if (isOpen(nav)) close_nav();
      }
   } else if(target.matches('#navbar a')){
      if(!isActive(target)){
         disactiveAll(links);
         switch_link_state(target, 'active');
         if(isOpen(nav)) close_nav();
      } else {
         switch_link_state(target, 'disactive');
         if (isOpen(nav)) close_nav();
      }
   } else if(target.matches('#navbar #users-link')){
      if(isOpen(nav)) close_nav();
   }


}
function disactiveAll(target) {
   target.forEach((el) => {
      el.classList.remove('active');
   })
}
function isActive(target) {
   return target.classList.contains('active');
}
function isOpen(target) {
   return target.classList.contains('opened');
}
function switch_link_state(target, action) {
   if (action === 'active'){
      target.classList.add('active');
   } else if (action === 'disactive') {
      target.classList.remove('active');
   } else if (action === 'open'){
      target.classList.add('opened');
   } else if (action === 'close'){
      target.classList.remove('opened');
   }
}
function close_nav() {
   var   nav = document.getElementById('navbar'),
         menu_bars = document.getElementById('bars');

   switch_link_state(nav, 'close');
   switch_link_state(menu_bars, 'disactive');
}

