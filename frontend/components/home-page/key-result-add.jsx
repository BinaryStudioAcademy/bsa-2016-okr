import React from 'react';
import './key-result-add.scss';

class KeyResult extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelKeyRes = this.handleDelKeyRes.bind(this);
    }

    handleDelKeyRes() {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <li className="keyresult-group">
                <section>
                    <div>
                        <input className="input-key-result" type="text" placeholder="Key result name"/>
                    </div>
                    <div>
                        <button type="button" className="btn btn-blue-hover add-button-key-result"
                                onClick={this.handleDelKeyRes}>
                            <i className="fi flaticon-add" aria-hidden="true"></i>
                        </button>

                    </div>
                    <div>

                        <button type="button" className="btn btn-red-hover delete-button-key-result"
                                onClick={this.handleDelKeyRes}>
                            <i className="fi flaticon-garbage-2" aria-hidden="true"></i>
                        </button>
                    </div>
                </section>
            </li>
        )
    }
}


export default KeyResult;

