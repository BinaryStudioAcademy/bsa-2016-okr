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

		     {/* <button className="btn btn-reset" >
		      <i className="fa fa-ban"></i>  Reset
		      </button>*/}
		      
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

/*export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.sorted = { ownerName: true, objTitle: true };
  }

  sort(type) {
    const { update, data } = this.props;
    const isSorted = this.sorted[type];
    let direction = isSorted ? 1 : -1;

    const sorted = [].slice.call(data).sort((a, b) => {
      if (a[type] === b[type]) { return 0; }
      return a[type] > b[type] ? direction : direction * -1;
    });

    this.sorted[type] = !isSorted;

    update({
      data: sorted,
      active: 0
    });
  }

  reset() {
    this.props.update({
      data: this.props.objectives,
      term: '',
      active: 0,
      editing: false
    });
  }

  render() {
    return (
		<div className="toolbar">
			<button type="button" id="add-new-objective"><i className="fi flaticon-add" aria-hidden="true"></i><span>  New objective</span></button>

			<button className="btn btn-reset" onClick={this.reset.bind(this)}>
			<i className="fa fa-ban"></i>  Reset
			</button>
			<table className="OKR-managing toolbar-table">
				<tr>
					<th>#</th>
					<th onClick={() => this.sort('category')}>
					<i className="fa fa-sort"></i>  Category
					</th>

					<th onClick={() => this.sort('title')}>
					<i className="fa fa-sort"></i>  Objective
					</th>

					<th onClick={() => this.sort('description')}>
					<i className="fa fa-sort"></i>  Description
					</th>
          <th>Edit</th>
					<th>Delete</th>
				</tr>
			</table>
		</div>
    )
  }
}
*/

