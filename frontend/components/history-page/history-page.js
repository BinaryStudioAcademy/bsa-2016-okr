import React from 'react'
import Header from '../../containers/header.jsx';
import MainPage from '../../containers/main-page.jsx';
import ListOfUsers from '../list-of-users/list-of-users.js';
import NavMenu from '../nav-menu.jsx';
import StatPanel from '../../containers/statistic-panel.jsx';
import CentralWindow from "../../containers/central-window.jsx";
import HistoryItem from './history-item'
import HistoryQurterBar from './history-quarter-bar'
import HistorySearch from './history-search'
import './history-page.scss'
import historyMock from '../mockData/historyPageMock'

class HistoryPage extends React.Component {

	constructor() {
		super();
		this.state = {
			items: historyMock,
			searchValue: '',
			id: '',
			data: [
				{
					id: 0,
					name: 'Kelly Bloom',
					photo: 0
				},
				{
					id: 1,
					name: 'Josh Peterson',
					photo: 0
				},
				{
					id: 2,
					name: 'Sahan Roman',
					photo: 0
				},
				{
					id: 3,
					name: 'Taras Barladun',
					photo: 0
				},
				{
					id: 4,
					name: 'Roman Vintish',
					photo: 0
				}
			]
		}
		this.search = this.search.bind(this);
		this.takeUser = this.takeUser.bind(this);
	}

	takeUser(id) {
		this.setState({
			id: id
		})
	}

	search(value) {
		this.setState({
			searchValue: value
		})
	}

	render() {

		return(
			<div>
				<Header/>
				<NavMenu />
				<MainPage>
					<CentralWindow>
						<ListOfUsers takeUser={this.takeUser} search={this.search}
									 searchValue={this.state.searchValue} data={this.state.data} />
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
					</CentralWindow>
					<StatPanel/>
				</MainPage>

			</div>
		)
	}
}

export default HistoryPage