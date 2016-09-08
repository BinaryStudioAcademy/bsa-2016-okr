import React from 'react';

const SearchBar = props => {
	return (
		<div className="OKR-managing searchbar">
			<input
				type="text"
				className="searchbar-input"
				placeholder="Search objective"
				onChange={ props.searchObjective }
			/> 
		</div>
	);
}

export default SearchBar;