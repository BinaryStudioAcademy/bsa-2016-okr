import React, { Component } from 'react';

class KeyResult extends Component {
   constructor(props) {
      super(props);
      this.state = {
         score: props.item.score
      }

      this.changeScore = this.changeScore.bind(this);
   }

   changeScore(e) {
      this.setState({
         score: e.target.value
      })

      if (e.target.value == 1)
         e.target.parentElement.classList.add('completed');
      else
         e.target.parentElement.classList.remove('completed')
   }

   render() {
   if (this.props.item.completed == 'true')
      return (
         <li className="user-key-result completed">
            <input type="range" min="0" max="1" step="0.1" className="keyScore"
                        value={this.state.score}  onChange={this.changeScore}/>
            {this.props.item.title}
          </li>        
      )
      else
         return (
            <li className="user-key-result">
               <input type="range" min="0" max="1" step="0.1" className="keyScore"
                        value={this.state.score}  onChange={this.changeScore}/>
               {this.props.item.title}
             </li>        
         )
   }
}

export default KeyResult