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
            <button type="button" className="del-keyres">
               <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
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
