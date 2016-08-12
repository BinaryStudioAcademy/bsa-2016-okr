import React, { Component } from 'react';

export default class KeyResult extends Component {
	constructor(props) {
		super(props);

	this.completed = this.completed.bind(this);
	}
	completed(e) {
		if(e.target.checked==false  && this.props.item.completed == 'true') {
			console.log('in work');	

		}
			else if(e.target.checked==true  && this.props.item.completed == 'false') {
				console.log('finish');
			}
	}
	
	render() {
	if (this.props.item.completed == 'true') {
		return (
				<div>
				<input className="keyResult-checked" type="checkbox" checked onChange={this.completed}/>
				<li className="user-key-result completed" style={{textDecoration:'line-through'}}>
	         		{this.props.item.title}
			    </li> 
			    </div>       
			)		
	}
	else {
			return (
				<div>
				<input className="keyResult-check" type="checkbox" onChange={this.completed}/>
				<li className="user-key-result">
	         		{this.props.item.title}
	         		<span> — {this.props.item.score}</span>
			    </li> 
			    </div>       
			) }
	}
}
