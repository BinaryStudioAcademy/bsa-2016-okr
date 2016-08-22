import React from 'react';
import './autocomplete-input.scss';

class AutocompleteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            autocompleteInput: {},
            item: {}
        };

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClickLi = this.onClickLi.bind(this);
    }

    onFocus(event){
        this.setState({
            autocompleteInput: event.target
        });

        let title = this.state.autocompleteInput.value;
        this.props.getAutocompleteData(title);

        let autocompleteResultElement = event.target.nextElementSibling;
        if (autocompleteResultElement.classList.contains('undisplay')) {
            autocompleteResultElement.classList.remove('undisplay');
            autocompleteResultElement.classList.add('display');
        }
    }

    onBlur(event){
        let autocompleteResultElement = this.state.autocompleteInput.nextElementSibling;
        if (autocompleteResultElement.classList.contains('display')) {
            autocompleteResultElement.classList.add('undisplay');
            autocompleteResultElement.classList.remove('display');
        }
    }

    onChange(event){
        let title = event.target.value;
        this.props.getAutocompleteData(title);

    }

    onClickLi(item){
        // return function for create closure
        return (event)=> {
            this.props.setAutocompleteSelectedItem(item);
            this.state.autocompleteInput.value=item.title;
        }
    }

    render() {
        let data = this.props.autocompleteData;
        return (

            <div className="autocomplete">
                <input className="input-key-result" type="text"
                       placeholder={`Start typing to get ${this.props.autocompleteType}...`}
                       onFocus={this.onFocus}
                       onChange={this.onChange}
                       onBlur={this.onBlur}
                />

                {(data.length!==0)?(
                <div className="autocomplete-result undisplay">

                    <ul className="autocomplete-result-ul">
                        {data.map(function(item, i) {
                            return <li
                                onMouseDown={this.onClickLi(item)}
                                className="autocomplete-result-li"
                                key={i}
                                data-value={item._id}>
                                <div className="autocomplete-result-item-text">{item.title}</div>
                            </li>;
                            },this)}
                    </ul>

                </div>
                    ):(
                <div className="autocomplete-result undisplay">
                </div>
                    )}
            </div>

        )
    }
}

export default AutocompleteInput;