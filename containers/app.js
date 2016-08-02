import React, { Component } from 'react'
import './app.css'

class App extends Component {
    render() {
        return (
		   <div id='application'>{this.props.children}</div>
        )
    }
}

export default App