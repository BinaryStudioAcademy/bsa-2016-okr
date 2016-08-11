import React from 'react';
import './key-result.scss';

class KeyResult extends React.Component{
   constructor(props){
      super(props);

      this.handleScoreSliderChange = this.handleScoreSliderChange.bind(this);
   }

   componentDidMount(){
      this.refs.slider.value = 0;
   }

   handleScoreSliderChange(event){
      score_slider_handler(event);
   }

   render(){
      return(
         <li className="keyresult-group">
            <input type="text" placeholder="Key result name"/>
            <span className="score-view">0</span>
            <input ref="slider" type="range" min="0" max="1" step="0.1" onChange={this.handleScoreSliderChange}/>
         </li>
      )
   }
}

export default KeyResult;

function score_slider_handler(event) {
   var   target = event.target,
         scoreView = target.previousElementSibling;

   scoreView.innerHTML = target.value;
}