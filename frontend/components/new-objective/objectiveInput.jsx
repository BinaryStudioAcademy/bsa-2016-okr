import React from 'react';
import KeyResult from './key-result.jsx';
import './credentials.scss'; //needed
import './new-objective.scss'; //needed
//import './key-result-list.scss';
import './objectiveInput.scss';

class ObjectiveInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
           keyResults: [
              { id: 1 }
           ]
        };

        this.handleAddNewKeyRes = this.handleAddNewKeyRes.bind(this);
        this.handleDelKeyResult = this.handleDelKeyResult.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleFocus(){
      this.refs.objectiveForm.classList.remove("hidden");
      this.refs.closeButton.classList.remove("hidden");
    }

    handleClose(){
      this.refs.objectiveForm.classList.add("hidden");
      this.refs.closeButton.classList.add("hidden");
    }

    handleAddNewKeyRes(){
      var newId = this.state.keyResults[this.state.keyResults.length - 1].id;
      this.setState({
         keyResults: this.state.keyResults.concat({
            id: ++newId
         })
      })
    }

    handleDelKeyResult(id){
      if(this.state.keyResults.length > 1){
         for(var i = 0, l = this.state.keyResults.length; i < l; i++){
            if(id === this.state.keyResults[i].id){
               this.state.keyResults.splice(i, 1);
               break;
            }
         }
         this.setState({
            keyResults: this.state.keyResults
         })
      }
    }

    render(){
        return(
          <div className="new-objective-form">
            <button ref="closeButton" type="button" id="close-new-obj-window" className="hidden" onClick={this.handleClose}>
               <i className="fi flaticon-multiply" aria-hidden="true"></i>
            </button>
            <div id="new-obj-creds">
              <div className="title-group">
                  <input type="text" placeholder="New objective title" id="new-obj-title" onFocus={this.handleFocus}/>
              </div>
              <div ref="objectiveForm" className="desc-group" className="hidden">
                  <label htmlFor="new-obj-desc">Description</label>
                  <textarea name="new-obj-desc" id="new-obj-desc" placeholder="Description"></textarea>
                <div>
                  <ul id="new-obj-keyresults">
                    <p className="no-after">Key results</p>
                    {
                       this.state.keyResults.map((el) => {
                          return <KeyResult id={el.id} key={el.id} onClick={this.handleDelKeyResult}/>
                       })
                    }
                    <a id="add-new-keyresult-btn" onClick={this.handleAddNewKeyRes}>+ Add new key result</a>
                  </ul>
                 <button type="button" id="new-obj-submit-btn">Add new objective</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

export default ObjectiveInput;
