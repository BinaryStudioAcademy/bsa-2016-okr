import React, { Component } from 'react';
import UserList from './components/UserList';
import Searchbar from './components/Searchbar';
import ActiveUser from './components/ActiveUser';
import Toolbar from './components/Toolbar';
import './OKRmanaging.scss';

var objectives = [{
	"id": "000001",
	"objTitle": "Take the Landmark Forum Training",
	"category": "Knowledge",
	"ownerName": "Walter Ahumada",
	"keyResults": [
		{
			"created": "2016-05-22T10:50:12.643Z",
			"title": "Read cool ruby -book name-",
			"completed": "true",
			"completedDate": "2016-06-22T10:50:12.643Z",
			"score": "1"
		},
		{
			"created": "2016-05-22T10:51:12.643Z",
			"title": "Sutup env for coding",
			"completed": "false",
			"completedDate": "",
			"score": "0.1"
		}
	]
}, {
	"id": "000002",
	"objTitle": "Create a dynamic coaching and training community with 50 or more members",
	"category": "Knowledge",
	"ownerName": "Lakeisha Breen"

}, {
	"id": "000003",
	"objTitle": "Receive the CPAE designation from the National Speakers Association",
	"category": "Knowledge",
	"ownerName": "Jayna Bhatti"

}, {
	"id": "000004",
	"objTitle": "Create a curriculum guide for a college course based on The Success Principles",
	"category": "Knowledge",
	"ownerName": "Parker Hohlt"

}, {
	"id": "000005",
	"objTitle": "Develop a leadership training",
	"category": "Knowledge",
	"ownerName": "Leana Bowley"

}, {
	"id": "000006",
	"objTitle": "Type 150 words a minute",
	"category": "Knowledge",
	"ownerName": "Neva April"

}, {
	"id": "000007",
	"objTitle": "Give a talk to an audience of 10,000 people ",
	"category": "Knowledge",
	"ownerName": "Epifania Leo"

}, {
	"id": "000008",
	"objTitle": "Learn to speak Spanish fluently",
	"category": "Knowledge",
	"ownerName": "Nam Beaudin"

}, {
	"id": "000009 ",
	"objTitle": "position as a software tester ",
	"category": "Knowledge",
	"ownerName": "Luana Hack"

}, {
	"id": "000010",
	"objTitle": "Produce a PBS program",
	"category": "Knowledge",
	"ownerName": "Son Gossage"

}];


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: objectives,
      active: 0,
      term: ''
    };

  }

	updateData(config) {
		this.setState(config);
	}

render() {
    return (
		<div className="OKR-managing app container">

			  <div className="OKR-managing search">
			    <Searchbar
			      term={this.state.term}
			      data={this.state.data}
			      update={this.updateData.bind(this)}
			    />
			  </div>


			<div className="OKR-managing toolbar">
				<Toolbar data={this.state.data} update={this.updateData.bind(this)} />
			</div>


			<div className="OKR-mnaging active user">
				<ActiveUser data={this.state.data} active={this.state.active} />
			</div>
			<div className="OKR-managing user-list">
				<UserList data={this.state.data} update={this.updateData.bind(this)} />
			</div>

		</div>

    );
  }
}