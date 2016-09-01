import React, { Component } from 'react';

class Quarter extends Component {
	constructor(props) {
		super(props);

		this.handleTabClick = this.handleTabClick.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handleAddingNewQuarter = this.handleAddingNewQuarter.bind(this);
	}

	handleYearChange(e) {
		let value = e.target.value;
		this.props.changeYear(value);
	}
	
	handleTabClick(e) {
		var li = document.getElementsByClassName('quater');
		for (var i=0; i<4; i++) {
			if ( li[i] == e.target)
				var selectedTab = i;
		} 
		
		this.props.changeTab(++selectedTab);
	}
	
	activeTab(num) {
		if (this.props.selectedTab == num)
			return "current";
		else return "";
	}
	
	handleAddingNewQuarter(event){
		let quarter_id = parseInt(event.target.dataset.id);
		this.props.addNewQuarter(quarter_id);
	}

	render() {
		var quarters_prefixes = [
		"st",
		"nd",
		"rd",
		"th"
		];
		function getQuarters() {
			var quarters = [];

			for(let i = 1; i <= 4; i++) {
				if(this.props.existedQuarters.includes(i)){
					quarters.push( <li key={i} className={this.props.selectedTab == i
						? "quater current exist" : "quater exist"}
						onClick={this.handleTabClick} data-id={i}>{i + '-' + quarters_prefixes[i - 1]} quarter</li> )
				} else {
					quarters.push( <li key={i}
						className={"quater"}
						onClick={this.handleAddingNewQuarter} data-id={i}>Open {i + '-' + quarters_prefixes[i - 1]} quarter</li> )
				}
			}

			return quarters;
		}

		let years = [ this.props.currentYear, this.props.currentYear + 1 ];

		let optionsEl = years.map((year) => {
			return <option value={ year }>{ year }</option>
		});

		return (
			<div id="quarter-bar">
				<select id="business-year" onChange={ this.handleYearChange }>
					{ optionsEl }
				</select>
				<ul>
					{
						getQuarters.call(this).map((quarter) => {
							return quarter;
						})
					}
				</ul>
			</div>
			)
	}
}

Quarter.defaultProps = { 
	today: new Date()
};

export default Quarter;
