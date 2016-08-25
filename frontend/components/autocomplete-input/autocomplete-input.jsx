import React from 'react';
import './autocomplete-input.scss';

class AutocompleteInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.onKeyPress = this.onKeyPress.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickLi = this.onClickLi.bind(this);
		this.debounce = this.debounce.bind(this);
		this.getData = this.debounce(this.getData.bind(this), 500);
	}

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.
	debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	getData(title) {
		this.props.getAutocompleteData(title);
	}

	onFocus(event) {

		let title = this.refs.autocompleteInput.value;
		this.props.getAutocompleteData(title);

		let autocompleteResultElement = event.target.nextElementSibling;
		if (autocompleteResultElement.classList.contains('undisplay')) {
			autocompleteResultElement.classList.remove('undisplay');
			autocompleteResultElement.classList.add('display');
		}
	}

	onBlur(event) {
		let autocompleteResultElement = this.refs.autocompleteInput.nextElementSibling;
		if (autocompleteResultElement.classList.contains('display')) {
			autocompleteResultElement.classList.add('undisplay');
			autocompleteResultElement.classList.remove('display');
		}
	}

	onChange(event) {
		const title = event.target.value;
		this.getData(title);
		const item = {};
		this.props.setAutocompleteSelectedItem(item);
	}

	onClickLi(item) {
		// return function for create closure
		return (event)=> {
			this.props.setAutocompleteSelectedItem(item);
			this.refs.autocompleteInput.value = item.title;
		}
	}

	onKeyPress(event) {
      if (event.key === 'Enter') {
	      const title =this.refs.autocompleteInput.value;
	      this.props.addNewItemByKeyPressEnter(title);
	      this.refs.autocompleteInput.value = "";
      }
    }

	render() {
		const data = this.props.autocompleteData;

		let autocompleteItems =
			((data.length !== 0) ?
				(data.map(function (item, i) {
					return <li
						onMouseDown={this.onClickLi(item) }
						className="autocomplete-result-li"
						key={i}
						data-value={item._id}>
						<div className="autocomplete-result-item-text">{item.title}</div>
					</li>;
				}, this)) :
				(
					<li
						className="autocomplete-result-li inactive">
						<div className="autocomplete-result-item-text">No suggestions...</div>
					</li>
				));


		return (

			<div className="autocomplete">
				<input
					ref="autocompleteInput"
					className="input-key-result" type="text"
					placeholder={`Start typing to get ${this.props.autocompletePlaceholder}... and press enter to add it`}
					onFocus={this.onFocus}
					onChange={this.onChange}
					onBlur={this.onBlur}
					onKeyPress={this.onKeyPress}
				/>


				<div className="autocomplete-result undisplay">
					<ul className="autocomplete-result-ul">
						{ autocompleteItems }
					</ul>
				</div>

			</div>

		)
	}
}

export default AutocompleteInput;
