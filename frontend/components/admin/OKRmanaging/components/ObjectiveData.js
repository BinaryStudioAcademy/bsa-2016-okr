import React from 'react';
import KeyResults from './Key-results-list.js';
import sweetalert from 'sweetalert';
import '../../../common/styles/sweetalert.css';

class ObjectiveData extends React.Component{
  constructor(props){
    super(props);

    this.deleteObjective = this.deleteObjective.bind(this);
    this.editObjective = this.editObjective.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  cancelEdit(){
    this.props.cancelEdit();
  }

  editObjective(event){
    event.preventDefault();
    let index = this.props.objectivesList.active;
    let objective = this.props.objectivesList.visibleObjectives[index];

    if(this.props.objectivesList.editing && this.props.objectivesList.active == this.props.index){
      
      let handler = function() {
        let reqBody = {};
        let objectiveDesctiption = document.querySelector("textarea.template-description").value;
        let objectiveTitle = document.querySelector("input.template-title").value;
        let objectiveCategory = this.refs.selectCategory.value;

        reqBody.description = objectiveDesctiption;
        reqBody.title = objectiveTitle;
        reqBody.category = objectiveCategory;

        this.props.editObjectiveTemplate(objective._id, reqBody);
      }.bind(this);

      sweetalert({
        title: "Do you really want to save changes?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4caf50",
        confirmButtonText: "OK",
        closeOnConfirm: true
      }, function(){handler();});

    }

    else {
      this.props.activeObjective(this.props.index);
    }
  }

  deleteObjective(){
    this.props.cancelEdit();

    let handler = function() {
      let i = this.props.objective._id;
      this.props.deleteObjective(i, true);
    }.bind(this);

    sweetalert({
      title: "Do you really want to delete objective?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      confirmButtonText: "OK",
      closeOnConfirm: true
    }, function(){handler();});
  }

  render() {
    let categoryId = this.props.objective.category;
    let category = this.props.categories.list.find((category) => {
      return category._id === categoryId;
    });

    let titleEl;
    let descriptionEl;
    let categoryEl;
    let editSave;
    let cancel;

    if (this.props.objectivesList.editing && this.props.objectivesList.active == this.props.index) {
      titleEl       =   (<input type='text'
                                className='template-title'
                                defaultValue={this.props.objective.title}
                        />);
      descriptionEl = (<textarea className='template-description'
                                 defaultValue={this.props.objective.description}
                      />);
      categoryEl    = (<select className='template-category' 
                               ref='selectCategory'  
                               defaultValue={categoryId}>
                               { this.props.categories.list.map((category, index) => {
                                 return <option key={index} value={category._id}>{category.title}</option>
                               })}
                      </select>);
      editSave      =  ( <button onClick={this.editObjective}
                                 className='btn btn-green editing'
                                 aria-hidden="true"
                                 title='Save'>
                                 <i className='fi-1 flaticon-1-check'></i>
                        </button> );
      cancel        =  (  <button onClick={ this.cancelEdit }
                                  className="btn btn-red cancel"
                                  title='Cancel'
                                  aria-hidden="true">
                                  <i className="fi flaticon-multiply"></i>
                        </button> );
    } else {
      titleEl       = (<div className='name'>{ this.props.objective.title }</div>);
      descriptionEl = (<div className='description'>{ this.props.objective.description }</div>);
      categoryEl    = (<div className='category'>{ category.title }</div>);
      editSave      =  ( <button onClick= { this.editObjective }
                                 className='btn btn-blue-hover edit'
                                 aria-hidden="true"
                                 title='Edit'>
                                 <i className='fi flaticon-edit'></i>
                        </button> );   
      cancel        =  ( <button title="Delete"
                                 type="button"
                                 className="btn btn-red-hover delete"
                                 onClick={this.deleteObjective} >
                                 <i className="fi flaticon-garbage-2"></i>
                       </button> )
    }

		return (
      <div>
        <div className='objective-template'>
              <form onSubmit={this.editObjective}>
              <div className='edit-objective'>
                    { editSave }
                    { cancel }
              </div>
              { categoryEl }
              { titleEl }
              { descriptionEl }
            </form>
        </div>
        <div className='key-result'>
          <KeyResults objective = { this.props.objective }
                      cancelEdit = { this.props.cancelEdit }
                      data = { this.props.objective.keyResults }
                      cancelEdit = { this.props.cancelEdit }/>
        </div>
      </div>
    )
  }
}

export default ObjectiveData
