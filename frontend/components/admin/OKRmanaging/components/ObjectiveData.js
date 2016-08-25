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
				<td className="OKR-managing objective-title">{this.props.objective.title}</td>
				<td>{this.props.objective.description}</td>
        <td>{this.props.objective.category.title}</td>
    	</tr> 
    	)
  }
}

export default ObjectiveData