import React, { Component } from 'react';
import './keyResults.css';

class KeyResults extends Component {
  render() {
    return (
      <div className="keyResult">
        <input type="checkbox" name="isComplite" className="isComplite" />
        <span className="title">Lorem ipsum dolor sit amet</span>
        <span className="rate">Rate 0.25</span>
      </div>
    );
  }
}

export default KeyResults