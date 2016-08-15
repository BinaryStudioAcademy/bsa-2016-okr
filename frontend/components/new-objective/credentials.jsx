import React from 'react';
import SearchResult from './objectives-droplist.jsx';
import './credentials.scss';

class NewObjCredentials extends React.Component{
   constructor(props){
      super(props);

      this.state = {
         objectives: [
             'start thinking',
             'learn english',
             'learn javascript'
         ],
         searchResult: []
      };

      this.handleSearching = this.handleSearching.bind(this);
      this.handleInputFocus = this.handleInputFocus.bind(this);
   }

   handleSearching(event){
      search_handler.call(this, event);
   }

   handleInputFocus(){
      if(this.state.searchResult.length > 0) onfocus();
      else onblur();
   }

   handleInputBlur(){
      onblur()
   }

   render(){
      return(
         <div id="new-obj-creds">
            <div className="title-group">
               <label htmlFor="new-obj-title">New objective title</label>

               <div className="input-group">
                  <input type="text" placeholder="Title" id="new-obj-title" onChange={this.handleSearching} onFocus={this.handleInputFocus} onBlur={this.handleInputBlur}/>
                  <SearchResult data={this.state.searchResult} />
               </div>

               <select name="new-obj-category" id="new-obj-category">
                  <option value="knowledge">Knowledge</option>
                  <option value="expertise">Expertise</option>
                  <option value="projects">Projects</option>
               </select>
            </div>

            <div className="desc-group">
               <label htmlFor="new-obj-desc">Description</label>
               <textarea name="new-obj-desc" id="new-obj-desc" placeholder="Description"></textarea>
            </div>
         </div>
      )
   }
}

export default NewObjCredentials;

function search_handler(event) {
   let   target = event.target,
         search_result;

   if(target.value != ""){
      search_result =  this.state.objectives.filter((el) => {
         return el.indexOf(target.value) >= 0;
      });
      if(search_result.length > 0) onfocus();
      else onblur();
      this.setState({
         searchResult: search_result
      });
   } else {
      this.setState({
         searchResult: []
      });
      onblur();
   }
}

function onfocus(event) {
   document.getElementById('new-obj-droplist')
      .classList.add('opened');
}
function onblur() {
   document.getElementById('new-obj-droplist')
   .classList.remove('opened');
}