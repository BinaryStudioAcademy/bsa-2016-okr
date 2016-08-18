import React, { Component } from 'react';
import KeyResultItem from './key-result.jsx';
import KeyResultList from './key-result-list.jsx';

class KeyResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyResults: props.data
        }
        this.handleShow = this.handleShow.bind(this);
        this.textHandleShow = this.textHandleShow.bind(this);
        this.changeScore = this.changeScore.bind(this);
        this.setShowKeyResultElement = this.setShowKeyResultElement.bind(this);
    }

    setShowKeyResultElement(iconElement, keyResultElement) {
        if (keyResultElement.classList.contains('undisplay')) {
            keyResultElement.classList.remove('undisplay');
            keyResultElement.classList.add('display');
            iconElement.classList.remove('fa-angle-double-down');
            iconElement.classList.add('fa-angle-double-up');
        }
        else {
            iconElement.classList.remove('fa-angle-double-up');
            iconElement.classList.add('fa-angle-double-down');
            keyResultElement.classList.remove('display');
            keyResultElement.classList.add('undisplay');
        }
    }

    textHandleShow(e) {
        var iconElement = e.target.nextElementSibling,
            keyResultElement = e.target.nextElementSibling.nextElementSibling;
        this.setShowKeyResultElement(iconElement, keyResultElement);
    }

    handleShow(e) {
        var iconElement = e.target,
            keyResultElement = e.target.nextElementSibling;
        this.setShowKeyResultElement(iconElement, keyResultElement);
    }

    changeScore(keyResult) {
        this.props.changeScore()
    }

    render() {
        let item = this.state.keyResults.map((item, index) => {
            return <KeyResultItem index={index} key={index} item={item} changeScore={this.changeScore}/>
        })
        return (
            <div className='key-results'>
                <span className="change" onClick={this.textHandleShow}>Key results</span>
                <span className="fa fa-angle-double-down fa-lg key-results-arrow change" onClick={this.handleShow}></span>
                <div className='key-result-details undisplay'>
                    <ul>
                        {item}
                    </ul>

                    <KeyResultList />
                </div>
            </div>
        )
    }
}

export default KeyResults