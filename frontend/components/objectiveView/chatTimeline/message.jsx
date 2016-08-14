import React from 'react';

class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"message-box " + this.props.position}>
                <div className="picture">
                    <img src={this.props.message.img} title="user name" />
                    <span className="time">{this.props.message.date}</span>
                </div>
                <div className="message">
                    <span>{this.props.message.name}</span>
                    <p>{this.props.message.text}</p>
                </div>
            </div>
        );
    }
}

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = { position: "left-img" };
        this.newPosition = this.newPosition.bind(this);
    }

    newPosition() {
        var pos = (this.state.position === "left-img" ? "right-img" : "left-img");
        return this.setState(
            { position: pos }
        )
    }

    render() {
        return (
            <div>
                {this.props.messages.map((m, i) => <ChatMessage
                    key ={i}
                    message= {m}
                    position = {i % 2 === 0 ? "left-img" : "right-img" }/>) }
            </div>
        )
    }
}