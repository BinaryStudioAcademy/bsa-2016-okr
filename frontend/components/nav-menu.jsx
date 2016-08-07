import React from 'react';
import "nav-menu.css";

class NavMenu extends React.Component {
   render() {
      return (
         <aside id="navbar">
            <nav>
               <ul>
                  <li><a href="#" id="new-obj-btn">
                     <i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                     New Objective
                  </a></li>
                  <li><a href="#">
                     <i class="fa fa-home fa-2x" aria-hidden="true"></i>
                     Home
                  </a></li>
                  <li><a href="#">
                     <i class="fa fa-users fa-2x" aria-hidden="true"></i>
                     Users
                  </a></li>
                  <li><a href="#">
                     <i class="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
                     Plan
                  </a></li>
                  <li><a href="#">
                     <i class="fa fa-clock-o fa-2x" aria-hidden="true"></i>
                     History
                  </a></li>
               </ul>
            </nav>
         </aside>
      )
   }
}

export default NavMenu;