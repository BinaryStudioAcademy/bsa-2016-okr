import React, { Component } from 'react';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.sorted = { ownerName: true, objTitle: true };
  }

  sort(type) {
    const { update, data } = this.props;
    const isSorted = this.sorted[type];
    let direction = isSorted ? 1 : -1;

    const sorted = [].slice.call(data).sort((a, b) => {
      if (a[type] === b[type]) { return 0; }
      return a[type] > b[type] ? direction : direction * -1;
    });

    this.sorted[type] = !isSorted;

    update({
      data: sorted,
      active: 0
    });
  }

  reset() {
    this.props.update({
      data: this.props.objectives,
      term: '',
      active: 0,
      editing: false
    });
  }

  render() {
    return (
      <div className="toolbar">
        <button className="btn btn-default" onClick={() => this.sort('ownerName')}>
          <i className="fa fa-sort"></i>  Sort by name
        </button>

        <button className="btn btn-default" onClick={() => this.sort('objTitle')}>
          <i className="fa fa-sort"></i>  Sort by objective
        </button>

        <button className="btn btn-default" onClick={() => this.sort('category')}>
          <i className="fa fa-sort"></i>  Sort by category
        </button>

        <button className="btn btn-danger" onClick={this.reset.bind(this)}>
          <i className="fa fa-ban"></i>  Reset
        </button>
      </div>
    )
  }
}
