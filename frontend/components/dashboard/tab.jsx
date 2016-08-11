import React from "react";

export default class Tab extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}