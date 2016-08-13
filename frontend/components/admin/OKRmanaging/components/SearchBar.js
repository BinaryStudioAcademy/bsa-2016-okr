import React from 'react';

export default ({ term, data, update }) => {

  const dataSearch = e => {
    const value = e.target.value.toLowerCase();

    const filter = data.filter(objective => {
      return objective.ownerName.toLowerCase().includes(value);
    });

    update({
      data: filter,
      active: 0,
      term: value
    });
    
  };

  return (
    <div className="searchbar form-group">
      <input
        value={term}
        type="text"
        className="form-control"
        placeholder="Search user by name..."
        onChange={dataSearch}
      /> 
    </div>
  );
};
