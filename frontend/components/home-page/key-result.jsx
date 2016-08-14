import React, { Component } from 'react';

class KeyResult extends Component {
   constructor(props) {
      super(props);
      this.state = {
         keyResult: props.item
      }

      this.changeScore = this.changeScore.bind(this);
   }

   changeScore(e) {
   var score = e.target.value;
   this.state.keyResult.score = score;
      this.setState({
        keyResult: this.state.keyResult
      })

      if (e.target.value == 1)
         e.target.nextElementSibling.classList.add('completed');
      else
         e.target.nextElementSibling.classList.remove('completed')
      this.props.changeScore(this.state.keyResult);

   }

   render() {
   if (this.state.keyResult.completed == 'true')
      return (
         <li className="key-result">
            <span className='score'>{this.state.keyResult.score}</span>
            <input type="range" min="0" max="1" step="0.1" className="keyScore"
                        value={this.state.keyResult.score}  onChange={this.changeScore}/>
            <span className='completed'>{this.props.item.title}</span>
          </li>        
      )
      else
         return (
            <li className="key-result">
            <span className='score'>{this.state.keyResult.score}</span>
               <input type="range" min="0" max="1" step="0.1" className="keyScore"
                        value={this.state.keyResult.score}  onChange={this.changeScore}/>
               <span>{this.props.item.title}</span>
             </li>        
         )
   }
}

export default KeyResult