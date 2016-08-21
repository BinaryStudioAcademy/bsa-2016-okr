import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../../actions/okrManagingActions.js";

class SearchBar extends React.Component{
  constructor(props){
    super(props);
  }
  
  searchObjective(e){
    this.props.searchObjective(e.target.value); 
  }
  render(){
    return (
      <div className="OKR-managing searchbar">
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search objective..."
          onChange={this.searchObjective.bind(this)}
        /> 
      </div>
  )
  }

}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
  return {
    objectivesList: state.okrManaging
  };
}

const SearchBarConnected = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export default SearchBarConnected



/*export default ({ term, data, update }) => {

  const dataSearch = e => {
    const value = e.target.value.toLowerCase();

    const filter = data.filter(objective => {
      return objective.title.toLowerCase().includes(value);
    });

    update({
      data: filter,
      active: 0,
      term: value
    });
    
  };

  return (
    <div className="OKR-managing searchbar">
      <input
        value={term}
        type="text"
        className="searchbar-input"
        placeholder="Search objective..."
        onChange={dataSearch}
      /> 
    </div>
  );
};*/
