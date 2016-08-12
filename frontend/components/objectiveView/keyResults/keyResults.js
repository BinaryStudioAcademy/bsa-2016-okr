import React, { Component } from 'react';
import KeyResult from './keyResult.js';
import './keyResult.scss';

export default class KeyResults extends Component {
  
  render() {
   let item = this.props.keyResultList.map((item, index) => {
         return <KeyResult index={index} key={index} item={item} />
      })

    return (
	    	<ol className="keyResults-list">
	    		{item}
	    	</ol>
    	)
  }
}
