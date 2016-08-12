import React, { Component } from 'react'
import './tabs.scss'

class Tabs extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: this.props.selected
		}
	}

	handleClick(index, s_event, id, event) {
		s_event.preventDefault();
		this.setState({
			selected: index
		})
	}

	_renderTitles() {
		function labels(child, index) {
			let activeClass = (this.state.selected === index ? 'active-tab' : '');
			return (
				<li key={index}>
					<a href="#" className={ activeClass } onClick={ this.handleClick.bind(this, index) }>
						{ child.props.label }
					</a>
				</li>
			);
		}
		return (
			<ul className="tabs_labels">
				{ this.props.children.map(labels.bind(this)) }
			</ul>
		);
	}

	_renderContent() {
		return (
			<div className="tabs_content">
				{ this.props.children[this.state.selected] }
			</div>
		);
	}

	render() {
		return (
			<div className="tabs">
				{ this._renderTitles() }
				{ this._renderContent() }
			</div>
		);
	}
}

Tabs.defaultProps = {
	selected: 0
}

export default Tabs