import React from 'react';
import './key-result.scss';

class KeyResult extends React.Component{
   constructor(props){
      super(props);

      this.handleDelKeyRes = this.handleDelKeyRes.bind(this);
   }

   handleDelKeyRes(){
      this.props.onClick(this.props.id);
   }

   render(){
      return(
         <li className="keyresult-group">
            <input type="text" placeholder="Key result name"/>
            <button type="button" className="del-keyres" onClick={this.handleDelKeyRes}>
               <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
         </li>
      )
   }
}


export default KeyResult;

