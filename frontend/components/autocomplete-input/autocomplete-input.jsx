import React from 'react';
import ReactDOM from 'react-dom';
import './autocomplete-input.scss';
import { debounce } from '../../../backend/utils/HelpService';
import { isEmpty } from '../../../backend/utils/ValidateService';

class AutocompleteInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isValid: true,
			selectedLi: false,
		};

		this.onKeyPress = this.onKeyPress.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickLi = this.onClickLi.bind(this);
		this.getData = debounce(this.getData.bind(this), 500);
	}

	getData(title) {
		this.props.getAutocompleteData(title);
	}

	onFocus(event) {
		let title = this.refs.autocompleteInput.value;
		this.props.getAutocompleteData(title);

		this.setState({selectedLi: false});

		// undisplay autocomplete results when item is selected
		if (isEmpty(this.props.selectedItem)) {
			let autocompleteResultElement = event.target.nextElementSibling;
			if (autocompleteResultElement.classList.contains('undisplay')) {
				autocompleteResultElement.classList.remove('undisplay');
				autocompleteResultElement.classList.add('display');
			}
		}
	}

	onBlur(event) {
		let autocompleteResultElement = this.refs.autocompleteInput.nextElementSibling;
		if (autocompleteResultElement.classList.contains('display')) {
			autocompleteResultElement.classList.add('undisplay');
			autocompleteResultElement.classList.remove('display');
		}

		if(!this.state.isValid) {
			this.setState({ isValid: true });
		}
	}

	onChange(event) {
		const title = event.target.value;
		const item = {};

		if(this.props.isValid(title) && !this.state.isValid) {
			this.setState({ isValid: true });
		}

		this.getData(title);
		this.props.setAutocompleteSelectedItem(item);

		let autocompleteResultElement = event.target.nextElementSibling;
		if (autocompleteResultElement.classList.contains('undisplay')) {
			autocompleteResultElement.classList.remove('undisplay');
			autocompleteResultElement.classList.add('display');
		}
	}

	onClickLi(item) {
		// return function for create closure
		return (event) => {
			this.props.setAutocompleteSelectedItem(item);
			this.refs.autocompleteInput.value = item.title;
			this.setState({ selectedLi: true });
		}
	}

	onKeyPress(event) {
		const title = this.refs.autocompleteInput.value;
		let isTitleValid = this.props.isValid(title);
		
		if(event.key === 'Enter') {
			if (!isTitleValid && this.state.isValid) {
				this.setState({ isValid: false });
			} else if(isTitleValid && !this.state.isValid) {
				this.setState({ isValid: true });
			}
			
			if (isTitleValid) {
				this.props.addNewItem();
				// this.refs.autocompleteInput.value = '';
				// this.getData('');
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.selectedLi) {
			ReactDOM.findDOMNode(this.refs.autocompleteInput).focus();
		}
	}

	render() {
		const data = this.props.autocompleteData;
		let validateClass = this.state.isValid ? '' : 'red-border';
		let autocompleteItems;

		if(data.length !== 0) {
			autocompleteItems = data.map(function (item, i) {
				return <li
				onMouseDown={this.onClickLi(item) }
				className="autocomplete-result-li"
				key={i}
				data-value={item._id}>
				<div className="autocomplete-result-item-text">{item.title}</div>

				{(('difficulty' in item) ?
					(<div className="difficulty">{item.difficulty}</div>)	:
					('')
					)}

				</li>;
			}, this);
		} else {
			autocompleteItems = <li	className="autocomplete-result-li inactive">
			<div className="autocomplete-result-item-text">No suggestions...</div>
			</li>
		}

		return (
			<div className="autocomplete-123">
				<input
					ref="autocompleteInput"
					className={`input-key-result ${validateClass}`} type="text"
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
