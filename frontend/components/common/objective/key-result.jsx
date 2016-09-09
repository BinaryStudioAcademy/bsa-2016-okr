import React, { Component } from 'react';
import Rating from '../rating/rating.jsx';
import { debounce, getDifficultyNumber } from '../../../../backend/utils/HelpService';
const session = require('../../../../backend/config/session');
import sweetalert from 'sweetalert';
import '../styles/sweetalert.css';

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
    let handler = function() {
      this.props.softDeleteObjectiveKeyResultByIdApi(this.props.objectiveId, this.props.item._id);
    }.bind(this);

    sweetalert({
      title: "Do you really want to delete this key result?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      confirmButtonText: "OK",
      closeOnConfirm: true
    }, function(){handler();});
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

//<div className={ `difficulty ${item.templateId.difficulty}` } title={item.templateId.difficulty}>
//<div></div>
//<div></div>
//<div></div>
//</div>

  render() {
    let isArchived = this.props.isArchived;
    const item = this.props.item;
    let score;
    let rangeEl;
    let deleteEl;

    let rating = getDifficultyNumber(item.templateId.difficulty);

    if(!isArchived){
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
        <Rating
          rating = { rating }
        />
        <span className='difficulty-label'>Difficulty:</span>

      </li>
    )
  }
}

export default KeyResult
