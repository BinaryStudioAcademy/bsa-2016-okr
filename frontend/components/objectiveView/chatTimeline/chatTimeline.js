import React from 'react';
import './chatTimeline.css';

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

	          <div className="message-box left-img">	            
	            <div className="picture">
	              <img src="https://images.onmogul.com/uploads/user/avatar/3023886/large_Comic_Face_Circle_Cropped.png?ixlib=rails-0.3.2&s=a0f8a8a8e78e7a7a95c6465f02dd0ee2" title="user name" />
	              <span className="time">10 mins</span>
	            </div>

	            <div className="message">
	              <span>Lorem ipsum 1</span>
	              <p>Lorem ipsum dolor sit amet?</p>
	            </div>
	          </div>

	          <div className="message-box right-img">
	            <div className="picture">
	              <img src="https://media.creativemornings.com/uploads/user/avatar/120448/profile-circle.png" title="user name" />
	              <span className="time">2 mins</span>
	            </div>
	            <div className="message">
	              <span>Lorem ipsum 2</span>
	              <p> Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
	            </div>
	          </div>

	          <div className="enter-message">
	            <input type="text" placeholder="Enter your message.." />
	            <a href="#" className="send">Send</a>
	          </div>
	          
	        </div>
	      </div>
        )
    }
}
