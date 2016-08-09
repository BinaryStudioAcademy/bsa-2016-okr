import React from 'react';
import "./search-bar.scss";

class Search extends React.Component {
   constructor(){
      super();

      this.handle_filter_click = this.handle_filter_click.bind(this);
   }

   handle_filter_click(event){
      var   target = event.target,
            filters = document.getElementById('filters');

      if(!target.classList.contains('active')){
         target.classList.add('active');
         filters.classList.add('opened');
      } else {
         target.classList.remove('active');
         filters.classList.remove('opened');
      }
   }

   render() {
      return (
         <div id="obj-search">
            <form action="">
               <div className="search-group">
                  <input type="text" placeholder="Search for objective" id="obj-search-input"/>
                  <button type="submit" id="obj-search-submit">
                     <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                  <button id="obj-search-filter" type="button" onClick={this.handle_filter_click}>
                     <i className="fa fa-filter" aria-hidden="true"></i>
                  </button>
               </div>
               <div id="filters">
                  <section>
                     <label for="filter-key-results">
                        <input type="checkbox" id="filter-key-results"/>
                        key results</label>
                     <label for="filter-following">
                        <input type="checkbox" id="filter-following"/>
                        following</label>
                     <label for="filter-period">
                        Period:&nbsp;&nbsp;
                        <select id="filter-period">
                           <option value="present">Present</option>
                           <option value="future">Future</option>
                           <option value="past">Past</option>
                        </select>
                     </label>
                  </section>
                  <section>
                     <label for="filter-assessment">
                        <input type="checkbox" id="filter-assessment"/>
                        has assessment</label>
                     <label for="filter-achived">
                        <input type="checkbox" id="filter-achived"/>
                        achived</label>
                     <label for="filter-category">
                        Category:&nbsp;&nbsp;
                        <select id="filter-category">
                           <option value="projects">Projects</option>
                           <option value="expertise">Expertise</option>
                           <option value="knowledge">Knowledge</option>
                        </select>
                     </label>
                  </section>
               </div>
               <ul className="search-result">
                  <li className="search-result-item">
                     hello
                  </li>
                  <li className="search-result-item">
                     world
                  </li>
               </ul>
            </form>
         </div>
      )
   }
}

export default Search;
