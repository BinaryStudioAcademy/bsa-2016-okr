import React from 'react';


class ObjectiveList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div className="project-category" className="user-category">
                    <p><span>Knowledge</span></p>
                    {
                        this.props.objectives.map((el) => {
                            return el;
                        })
                    }
                </div>
                <div className="knowledge-category" className="user-category">
                    <p><span>Expertise</span></p>
                    {
                        this.props.objectives.map((el) => {
                            return el;
                        })
                    }
                </div>
                <div className="expertise-category" className="user-category">
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