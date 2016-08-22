import React from 'react';

class ObjectiveData extends React.Component{
  constructor(props){
    super(props);
  }
  activeObjective(){
  	this.props.activeObjective(this.props.index)
  }
  render(){

		return (
			<tr onClick={this.activeObjective.bind(this)}>
				<td>{this.props.index + 1}</td>
				<td>{this.props.objective.category.title}</td>
				<td className="OKR-managing objective-title">{this.props.objective.title}</td>
				<td>{this.props.objective.description}</td>
				<td><i className="fi flaticon-edit" aria-hidden="true" ></i></td>
				<td><i className="fi flaticon-garbage-2" aria-hidden="true" ></i></td>
    		</tr> 
    	)
  }
}

export default ObjectiveData