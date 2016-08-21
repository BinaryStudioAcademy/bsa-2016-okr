import React from 'react';
import ObjectiveData from './ObjectiveData';

export default ({ data, update, remove, editing, edit, editingDone, editingChange }) => {
  if (!data) { return (<p>Loading...</p>); }

  const objectives = data.map((objective, index) => {
    return (<ObjectiveData objective={objective} key={index} index={index} update={update} remove={remove.bind(null, objective)} editing={editing} edit={edit} editingDone={editingDone} editingChange={editingChange}/>);
  });

  return (
    <table className="OKR-managing objective-list-table">
      <tbody>
        {objectives}
      </tbody>
    </table>
  );
};