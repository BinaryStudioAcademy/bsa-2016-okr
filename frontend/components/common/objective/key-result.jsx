import React, { Component } from 'react';
import { debounce } from '../../../../backend/utils/HelpService';
const session = require('../../../../backend/config/session');

class KeyResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: this.props.item.score
    };

    this.changeScore = debounce(this.changeScore.bind(this), 500);
    this.onChange = this.onChange.bind(this);
    this.handleDelKeyResult = this.handleDelKeyResult.bind(this);
  }

  handleDelKeyResult() {
    var confirmed = confirm("Do you really want to delete this key result?");

    if (confirmed) {
      this.props.softDeleteObjectiveKeyResultByIdApi(this.props.objectiveId, this.props.item._id);
    }
  }

  changeScore() {
    this.props.changeScore(this.state.score);
  }

  onChange(e) {
    var score = e.target.value;

    this.setState({
      score: score
    });
  }

  render() {

    const item = this.props.item;
    let score;
    let rangeEl;
    let deleteEl;

    if(this.props.id == session._id || this.props.myId == session._id){
      score = this.state.score;
      rangeEl =(
        <input type="range" min="0" max="1" step="0.1" className="range keyScore"
        value={ score } onMouseUp={ this.changeScore } onChange={ this.onChange }/> 
      );
      deleteEl = (
        <button
          type="button"
          className="btn btn-red-hover key-result-delete-button"
          onClick={ this.handleDelKeyResult }>
          <i className="fi flaticon-garbage-2" aria-hidden="true"></i>
        </button> 
      );
    } else {
      score = this.props.item.score;
    }
    
    return (
      <li className="key-result">
        <div className='key-result-title'>{ item.templateId.title }</div>
        { deleteEl }
        <span className='score'>{ score }</span>
        { rangeEl }
        
        <div className={ `difficulty ${item.templateId.difficulty}` } title={item.templateId.difficulty}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
      </li>
    )
  }
}

export default KeyResult
