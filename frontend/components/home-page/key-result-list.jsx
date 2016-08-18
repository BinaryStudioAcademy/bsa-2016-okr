import React from 'react';
import KeyResultAdd from './key-result-add.jsx';
import './key-result-list.scss';

class KeyResultList extends React.Component{
   constructor(){
      super();

      this.state = {
         keyResults: [
            //{ id: 1 }
         ]
      };

      this.handleAddNewKeyRes = this.handleAddNewKeyRes.bind(this);
      this.handleDelKeyResult = this.handleDelKeyResult.bind(this);
   }

   handleAddNewKeyRes(){
      add_new_keyres_handler.call(this);
   }

   handleDelKeyResult(id){
      del_keyresult_handler.call(this, id);
   }

   render(){
      return(
         <ul id="new-obj-keyresults">

            {
               this.state.keyResults.map((el) => {
                  return <KeyResultAdd id={el.id} key={el.id} onClick={this.handleDelKeyResult}/>
               })
            }

            <a id="add-new-keyresult-btn" onClick={this.handleAddNewKeyRes}>+ Add new key result</a>
         </ul>
      )
   }
}

export default KeyResultList;

function add_new_keyres_handler(){
   var newId = 0;
   if (this.state.keyResults.length == 0){
      newId = 1;
   }else{
      newId = this.state.keyResults[this.state.keyResults.length - 1].id;
   }

   this.setState({
      keyResults: this.state.keyResults.concat({
         id: ++newId
      })
   })
}

function del_keyresult_handler(id) {
   //if(this.state.keyResults.length > 1){
      for(var i = 0, l = this.state.keyResults.length; i < l; i++){
         if(id === this.state.keyResults[i].id){
            this.state.keyResults.splice(i, 1);
            break;
         }
      }
      this.setState({
         keyResults: this.state.keyResults
      })
   //}
}