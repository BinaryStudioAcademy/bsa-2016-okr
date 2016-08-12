import React from 'react';
import KeyResult from './key-result.jsx';
import './key-result-list.scss';

class KeyResultList extends React.Component{
   constructor(){
      super();

      this.state = {
         keyResults: [
            { id: 1 }
         ]
      };

      this.handleAddNewKeyRes = this.handleAddNewKeyRes.bind(this);
   }

   handleAddNewKeyRes(){
      add_new_keyres_handler.call(this);
   }

   render(){
      return(
         <ul id="new-obj-keyresults">
            <p>Key results</p>

            {
               this.state.keyResults.map((el) => {
                  return <KeyResult id={el.id} />
               })
            }

            <a id="add-new-keyresult-btn" onClick={this.handleAddNewKeyRes}>+ Add new key result</a>
         </ul>
      )
   }
}

export default KeyResultList;

function add_new_keyres_handler(){
   var newId = ++this.state.keyResults[this.state.keyResults.length - 1].id;
   console.log(newId);
   this.setState({
      keyResults: this.state.keyResults.concat({
         id: newId
      })
   })
}