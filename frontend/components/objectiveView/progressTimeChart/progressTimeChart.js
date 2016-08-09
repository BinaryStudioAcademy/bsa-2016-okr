import React from 'react';
import './progressTimeChart.css';

export default class ProgressTimeChart extends React.Component {

    render() {
        
        return (
         <div className="progressTimeChart">
	        <table id="q-graph">
	          <caption>Key Results</caption>
	          <tbody>
	            <tr className="qtr" id="q1">
	              <th scope="row">Q1-Q2</th>
	              <td className="progress bar" style={{height: 45}}><p>15%</p></td>
	              <td className="regress bar" style={{height: 75}}><p>25%</p></td>
	            </tr>
	            <tr className="qtr" id="q2">
	              <th scope="row">Q3-Q4</th>
	              <td className="progress bar" style={{height: 120}}><p>35%</p></td>
	              <td className="regress bar" style={{height: 165}}><p>45%</p></td>
	            </tr>
	            <tr className="qtr" id="q3">
	              <th scope="row">Q5-Q6</th>
	              <td className="progress bar" style={{height: 195}}><p>65%</p></td>
	              <td className="regress bar" style={{height: 270}}><p>90%</p></td>
	            </tr>
	          </tbody>
	        </table>
	        <div id="ticks">
	          <div className="tick" style={{height: 59}}><p>100%</p></div>
	          <div className="tick" style={{height: 59}}><p>80%</p></div>
	          <div className="tick" style={{height: 59}}><p>60%</p></div>
	          <div className="tick" style={{height: 59}}><p>40%</p></div>
	          <div className="tick" style={{height: 59}}><p>20%</p></div>
	        </div>
      </div>
        )
    }
}
