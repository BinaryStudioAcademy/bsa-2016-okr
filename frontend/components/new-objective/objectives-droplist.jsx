import React from 'react';
import './objectives-droplist.scss';

export default class SearchResult extends React.Component {
   constructor(props) {
      super(props);
   }

   render(){
      return(
         <ul id="new-obj-droplist">
            {
               this.props.data.map((el) => {
                  return <li>{el}</li>
               })
            }
         </ul>
      )
   }
}