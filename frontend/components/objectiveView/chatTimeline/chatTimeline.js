import React from 'react';
import Message from './message.jsx';
import './chatTimeline.css';

var messages = [
	{
		id: 0,
		name: "Elen",
		img: "https://images.onmogul.com/uploads/user/avatar/3023886/large_Comic_Face_Circle_Cropped.png?ixlib=rails-0.3.2&s=a0f8a8a8e78e7a7a95c6465f02dd0ee2",
		date: "12.08.2016 16:00",
		text: "Hello! How are you?"
	},
	{
		id: 1,
		name: "Greg",
		img: "https://media.creativemornings.com/uploads/user/avatar/120448/profile-circle.png",
		date: "12.08.2016 16:10",
		text: "Hello! I`m fine, and you?"
	}];

export default class ChatTimeline extends React.Component {
	render() {

		return (
			<div className="chat-container">
				<div className="chat-header">
					<div>
						<h2>Timeline</h2>
					</div>
					<div>
						<h2>Messages</h2>
					</div>
				</div>

				<div className="chat-box">
					<Message messages={messages}/>
					<div className="enter-message">
						<input type="text" placeholder="Enter your message.." />
						<a href="#" className="send">Send</a>
					</div>

				</div>
			</div>
		)
	}
}
