import React from 'react';

export default ({ term, data, update }) => {

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
};
