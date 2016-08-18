import React from 'react';
import './key-result.scss';

class KeyResult extends React.Component{
   constructor(props){
      super(props);

      this.handleDelKeyRes = this.handleDelKeyRes.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   handleDelKeyRes(){
      this.props.onClick(this.props.id);
   }

   handleChange(){
     console.log("hey");
   }

   render(){
      return(
         <li className="keyresult-group">
            <input ref="title" type="text" placeholder="Key result name" onChange={this.handleChange}/>
            <button type="button" className="btn btn-red-hover del-keyres" onClick={this.handleDelKeyRes}>
               <i className="fi flaticon-garbage-2" aria-hidden="true"></i>
            </button>
         </li>
      )
   }
}


export default KeyResult;
