import React, { Component } from 'react';
import cookie from 'react-cookie';

import { currentYear, currentQuarter } from '../../../../backend/config/constants';

import "./quarters.scss";

class Quarterbar extends Component {
	constructor(props) {
		super(props);

		this.handleQuarterClick = this.handleQuarterClick.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.showQuarters = this.showQuarters.bind(this);
		this.handleCallContextMenu = this.handleCallContextMenu.bind(this);
		this.onContextItemClick = this.onContextItemClick.bind(this);
		this.onContextWrapper = this.onContextWrapper.bind(this);
		this.getQuarters = this.getQuarters.bind(this);
		this.getYears = this.getYears.bind(this);
	}

	getQuarters() {
		// First element empty to have a loop from 1
		let quartersPrefixes = ["", "1-st", "2-nd", "3-rd", "4-th"];
		let quartersEls = [];
		let {
			selectedTab,
			selectedYear,
			editMode,
			quarters,
		} = this.props;

		let quartersForYear = quarters.filter((quarter) => {
			return quarter.year === selectedYear;
		});

		for(let i = 1; i <= 4; i++) {
			let el;

			let quarterIndex = quarters.findIndex((quarter) => {
				return quarter.index === i;
			});

			if(quarterIndex === -1) {
				if (((selectedYear === currentYear) && (i < currentQuarter))
				|| (selectedYear < currentYear)
				|| !editMode) {
					el = (
						<li className="disabled" key={ i } tabIndex="0">
							{ quartersPrefixes[i] } quarter
						</li>
					);
				} else {
					el = (
						<li className="not-exist" data-id={ i } key={ i } tabIndex="0">
							Open { quartersPrefixes[i] } quarter
						</li>
					);
				}
			} else {
				el = (
					<li
						tabIndex="0"
						key={ i }
						data-id={ quarters[quarterIndex].index }
						className={ quarters[quarterIndex].index == selectedTab ? 'active' : '' }
					>
						{ quartersPrefixes[i] } quarter
					</li>
				);
			}

			quartersEls.push(el);
		}

		return quartersEls;
	}

	getYears() {
		return this.props.years.map(year => {
			return (<option key={ year } value={ year }>{ year }</option>);
		});
	}

	handleQuarterClick(event) {
		let target = event.target;
		let { userId, selectedYear, editMode } = this.props;
		if (target.matches('li:not(.not-exist)') && target.matches('li:not(.disabled)')) {

			this.props.changeTab(parseInt(event.target.dataset.id));
			tab_click_feedback.call(this, event);

			let quarter = document.querySelector('#quarters li.active');
			quarter.blur();

		} else if(event.target.matches('li.not-exist') && editMode) {
			//adding new quarter to database, API call
			this.props.addNewQuarter({
				year: selectedYear,
				index: parseInt(target.dataset.id),
				userId: userId
			});

			// console.log('¯\\_(ツ)_/¯: event', Object.assign({}, event));
		}
	}

	handleYearChange(event) {
		this.props.changeYear(parseInt(event.target.value), 10);
	}

	showQuarters(event) {
		choose_quarter_for_tablet.call(this, event);
	}
	handleCallContextMenu(event) {
		call_context_menu.call(this, event);
	}
	onContextItemClick(event) {
		on_context_item.call(this, event);
	}
	onContextWrapper(event) {
		on_context_wrapper.call(this, event);
	}

	render() {
		const { selectedYear } = this.props;
		const yearsList = this.getYears();
		const quartersList = this.getQuarters();

		return (
			<div id="quarter-bar">
				<select
					id="business-year"
					value={ selectedYear }
					onChange={ this.handleYearChange }
				>
					{ yearsList }
				</select>
				<div className="quarters-wrapper">
					<button
						id="show-quarters"
						className="btn"
						onClick={ this.showQuarters }
					>
						Quarters&nbsp;<i className="fa fa-chevron-down"></i>
					</button>
					<ul id="quarters"
						onClick={ this.handleQuarterClick }
						onContextMenu={ this.handleCallContextMenu }
					>
						{ quartersList }
					</ul>
				</div>
				<div id="context-wrapper" onClick={ this.onContextWrapper }>
					<ul id="context" onClick={ this.onContextItemClick }>
						<li id="archive" data-action="archive">Archive</li>
						<li id="unarchive" data-action="unarchive">Unarchive</li>
					</ul>
				</div>
			</div>
    )
  }
}

export default Quarterbar;

function tab_click_feedback(event) {
	var quarters = document.querySelectorAll('#quarters li'),
	quartersWarapper = document.querySelector('.quarters-wrapper'),
	i = document.querySelector('#show-quarters i'),
	target = event.target;

	if(!target.classList.contains('active')) {
		quarters.forEach((el) => {
			el.classList.remove('active');
		});

		target.classList.add('active');

		if(quartersWarapper.classList.contains('visible')) {
			quartersWarapper.classList.remove('visible');
			i.classList.remove('fa-chevron-up');
			i.classList.add('fa-chevron-down');
		}
	}
}

function choose_quarter_for_tablet(event) {
	let target = event.target,
	i = target.children[1];
	if (!event.target.parentElement.classList.contains('visible')) {
		event.target.parentElement.classList.add('visible');
		i.classList.remove('fa-chevron-down');
		i.classList.add('fa-chevron-up');
	} else {
		event.target.parentElement.classList.remove('visible');
		i.classList.remove('fa-chevron-up');
		i.classList.add('fa-chevron-down');
	}
}

function call_context_menu(event) {
	if(this.props.isAdmin) {
		let target = event.target,
		context = document.getElementById('context-wrapper'),
		contextMenu = document.getElementById('context');

		if(target.matches('#quarters li')) {
			if(target.getAttribute("data-isarchived") == "true"){
				document.getElementById('archive').className = "hidden"
				document.getElementById('unarchive').className = ""
			} else {
				document.getElementById('archive').className = ""
				document.getElementById('unarchive').className = "hidden"
			}

			target.classList.add("oncontext");
			contextMenu.style.top = event.clientY + "px";
			contextMenu.style.left = event.clientX + "px";
			context.classList.add("visible");
			event.preventDefault();
			return false;
		}
	}
}

function on_context_item(event) {
	let   target = document.querySelector('.oncontext'),
	context = document.getElementById('context-wrapper');
	if(event.target.matches('#context li')){
		if(event.target.dataset.action == 'archive' || event.target.dataset.action == 'unarchive' ){
			target.classList.remove('oncontext');
			context.classList.remove('visible');
			this.props.archiveQuarter(target.getAttribute("data-id"))
		}
	}
}

function on_context_wrapper(event) {
	let context = document.getElementById('context-wrapper');
	if(event.target.matches('#context-wrapper')){
		context.classList.remove('visible');
		event.target.classList.remove('oncontext');
	}
}
