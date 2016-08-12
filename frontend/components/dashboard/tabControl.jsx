import React from 'react';

class TabControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: this.props.selected };
        this.labels = this.labels.bind(this);
    }

    handleClick(index, event) {
        this.setState({
            selected: index
        });
    }

    labels(child, index) {
        let activeClass = (this.state.selected === index ? 'active' : '');
        return (
            <li key={index} className={activeClass} onClick={this.handleClick.bind(this, index) }>
                {child.props.label}
            </li>
        );
    }

    render() {
        return (
            <div >
                <div className="tabPanel">
                    <ul className="tabs">
                        {this.props.children.map(this.labels) }
                    </ul>
                </div>
                <div className="tabs__content">
                    {this.props.children[this.state.selected]}
                </div>
            </div>
        );
    }
}

TabControl.defaultProps = { selected: 0 };

export default TabControl;