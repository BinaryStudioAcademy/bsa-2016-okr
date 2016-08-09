import React from 'react';
import './pieChart.css';

export default class PieChart extends React.Component {

    render() {
        
        return (
         	<div id="wrapper">
		        <div id="header">
		              <div id="q4_2009">
		                <div id="q3_2009">
		                  <div id="q2_2009">
		                    <div id="q1_2005">		                      
		                      <div id="chart_holder">
		                        <div id="pie_chart">
		                          <ul>
		                            <li id="c1_r"><p><span className="pie_left" /></p></li> 	
		                            <li id="c1_l"><p><span className="pie_right" /></p></li>
		                            <li id="c2_r"><p><span className="pie_left" /></p></li> 	
		                            <li id="c2_l"><p><span className="pie_right" /></p></li>
		                            <li id="c3_r"><p><span className="pie_left" /></p></li> 	
		                            <li id="c3_l"><p><span className="pie_right" /></p></li>
		                            <li id="c4_r"><p><span className="pie_left" /></p></li> 	
		                            <li id="c4_l"><p><span className="pie_right" /></p></li>
		                            <li id="c5_r"><p><span className="pie_left" /></p></li> 	
		                            <li id="c5_l"><p><span className="pie_right" /></p></li>
		                          </ul>
		                        </div>
		                      </div>
		                      <div id="btn_panel">
		                        <ul>
		                          <li><a href="#q1_2005"><span>Q1</span></a></li>
		                          <li><a href="#q2_2009"><span>Q2</span></a></li>
		                          <li><a href="#q3_2009"><span>Q3</span></a></li>
		                          <li><a href="#q4_2009"><span>Q4</span></a></li>
		                        </ul>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		              </div>
		        </div>
      		</div>
        )
    }
}
