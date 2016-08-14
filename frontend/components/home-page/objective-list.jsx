import React from 'react';
import ObjectiveItem from './objective.jsx';


class ObjectiveList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div id="project-category" className="category">
                    <p><span>Knowledge</span></p>
                    {
                        this.props.objectives.map((el) => {
                            return el;
                        })
                    }
                </div>
                <div id="knowledge-category" className="category">
                    <p><span>Expertise</span></p>
                    {
                        this.props.objectives.map((el) => {
                            return el;
                        })
                    }
                </div>
                <div id="expertise-category" className="category">
                    <p><span>Projects</span></p>
                    {
                        this.props.objectives.map((el) => {
                            return el;
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ObjectiveList;