import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
    render() {
      return (
		    <div id="application">{this.props.children}</div>
      );
    }
}
