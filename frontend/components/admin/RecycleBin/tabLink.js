import React, { Component } from 'react'
import { Link } from 'react-router'
import './tabLink.scss'

class TabLink extends Component{
	render() {
		return <Link {...this.props} activeClassName="active" className="recycle-tab"/>
	}
}

export default TabLink