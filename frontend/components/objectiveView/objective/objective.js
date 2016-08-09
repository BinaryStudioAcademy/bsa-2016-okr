import React from 'react';
import './objective.css';

import KeyResults from "../keyResults/keyResults.js";
import ProgressTimeChart from "../progressTimeChart/progressTimeChart.js";
import PieChart from "../pieChart/pieChart.js";
import CoWorker from "../coWorker/coWorker.js";

export default class Objective extends React.Component {

    render() {

        return (
            <div className="objective-container">
                <div className="objective-user">
                    <div className="img user">
                        <img src="http://static1.squarespace.com/static/5432fb86e4b0a2c1da894800/t/54f8e985e4b0e3b41a3efe03/1425598853953/Avatar+%5Bcircle%5D.png" />
                    </div>

                    <div className="objective-settings">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i><i className="fa fa-trash-o" aria-hidden="true"></i>
                    </div>

                    <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                    <p className="objective-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur                    
                    </p>

                    <div className="objective-date"> 
                        <p><i className="fa fa-clock-o" aria-hidden="true"></i>Due date: 20/08/2016</p>
                        <p><i className="fa fa-calendar-plus-o" aria-hidden="true"></i>Created: 01/06/2016</p>
                        <p><i className="fa fa-calendar-check-o" aria-hidden="true"></i>Modified: 05/08/2016</p>
                    </div> 

                    <div className="result">
                    <span style={{width: '59%'}}></span><i className="fa fa-check-square" aria-hidden="true"><span>1/2</span></i>
                    </div>

                    <div className="details">
                    <span><i className="fa fa-users" aria-hidden="true"></i>3</span> <span><i className="fa fa-eye" aria-hidden="true"></i>4</span> <span><i className="fa fa-comments" aria-hidden="true"></i>10</span><span><i className="fa fa-user-plus" aria-hidden="true"></i>6</span>
                    </div>
                </div>

                <KeyResults />

                <div className="objective-charts">
                    <ProgressTimeChart />
                    <PieChart />
                </div>               

                <CoWorker />

            </div>
        );
    }
}
