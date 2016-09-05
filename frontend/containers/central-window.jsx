import React from 'react';
import "./central-window.scss";

const CentralWindow = (props) => {
	return(
		<div id="central-window" className={ props.fullScreen ? 'full-screen' : '' } >
			<div className="main-content">
				{ props.children }
			</div>
		</div>
	);
}

export default CentralWindow;