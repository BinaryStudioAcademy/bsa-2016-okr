import React, {Component} from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class FilterCategoryItem extends Component {
	render() {
		return (
			<div className="checkbox-group">
				<input type="checkbox" id={"cbObjectives"}  id={this.props.id} defaultChecked={true}  onClick={this.props.onClickCallback}></input>
				<label className={this.props.isVisible ? '' : 'not-display'} htmlFor={this.props.id}>{this.props.name}</label>
			</div>
		)
	}
}

export default FilterCategoryItem;