import React from 'react';
import "./main-page.scss";

const MainPage = (props) => {
	return (
		<div id="main">
			{ props.children }
		</div>
	);
}

export default MainPage;