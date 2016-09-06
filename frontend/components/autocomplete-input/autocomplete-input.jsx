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
		// this.onKeyDown = this.onKeyDown.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickLi = this.onClickLi.bind(this);
		this.addNewItem = this.addNewItem.bind(this);
		this.resetAutocompleteState = this.resetAutocompleteState.bind(this);
		this.getData = debounce(this.getData.bind(this), 500);
	}

	getData(title) {
		this.props.getAutocompleteData(title);
	}

	onFocus(event) {
		let title = this.refs.autocompleteInput.value;
		this.props.getAutocompleteData(title);

		// this.setState({ selectedLi: false });

		// undisplay autocomplete results when item is selected
		if (isEmpty(this.props.selectedItem)) {
			this.changeAutocompleteListVisibility('display');
		}
	}

	onBlur(event) {
		this.changeAutocompleteListVisibility('undisplay');

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
		if(event.key === 'Enter') {
			this.addNewItem();
		}
	}

	// onKeyDown(event) {
	// 	if(event.keyCode === 27) {
	// 		// Escape pressed
	// 		this.resetAutocompleteState();
	// 	}
	// }

	addNewItem() {
		// console.log('Trying to add new item...');
		const title = this.refs.autocompleteInput.value;
		let isTitleValid = this.props.isValid(title);

		if (!isTitleValid && this.state.isValid) {
			this.setState({ isValid: false });
		} else if(isTitleValid && !this.state.isValid) {
			this.setState({ isValid: true });
		}
		
		if (isTitleValid) {
			this.props.addNewItem(title);
			this.refs.autocompleteInput.value = '';
			this.props.setAutocompleteSelectedItem({});
			this.setState({ selectedLi: false });
			this.getData('');
		}
	}

	resetAutocompleteState() {
		this.refs.autocompleteInput.value = '';
		this.props.setAutocompleteSelectedItem({});
		this.setState({ selectedLi: false });
		this.props.resetAutocompleteState();
	}

	changeAutocompleteListVisibility(visibilityClass) {
		let autocompleteListElement = this.refs.autocompleteList;
		
		if(visibilityClass == undefined) {
			if (autocompleteListElement.classList.contains('undisplay')) {
				autocompleteListElement.classList.remove('undisplay');
				autocompleteListElement.classList.add('display');
			} else if (autocompleteListElement.classList.contains('display')) {
				autocompleteListElement.classList.remove('display');
				autocompleteListElement.classList.add('undisplay');
			}
		} else if(visibilityClass === 'display') {
			if (autocompleteListElement.classList.contains('undisplay')) {
				autocompleteListElement.classList.remove('undisplay');
				autocompleteListElement.classList.add('display');
			}
		} else if(visibilityClass === 'undisplay') {
			if (autocompleteListElement.classList.contains('display')) {
				autocompleteListElement.classList.remove('display');
				autocompleteListElement.classList.add('undisplay');
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log('Autocomplete input did update');
		if(prevState.selectedLi) {
			// console.log('Some item was selected from autocomplete');
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
			<div className="autocomplete-component">
				<input
					ref="autocompleteInput"
					className={ `autocomplete-input ${validateClass}` } type="text"
					placeholder={ `Start typing to get ${this.props.autocompletePlaceholder}...` }
					onFocus={ this.onFocus }
					onChange={ this.onChange }
					onBlur={ this.onBlur }
					onKeyPress={ this.onKeyPress }
				/>

				<div className="buttons">
					<div className="autocomplete-button">
						<button ref="btnAdd" 
						        type="button" 
						        className="btn btn-blue-hover btn-add"
						        onMouseDown={ this.addNewItem }>
							<i className="fi flaticon-add" aria-hidden="true"></i>
						</button>
					</div>

					<div className="autocomplete-button">
						<button ref="btnCancel" 
						        type="button" 
						        className="btn btn-red-hover btn-cancel"
						        onMouseDown={ this.resetAutocompleteState }>
							<i className="fi flaticon-multiply" aria-hidden="true"></i>
						</button>
					</div>
				</div>

				<div ref="autocompleteList" className="autocomplete-result undisplay">
					<ul className="autocomplete-result-ul">
					{ autocompleteItems }
					</ul>
				</div>
			</div>
		)
	}
}

export default AutocompleteInput;
