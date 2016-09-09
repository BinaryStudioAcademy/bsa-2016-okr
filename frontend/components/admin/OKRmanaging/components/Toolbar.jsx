import React, { Component } from 'react';

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

export default Toolbar