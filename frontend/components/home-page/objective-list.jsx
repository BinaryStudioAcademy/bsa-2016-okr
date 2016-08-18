import React from 'react';
import ObjectiveItem from './objective.jsx';
import ObjectiveInput from '../new-objective/objectiveInput.jsx';

class ObjectiveList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div id="project-category" className="category">
                    <p><span>Knowledge</span></p>
                    <ObjectiveInput/>
                    {
                        this.props.objectives.filter((el) => {
                        	if( el.props.category == "Projects")
                        		// console.log( el);
                           		return true;
                        })
                    }
                </div>
                <div id="knowledge-category" className="category">
                    <p><span>Expertise</span></p>
                    <ObjectiveInput/>
                    {
                        this.props.objectives.filter((el) => {
                        	if( el.props.category == "Knowledge" )
                        		// console.log( el);
                            	return true;
                        })
                    }
                </div>
                <div id="expertise-category" className="category">
                    <p><span>Projects</span></p>
                    <ObjectiveInput/>
                    {
                        this.props.objectives.filter((el) => {
                        	if( el.props.category == "Expertise")
                        		// console.log( el);
                            	return true;
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ObjectiveList;
