import React from 'react'
import HistoryItem from './history-item'
import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search'
import './history-page.scss'

class HistoryPage extends React.Component {

	constructor() {
		super();
		let now = new Date();
		let date = ('0' + now.getDate()).slice(-2) + ' / ' + ('0' + (now.getMonth() + 1)).slice(-2) + ' / ' + now.getFullYear();
		this.state = {
			items: [
				{
					id: 0,
					authorId: 0,
					typeId: 0,
					type: 'Edit name',
					date: date
				},
				{
					id: 1,
					authorId: 0,
					typeId: 0,
					type: 'Edit key result',
					date: date
				},
				{
					id: 2,
					authorId: 0,
					typeId: 0,
					type: 'Edit key result',
					date: date
				},
				{
					id: 3,
					authorId: 0,
					typeId: 0,
					type: 'Edit key result',
					date: date
				},
				{
					id: 4,
					authorId: 0,
					typeId: 0,
					type: 'Edit key result',
					date: date
				}
			]
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