import React, { Component } from 'react';
import KeyResults from './key-results.jsx';
import Progress from './progress-bar.jsx';

class ObjectiveItem extends Component {
   constructor(props) {
      super(props);
      this.state ={
        item: props.item
      }
      this.changeScore = this.changeScore.bind(this);
   }

changeScore(){
  this.setState({
    item: this.state.item
  })
}
   
   render() {
      return (
         <div className='home-objective'>
            <Progress data={this.state.item.keyResults} />
               <div className='name'>{this.state.item.objTitle}</div>
               <div className='description'>{this.state.item.objDescription}</div>
              <div className="objective-info">
                  <span className='fi flaticon-users co-workers'></span>4
                  <span className='fi flaticon-like-1 followed'></span>5
              </div>
              <KeyResults data={this.state.item.keyResults} changeScore={this.changeScore}/>
          </div>        
      )
   }
}

export default ObjectiveItem
