import React from 'react';
import "./nav-menu.scss";

class NavMenu extends React.Component {
   handleShow(){
      ShowUsersList();
   }
   render() {
      return (
         <aside id="navbar">
            <nav>
               <ul>
                  <li><a href="#" id="new-obj-btn">
                     <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                     New Objective
                  </a></li>
                  <li><a href="#">
                     <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                     Home
                  </a></li>
                  <li onClick={this.handleShow.bind(this)}><a href="#">
                     <i className="fa fa-users fa-2x" aria-hidden="true"></i>
                     Users
                  </a></li>
                  <li><a href="#">
                     <i className="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
                     Plan
                  </a></li>
                  <li><a href="#">
                     <i className="fa fa-clock-o fa-2x" aria-hidden="true"></i>
                     History
                  </a></li>
               </ul>
            </nav>
         </aside>
      )
   }
}

export default NavMenu;

function ShowUsersList(){
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