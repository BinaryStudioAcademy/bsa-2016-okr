import React from 'react'
import Header from "../../containers/header.jsx";
import NavMenu from "../nav-menu.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import CentralPage from "../../containers/central-page.jsx";
import HistoryItem from './history-item'
import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search'
import './history-page.scss'
import historyMock from '../mockData/historyPageMock'

class HistoryPage extends React.Component {

	constructor() {
		super();
		this.state = {
			items: historyMock
		}
	}

	render() {

		return(
			<div>
				<Header/>
				<NavMenu />
				<CentralPage>
					<div className="history-page">
						<div id="top-panel">
							<div className="history-page-header">
								<div className="history-page-title">
									History
								</div>
								<div className="history-search-bar-container">
									<HistorySearch/>
								</div>
							</div>
							<HistoryQurterBar/>
						</div>

						<div className="history-items-list">
						{this.state.items.map((item, i) => {
							return(<HistoryItem key={item.id} item={item}/>)
						})}
						</div>
					</div>
				</CentralPage>
				<StatPanel/>
			</div>
		)
	}
}

export default HistoryPage