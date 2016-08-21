import React from 'react';

class ObjectiveData extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
  	console.log(this.props.objective.category.title)
  	console.log(this.props.objective.title)

		return 
			<tr>
				<td></td>
				<td>{this.props.objective.category.title}</td>
				<td className="OKR-managing objective-title">{this.props.objective.title}</td>
				<td>{this.props.objective.description}</td>
				<td><i className="fi flaticon-edit" aria-hidden="true" ></i></td>
				<td><i className="fi flaticon-garbage-2" aria-hidden="true" ></i></td>
    		</tr> 
  }
}

export default ObjectiveData