import React, { Component } from 'react';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import Objective from "./objective/objective.js";
import ChatTimeline from "./chatTimeline/chatTimeline.js";
import './objectiveView.css';



export default class ObjectiveView extends Component {
    render() {
        return (
            <div>
	            <CentralWindow>
					<Objective />
				</CentralWindow>
				<StatPanel>
					<ChatTimeline />
				</StatPanel>
      		</div>
        )
    }
}
