import React, { Component } from 'react';
import './loadingScreen.scss';

var LoadingScreen = (props) => {
	return (
		<div className="loading-screen show">
			<div className="title">
				<p className="binary">Binary</p>
				<p className="studio">studio</p>
				<div>
					<div className="dots">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
				</div>
				<p className="okr">OKR</p>
			</div>
		</div>
		);
}

export default LoadingScreen;