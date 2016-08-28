import React from 'react';
import ChartStats from './chartStats.jsx';
import axios from 'axios';

export default class BarStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            keyResults: []
        }
    }
    
    withoutId(obj) {
        return {
            title: obj.title,
            score: obj.score
        }
    };

    componentDidMount() {
        axios.get('api/stats/categories').then((response) => { this.setState({ categories: response.data.map(el => this.withoutId(el)) }); });
        axios.get('api/stats/keyresults').then((response) => { this.setState({ keyResults: response.data.map(el => this.withoutId(el)) }); });
    };

    toArray(obj) {
        var rez = [];
        for (var i in obj) {
            rez.push(obj[i]);
        }
        return rez;
    }

    render() {
        return (
            <div className="barStats">
                <ChartStats title = "Chart by categories" data={[['Category', 'AVG Score']].concat(this.state.categories.map(this.toArray)) } />
                <ChartStats title = "Chart by difficulty" data = {[['Difficulty', 'AVG Score']].concat(this.state.keyResults.map(this.toArray)) } />
            </div>
        )
    }

}