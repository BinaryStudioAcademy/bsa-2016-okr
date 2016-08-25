import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";

class ActiveObjective extends React.Component{
  constructor(props){
    super(props);

    this.deleteObjective = this.deleteObjective.bind(this)
    this.editObjective = this.editObjective.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
  	event.preventDefault();
  	let reqBody = {};
	let objectiveDesctiption = document.querySelector("textarea.template-description").value;
	let objectiveTitle = document.querySelector("input.template-title").value;
	let objectiveCategory = document.querySelector("select.template-category").value;

	reqBody.description = objectiveDesctiption;
	reqBody.title = objectiveTitle;
//	reqBody.category.title = objectiveCategory;

    this.props.editObjectiveTamplate(this.props.objectivesList.visibleObjectives[this.props.objectivesList.active]._id, reqBody);
  }
  editObjective(){
  	if(this.props.objectivesList.editing)
  		var value = false;
  	else value = true;
  	this.props.editObjective(value);
  }

  deleteObjective(){
  	let i = this.props.objectivesList.active;
  	this.props.deleteObjective(this.props.objectivesList.visibleObjectives[i]._id, true)
  }

  componentWillMount(){
  	this.props.getObjectivesList()
  }
  render(){

  	const{visibleObjectives, active} = this.props.objectivesList;
  	if (!visibleObjectives || !visibleObjectives[active]) { 
  		return <h3>Nothing found</h3>; 
  	}
  		else 
  			var objective = visibleObjectives[active];
  		{
  			if (this.props.objectivesList.editing) {
  				let keyResults = objective.keyResults.map((item) => {
			  		/*return <input type='text' name='keyResult' className='keyResults' key={item._id} value={item.title} />*/
			  		return <div className='keyResults' key={item._id}>{item.title}</div>
			  	})
  				return (
  					<div className="OKR-managing thumbnail">
							<i className="fi flaticon-edit" aria-hidden="true" onClick={this.editObjective}></i>
							<i className="fi flaticon-garbage-2" aria-hidden="true" onClick={this.deleteObjective}></i>

							<div className="thumbnail-caption">

								<h3>{objective.title}</h3>
								<form onSubmit={this.handleSubmit}>
								<table className="OKR-managing objective-info-table">
									<tbody>
									
										<tr>
											<td>Objective:</td>
											<td><input type="text" className='template-title' name='title' defaultValue={objective.title}/></td>
										</tr>
										<tr>
											<td>Description:</td>
											<td><textarea name='description' className='template-description' defaultValue={objective.description}/></td>
										</tr>
										<tr>
											<td>Category:</td>
											<td>{objective.category.title}</td>
										</tr>
										{/*<tr>
											<td>Start date:</td>
											<td>01/07/2016</td>
										</tr>
										<tr>
											<td>Due date:</td>
											<td>10/11/2016</td>
										</tr>*/}
										<tr>
											<td>Key results:</td>
											<td>{keyResults}</td>
										</tr>
									
									</tbody>
								</table>
								<button className='btn btn-green admin-save-objective' type='submit'>Save</button>
								</form>
							</div>
						</div>
					)
  			}
  			else {
  				let keyResults = objective.keyResults.map((item) => {
			  		return <div className='keyResults' key={item._id}>{item.title}</div>
			  	})
					return (
						<div className="OKR-managing thumbnail">
							<i className="fi flaticon-edit" aria-hidden="true" onClick={this.editObjective}></i>
							<i className="fi flaticon-garbage-2" aria-hidden="true" onClick={this.deleteObjective}></i>

							<div className="thumbnail-caption">

								<h3>{objective.title}</h3>
								<table className="OKR-managing objective-info-table">
									<tbody>
										<tr>
											<td>Objective:</td>
											<td>{objective.title}</td>
										</tr>
										<tr>
											<td>Description:</td>
											<td>{objective.description}</td>
										</tr>
										<tr>
											<td>Category:</td>
											<td>{objective.category.title}</td>
										</tr>
										{/*<tr>
											<td>Start date:</td>
											<td>01/07/2016</td>
										</tr>
										<tr>
											<td>Due date:</td>
											<td>10/11/2016</td>
										</tr>*/}
										<tr>
											<td>Key results:</td>
											<td>{keyResults}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)
			}
  		}
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

const ActiveObjectiveConnected = connect(mapStateToProps, mapDispatchToProps)(ActiveObjective);
export default ActiveObjectiveConnected

/*import React from 'react';

export default ({ data, active, edit, remove, editing}) => {
  if (!data || !data[active]) { return <h3>Nothing found :(</h3>; }

  const objective= data[active];

	if(editing) {

		return (
			<div className="OKR-managing thumbnail">
				<i className="fi flaticon-edit" aria-hidden="true" onClick={edit}></i>
				<i className="fi flaticon-garbage-2" aria-hidden="true" onClick={remove}></i>

				<div className="thumbnail-caption">

					<h3>{objective.title}</h3>
					<table className="OKR-managing objective-info-table">
						<tbody>
							<tr>
								<td>Objective:</td>
								<td><input type="text" value={objective.title}/></td>
							</tr>
							<tr>
								<td>Description:</td>
								<td><input type = "text" value={objective.description} /></td>
							</tr>
							<tr>
								<td>Category:</td>
								<td>			
									<select>
										<option selected value={objective.category}>{objective.category}</option>
										<option>Knowledge</option>
										<option>Expertise</option>
										<option>Projects</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>Start date:</td>
								<td><input type = "date"/></td>
							</tr>
							<tr>
								<td>Due date:</td>
								<td><input type = "date"/></td>
							</tr>
							<tr>
								<td>Key results:</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)

	} else {
				return (
			<div className="OKR-managing thumbnail">
				<i className="fi flaticon-edit" aria-hidden="true" onClick={edit}></i>
				<i className="fi flaticon-garbage-2" aria-hidden="true" onClick={remove}></i>

				<div className="thumbnail-caption">

					<h3>{objective.title}</h3>
					<table className="OKR-managing objective-info-table">
						<tbody>
							<tr>
								<td>Objective:</td>
								<td>{objective.title}</td>
							</tr>
							<tr>
								<td>Description:</td>
								<td>{objective.description}</td>
							</tr>
							<tr>
								<td>Category:</td>
								<td>{objective.category}</td>
							</tr>
							<tr>
								<td>Start date:</td>
								<td>01/07/2016</td>
							</tr>
							<tr>
								<td>Due date:</td>
								<td>10/11/2016</td>
							</tr>
							<tr>
								<td>Key results:</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
};
*/