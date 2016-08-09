import React from 'react';
import ListOfUsers from './list-of-users/list-of-users.js';
import CentralWindow from '../containers/central-window.jsx';
import StatPanel from "../containers/statistic-panel.jsx";

class Home extends React.Component {
   constructor() {
      super();
      this.state = {
         searchValue: '',
         id: '',
         data: [
            {
               id: 0,
               name: 'Kelly Bloom',
               photo: 0
            },
            {
               id: 1,
               name: 'Josh Peterson',
               photo: 0
            },
            {
               id: 2,
               name: 'Sahan Roman',
               photo: 0
            },
            {
               id: 3,
               name: 'Taras Barladun',
               photo: 0
            },
            {
               id: 4,
               name: 'Roman Vintish',
               photo: 0
            }
         ]
      }
      this.search = this.search.bind(this);
      this.takeUser = this.takeUser.bind(this);
      this.menu_handle_click = this.menu_handle_click.bind(this);
   }
   takeUser(id) {
      this.setState({
         id: id
      })
   }

   search(value) {
      this.setState({
         searchValue: value
      })
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
                  <ListOfUsers takeUser={this.takeUser} search={this.search}
                               searchValue={this.state.searchValue} data={this.state.data} />
               </CentralWindow>
               <StatPanel></StatPanel>
         </div>
      )
   }
}

export default Home;