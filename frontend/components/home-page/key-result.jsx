import React, { Component } from 'react';

class KeyResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyResult: props.item
        }

        this.changeScore = this.changeScore.bind(this);
    }

    changeScore(e) {
        var score = e.target.value;
        this.state.keyResult.score = score;
        this.setState({
            keyResult: this.state.keyResult
        })

        if (e.target.value == 1)
            e.target.previousElementSibling.classList.add('completed');
        else
            e.target.previousElementSibling.classList.remove('completed')
        this.props.changeScore(this.state.keyResult);

    }

    render() {
        if (this.state.keyResult.score == 1)
            return (
                <li className="key-result">
                    <div><span className='completed'>{this.props.item.title}</span></div>

                    <input type="range" min="0" max="1" step="0.1" className="keyScore"
                           value={this.state.keyResult.score} onChange={this.changeScore}/>
                    <div><span className='score'>{this.state.keyResult.score}</span></div>
                </li>
            )
        else
            return (
                <li className="key-result">
                    <div><span>{this.props.item.title}</span></div>

                    <input type="range" min="0" max="1" step="0.1" className="keyScore"
                           value={this.state.keyResult.score} onChange={this.changeScore}/>
                    <div><span className='score'>{this.state.keyResult.score}</span></div>
                </li>
            )
    }
}

export default KeyResult