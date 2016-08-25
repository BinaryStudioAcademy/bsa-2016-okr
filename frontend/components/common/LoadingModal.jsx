import React, { Component } from 'react';
import './loadingModal.scss';

var LoadingModal = (props) => {
	const visibility = props.show ? '' : 'hide';
	return (
		<div className={`loading-modal ${visibility}`}>
			<div className="circle"></div>
		</div>
		);
}

export default LoadingModal;