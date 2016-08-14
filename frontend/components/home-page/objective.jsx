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
   
   render() { console.log(this.state.item.keyResults)
      return (
         <div className='home-objective'>
            <Progress data={this.state.item.keyResults} />
               <div className='name'>{this.state.item.objTitle}</div>
               <div className='description'>{this.state.item.objDescription}</div>
              <div className="objective-info">
                  <div className='co-workers'>
                     <img src="https://maxcdn.icons8.com/iOS7/PNG/25/Users/group-25.png" title="User Group Man Man" width="25" />4
               </div>
                  <div className='followed'>
                     <img src="https://maxcdn.icons8.com/iOS7/PNG/25/Hands/thumb_up-25.png" title="Thumb Up" width="25" />10
                  </div>
              </div>
              <KeyResults data={this.state.item.keyResults} changeScore={this.changeScore}/>
          </div>        
      )
   }
}

export default ObjectiveItem
