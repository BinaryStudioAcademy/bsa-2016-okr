import React, { Component } from 'react';
import './loadingScreen.scss';

var LoadingScreen = (props) => {
	const visibility = props.show ? '' : 'hide';
	
	const loadingScreenInlineStyles = {
		fontFamily: 'Arial, sans-serif',
		position: 'fixed',
		overflow: 'hidden',
		backgroundColor: '#2c3e50', // $primary-color
		zIndex: 99999,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	};

	const titleInlineStyles = {
		color: '#fefefe', // $color-white
		fontSize: '4em',
		textAlign: 'center',
		lineHeight: '100%',
		width: '100%',
		height: '100%',
		marginTop: '20%',
	};

	const binaryInlineStyles = {
		fontSize: '1.5em',
	};

	const studioInlineStyles = {
		lineHeight: 0.9,
		marginLeft: '4.3em',
		fontSize: '0.4em',
		color: '#ffa502', // $color-orange
	};

	const dotsInlineStyle = {
		display: 'inline-block',
		overflow: 'hidden',
		width: '5em',
	};

	const dotInlineStyle = {
		display: 'inline-block',
	};

	const okrInlineStyle = {
		fontSize: '1.5em',
		lineHeight: '2em',
	};

	return (
		<div className={`loading-screen ${visibility}`} style={ loadingScreenInlineStyles }>
			<div className="title" style={ titleInlineStyles } >
				<p className="binary" style={ binaryInlineStyles } >Binary</p>
				<p className="studio" style={ studioInlineStyles } >studio</p>
				<div>
					<div className="dots" style={ dotsInlineStyle } >
						<div className="dot" style={ dotInlineStyle } ></div>
						<div className="dot" style={ dotInlineStyle } ></div>
						<div className="dot" style={ dotInlineStyle } ></div>
					</div>
				</div>
				<p className="okr" style={ okrInlineStyle } >OKR</p>
			</div>
		</div>
		);
}

export default LoadingScreen;