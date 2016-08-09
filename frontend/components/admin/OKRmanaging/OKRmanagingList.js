import React from 'react';
import Header from "../../../containers/header.jsx";
import NavMenu from ".././../nav-menu.jsx";
import Search from '.././../search-bar.jsx';
import MainPage from '../../../containers/main-page.jsx';
import CentralWindow from "../../../containers/central-window.jsx";
import StatPanel from "../../../containers/statistic-panel.jsx";
import OKRmanagingItem from './OKRmanagingItem.js'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/admin/OKRmanagingActions";

import './OKRmanagingList.scss';

const objectiveList = [{
    id: "000001",
    objTitle: "Take the Landmark Forum Training",
    category: "Knowledge",
    ownerName: "Walter Ahumada"    
},
{
    id: "000002",
    objTitle: "Create a dynamic coaching and training community with 50 or more members",
    category: "Knowledge",
    ownerName: "Lakeisha Breen"
   
}, {
    id: "000003",
    objTitle: "Receive the CPAE designation from the National Speakers Association",
    category: "Knowledge",
    ownerName: "Jayna Bhatti"
   
},
{
    id: "000004",
    objTitle: "Create a curriculum guide for a college course based on The Success Principles",
    category: "Knowledge",
    ownerName: "Parker Hohlt"
   
},
{
    id: "000005",
    objTitle: "Develop a leadership training",
    category: "Knowledge",
    ownerName: "Leana Bowley"
    
},
{
    id: "000006",
    objTitle: "Type 150 words a minute",
    category: "Knowledge",
    ownerName: "Neva April"
    
},
{
    id: "000007",
    objTitle: "Give a talk to an audience of 10,000 people ",
    category: "Knowledge",
    ownerName: "Epifania Leo"
    
},
{
    id: "000008",
    objTitle: "Learn to speak Spanish fluently",
    category: "Knowledge",
    ownerName: "Nam Beaudin"
    
},
{
    id: "000009",
    objTitle: "position as a software tester ",
    category: "Knowledge",
    ownerName: "Luana Hack",
    
},
{
    id: "000010",
    objTitle: "Produce a PBS program",
    category: "Knowledge",
    ownerName: "Son Gossage"
    
}];



export default class OKRmanagingList extends React.Component {
    constructor() {
        super();

        this.state = {
            showObjectives:[],
            search: ""
        }

        this.handleRemoveObjective = this.handleRemoveObjective.bind(this);
       /* this.handleOjectiveSearch = this.handleObjectiveSearch.bind(this);*/

    } 

    componentDidMount() {
        this.setState({showObjectives: objectiveList});
        console.log(objectives)
    } 

    componentWillReceiveProps(nextProps) {
        this.setState({
            showObjectives: nextProps.showObjectives,
            search: nextProps.search
        })
    } 

    handleRemoveObjective (event, item) {
        if(confirm('Are you sure you want to delete this item?')) {

            var index = this.props.stateFromReducer.showObjectives.indexOf(item);
            var objectiveList = this.props.stateFromReducer.showObjectives.slice();
            objectiveList.splice(index, 1);

            this.props.removeObjective ({showObjectives: objectiveList})

        }
    } 

/*    handleObjectiveSearch(event){

        this.props.objectiveSearch({search: event.target.value.substr(0, 20)});
    }*/

    render() {


/*        let filteredObjectives = this.props.stateFromReducer.showObjectives.filter(
            (objective) => {
                return objective.objTitle.toLowerCase().indexOf(this.props.stateFromReducer.search.toLowerCase()) !== -1;
            }
        );*/
        
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
								  <th><button type="button" className="sort" data-sort="sortDesc">Objective Title<i className="caret" /></button></th>
                                  <th><button type="button" className="sort" data-sort="sortDesc">Category<i className="caret" /></button></th>
								  <th>Options<i className="caret" /></th>
								</tr></thead>
							  <tbody className="list">

								{
									this.props.stateFromReducer.showObjectives.map((objective, index) => {
										return <OKRmanagingItem key={index} id={objective.id} objTitle={objective.objTitle} ownerName={objective.ownerName} category = {objective.category} state={this.props.stateFromReducer.showObjectives} handleRemoveObjective ={this.handleRemoveObjective.bind(null, objective)} />
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
									  <i className="fa fa-search" aria-hidden="true"></i> <input className="search " placeholder="Search" onChange={this.handleObjectiveSearch} />
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}

const OKRmanagingListConnected = connect(mapStateToProps, mapDispatchToProps)(OKRmanagingList);
export default OKRmanagingListConnected;
