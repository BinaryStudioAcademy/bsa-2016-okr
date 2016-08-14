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
         e.target.parentElement.classList.add('completed');
      else
         e.target.parentElement.classList.remove('completed')
      this.props.changeScore(this.state.keyResult);

   }

   render() {
   if (this.state.keyResult.completed == 'true')
      return (
         <li className="key-result completed">
            <input type="range" min="0" max="1" step="0.1" className="keyScore"
                        value={this.state.keyResult.score}  onChange={this.changeScore}/>
            {this.props.item.title}
          </li>        
      )
      else
         return (
            <li className="key-result">
               <input type="range" min="0" max="1" step="0.1" className="keyScore"
                        value={this.state.keyResult.score}  onChange={this.changeScore}/>
               {this.props.item.title}
             </li>        
         )
   }
}

export default KeyResult