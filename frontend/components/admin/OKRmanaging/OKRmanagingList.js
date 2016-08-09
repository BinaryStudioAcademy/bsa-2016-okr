import React from 'react';
import Header from "../../../containers/header.jsx";
import NavMenu from "../../common/nav-menu.jsx";
import Search from '../../common/search-bar.jsx';
import MainPage from '../../../containers/main-page.jsx';
import CentralWindow from "../../../containers/central-window.jsx";
import StatPanel from "../..//../containers/statistic-panel.jsx";
import OKRmanagingItem from './OKRmanagingItem.js'

import './OKRmanagingList.scss';

var OKRmanagingItems = [{
    id: "000001",
    objTitle: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Walter Ahumada",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
},
{
    id: "000002",
    objTitle: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Lakeisha Breen",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
}, {
    id: "000003",
    objTitle: "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Jayna Bhatti",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
},
{
    id: "000004",
    objTitle: "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Parker Hohlt",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
},
{
    id: "000005",
    objTitle: "5 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Leana Bowley",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
},
{
    id: "000006",
    objTitle: "6 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Neva April",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
},
{
    id: "000007",
    objTitle: "7 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Epifania Leo",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
},
{
    id: "000008",
    objTitle: "8 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Nam Beaudin",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
},
{
    id: "000009",
    objTitle: "9 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Luana Hack",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
},
{
    id: "000010",
    objTitle: "10 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    category: "Knowledge",
    ownerName: "Son Gossage",
    keyResults: [
        {
            created: "2016-05-22T10:50:12.643Z",
            title: "sed do eiusmod tempor incididunt",
            completed: "true",
            completedDate: "2016-06-22T10:50:12.643Z",
            score: "0.1"
        },
        {
            created: "2016-05-22T10:51:12.643Z",
            title: "incididunt ut labore et dolore",
            completed: "false",
            completedDate: "",
            score: "0.1"
        }
    ],
}];



export default class OKRmanagingList extends React.Component {
    constructor() {
        super();

        this.state = {
            showObjectives:[]
        }

    } 

    componentDidMount() {
        this.setState({showObjectives: OKRmanagingItems})
    }  

    handleRemoveUObjective (event, item) {
        if(confirm('Are you sure you want to delete this item?')) {
            console.log(item);

            var index = this.state.showObjectives.indexOf(item);
            var OKRmanagingItems = this.state.showObjectives.slice();
            OKRmanagingItems.splice(index, 1);

            this.setState({showObjectives: OKRmanagingItems})

        }
    } 

    render() {
        
        return (
            <div>
                <Header >
                    <Search />
                </Header>
                <NavMenu />
				<MainPage>
					<CentralWindow>
						<div id="tableID"> 
							<table className="table-list" data-currentpage={1}>
							  <thead>
								<tr><th><button type="button" className="sort" data-sort="sortID">#<i className="caret" /></button></th>
								  <th><button type="button" className="sort" data-sort="sortDesc">First name, last name<i className="caret" /></button></th>
								  <th><button type="button" className="sort" data-sort="sortDesc">Description<i className="caret" /></button></th>
								  <th>Options<i className="caret" /></th>
								</tr></thead>
							  <tbody className="list">

								{
									this.state.showObjectives.map((objective, index) => {
										return <OKRmanagingItem key={index} id={objective.id} objTitle={objective.objTitle} ownerName={objective.ownerName} state={this.state.showObjectives} />
									})                        
								}              
								
							  </tbody>
							  <tfoot>
								<tr>
								  <td colSpan={3} className="table-footer">
									<div className="table-pagination">
									  <button type="button" className="btn-tablepage jTablePagePrev">«</button>
									  <ul className="pagination" />
									  <button type="button" className="btn-tablepage jTablePageNext">»</button>
									</div>
									<div className="table-filter ">
									  <i className="fa fa-search" aria-hidden="true"></i> <input className="search " placeholder="Search " />
									</div>
								  </td>
								</tr>
							  </tfoot>
							</table>
						</div>
					</CentralWindow>
					<StatPanel></StatPanel>
				</MainPage>
            </div>
			
        )
    }
}
