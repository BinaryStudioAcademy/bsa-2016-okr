import React from 'react';
import { Link } from 'react-router';
import "./nav-menu.scss";

class NavMenu extends React.Component {
   constructor(props) {
      super(props);
   }

   handleShow() {
      ShowUsersList();
   }

   links_feedback_handler(event) {
      console.log(event.target);
      links_feedback(event);
   }

   render() {
      let adminMenuItems;
      if(this.props.isAdmin) {
         adminMenuItems = (
            <li>
               <Link to="">
                  <i className="fa fa-recycle fa-2x" aria-hidden="true"></i>
                  Recycle Bin
               </Link>
            </li>
         )
      }
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
                  <li><Link to="/home">
                     <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                     Home
                  </Link></li>
                  <li onClick={this.handleShow.bind(this)}>
                     <button id="users-link">
                        <i className="fa fa-users fa-2x" aria-hidden="true"></i>
                        Users
                     </button>
                  </li>
                  <li><Link to="">
                     <i className="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
                     Plan
                  </Link></li>
                  <li><Link to="">
                     <i className="fa fa-clock-o fa-2x" aria-hidden="true"></i>
                     History
                  </Link></li>
                  {adminMenuItems}
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
   var target = event.target,
      links = document.querySelectorAll('#navbar a'),
      nav = document.getElementById('navbar'),
      menu_bars = document.getElementById('bars');

   if (target.matches('#navbar a')) {
      if (!isActive(target)) {
         disactiveAll(links);
         switch_active_state(target, 'activate');
         if (isOpen(nav)) {
            switch_open_state(nav, 'close');
            switch_active_state(menu_bars, 'disactivate');
         }
      } else {
         if (isOpen(nav)) {
            switch_open_state(nav, 'close');
            switch_active_state(menu_bars, 'disactivate');
         }
      }
   } else if (target.matches('#navbar #new-obj-btn') || target.matches('#navbar #users-link')) {
      if (!isActive(target)) {
         switch_active_state(target, 'activate');
         if (isOpen(nav)) {
            switch_open_state(nav, 'close');
            switch_active_state(menu_bars, 'disactivate');
         }
      } else {
         switch_active_state(target, 'disactivate');
         if (isOpen(nav)) {
            switch_open_state(nav, 'close');
            switch_active_state(menu_bars, 'disactivate');
         }
      }
   }

}
function disactiveAll(target) {
   target.forEach(function (el) {
      el.classList.remove('active');
   })
}
function isActive(target) {
   return target.classList.contains('active');
}
function isOpen(target) {
   return target.classList.contains('opened');
}
function switch_active_state(target, action) {
   if (action === 'activate')
      target.classList.add('active');
   else if (action === 'disactivate') target.classList.remove('active');
}
function switch_open_state(target, action) {
   if (action === 'open')
      target.classList.add('opened');
   else if (action === 'close') target.classList.remove('opened');
}

