import React from 'react'
import HistoryItem from './history-item'
import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search'
import './history-page.scss'
import historyMock from './historyPageMock'

class HistoryPage extends React.Component {

	constructor() {
		super();
		this.state = {
			items: historyMock
		}
	}

	render() {

		return(
			<div className="history-page">
				<div className="history-page-header">
					<div className="history-page-title">
						<h2>History</h2>
					</div>
					<div className="history-search-bar-container">
						<HistorySearch/>
					</div>
				</div>
				<HistoryQurterBar/>
				<div className="history-items-list">
				{this.state.items.map((item, i) => {
					return(<HistoryItem key={item.id} item={item}/>)
				})}
				</div>
			</div>
		)
	}
}

export default HistoryPage