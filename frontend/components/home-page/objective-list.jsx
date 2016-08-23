import React from 'react';
import ObjectiveItem from './objective.jsx';
import ObjectiveInput from '../new-objective/objectiveInput.jsx';

class ObjectiveList extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
      const categories = this.props.stateFromReducer.categoriesList.categories;
      var objectives = this.props.objectives;
      var categoryItems = [];
      if(categories != undefined){
        categoryItems = categories.map((category, index) => {
          return (
            <div key={ index }>
              <p><span>{category.title}</span></p>
              <ObjectiveInput category={category.title}/>
              {
                  objectives.filter((el) => {
                    if( el.props.category == category.title)
                        return true;
                  })
              }
            </div>
          )
        });
      }
      return (
        <div id="project-category" className="category">{ categoryItems }</div>
      )

    }
}

export default ObjectiveList
