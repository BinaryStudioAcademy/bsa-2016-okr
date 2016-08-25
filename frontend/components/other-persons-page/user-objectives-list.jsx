import React from 'react';


class ObjectiveList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div id="project-category" className="other-user-category">
                    <p><span>Knowledge</span></p>
                    {   
                        this.props.objectives.filter((el) => {
                            if( el.props.item.templateId.category.title == "knowledge")
                                return true;
                        })
                    }
                </div>
                <div id="knowledge-category" className="other-user-category">
                    <p><span>Expertise</span></p>
                    {   
                        this.props.objectives.filter((el) => {
                            if( el.props.item.templateId.category.title == "expertise" )
                                return true;
                        })
                    }
                </div>
                <div id="expertise-category" className="other-user-category">
                    <p><span>Projects</span></p>
                    {   
                        this.props.objectives.filter((el) => {
                            if( el.props.item.templateId.category.title == "projects")
                                return true;
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ObjectiveList;