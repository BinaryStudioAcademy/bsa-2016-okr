import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.addTemplate = this.addTemplate.bind(this);
  }

  addTemplate(event) {
      var target = event.target,
         newObjWindow = document.getElementById('new-objective');
 
     if(!newObjWindow.classList.contains('opened')){
         newObjWindow.classList.add('opened');
     } else { newObjWindow.classList.remove('opened') }
    }
  render(){
        return (
		    <div className="toolbar">
		      <button type="button" onClick={this.addTemplate} className='btn btn-green'id="add-new-objective"><span>New objective</span></button>		      
		    </div>
    	)
  	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    objectivesList: state.okrManaging
  };
}

const ToolbarConnected = connect(mapStateToProps, mapDispatchToProps)(Toolbar);
export default ToolbarConnected
