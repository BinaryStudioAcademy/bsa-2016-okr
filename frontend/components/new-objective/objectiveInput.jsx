import React from 'react';
import KeyResult from './key-result.jsx';
import './objectiveInput.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/myObjectivesActions";

class ObjectiveInput extends React.Component{
    constructor(props){
        super(props);
/*
        this.state = {
           keyResults: [
              { id: 1 }
           ]
        };

        this.state ={
          item: props.item
        }
*/
        this.handleAddNewKeyRes = this.handleAddNewKeyRes.bind(this);
        this.handleDelKeyResult = this.handleDelKeyResult.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAddNewObjective = this.handleAddNewObjective.bind(this);
    }

    handleFocus(){
      this.refs.objectiveForm.classList.remove("hidden");
      this.refs.closeButton.classList.remove("hidden");
      console.log("THIS >>>", this);
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

    handleAddNewObjective() {
      var title = this.refs.title.value
      var description = this.refs.description.value
      if(title.length == 0 || description.length == 0){alert("Please fill title and description");}
      var quarters = this.props.stateFromReducer.myState.me.quarters;
      var currentYear = this.props.stateFromReducer.myState.currentYear;
      var currentTab = this.props.stateFromReducer.myState.currentTab;
      var quarterId = '';
      var categoryId = '';
      var handlerCategory = this.props.category;

      quarters.forEach((quarter) => {
          	if(quarter.index == currentTab && quarter.year == currentYear) {
              quarterId = quarter._id;
      			}
      	});

        this.props.stateFromReducer.myState.allCategories.forEach((category) => {
              if(category.title == handlerCategory) {
                categoryId = category._id;
              }
          });

      var body =  {
        "title": title,
        "description":description,
        "category": categoryId,
        "quarterId": quarterId,
        "keyResults": [
          {"title":"template key Result 1", "difficulty":"easy"},
          {"title":"template key Result 2", "difficulty":"intermediate"},
          {"title":"template key Result 2", "difficulty":"advanced"}
        ]
      }

      this.handleClose();
      this.refs.title.value = "";
      this.refs.description.value = "";
      this.props.addNewObjective(body);
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
      var keyResults =  [ { id: 1 } ];
        return(
          <div className="new-objective-form">
            <button ref="closeButton" type="button" className="hidden close-new-obj-window" onClick={this.handleClose}>
               <i className="fi flaticon-multiply" aria-hidden="true"></i>
            </button>
            <div className="new-obj-creds">
              <div className="title-group">
                  <input type="text" ref="title" placeholder="New objective title" required className="new-obj-title" onFocus={this.handleFocus} />
              </div>
              <div ref="objectiveForm" className="desc-group" className="hidden">
                  <label htmlFor="new-obj-desc">Description</label>
                  <textarea name="new-obj-desc" ref="description" className="new-obj-desc" placeholder="Description" ></textarea>
                <div>
                  <ul id="new-obj-keyresults">
                    <p className="no-after">Key results</p>
                    {
                      //this.state.keyResults.map((el) => {
                       keyResults.map((el) => {
                          return <KeyResult id={el.id} key={el.id} onClick={this.handleDelKeyResult}/>
                       })
                    }
                    <a id="add-new-keyresult-btn" onClick={this.handleAddNewKeyRes}>+ Add new key result</a>
                  </ul>
                 <button type="button" className="new-obj-submit-btn" onClick={this.handleAddNewObjective}>Add new objective</button>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}
const ObjectiveInputConnected = connect(mapStateToProps, mapDispatchToProps)(ObjectiveInput);

export default ObjectiveInputConnected;
