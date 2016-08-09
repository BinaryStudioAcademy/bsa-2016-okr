import React, { Component } from 'react';

import Header from "../../containers/header.jsx";
import NavMenu from ".././nav-menu.jsx";
import Search from '.././search-bar.jsx';
import MainPage from '../../containers/main-page.jsx';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import Objective from "./objective/objective.js";
import ChatTimeline from "./chatTimeline/chatTimeline.js";
import './objectiveView.css';



export default class ObjectiveView extends Component {
    render() {
        return (
            <div>
	            <Header >
					<Search />
				</Header>
				<NavMenu />
				<MainPage>
					<CentralWindow>
						<Objective />
					</CentralWindow>
					<StatPanel>
						<ChatTimeline />
					</StatPanel>
				</MainPage>
      		</div>
        )
    }
}
