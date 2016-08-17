import React from 'react';
import UserData from './UserData';

export default ({ data, update, remove, editing, edit, editingDone, editingChange }) => {
  if (!data) { return (<p>Loading...</p>); }

  const objectives = data.map((objective, index) => {
    return (<UserData objective={objective} key={index} index={index} update={update} remove={remove} editing={editing} edit={edit} editingDone={editingDone} editingChange={editingChange}/>);
  });

  return (
    <table className="OKR-managing user-list-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Objective</th>
          <th>Category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {objectives}
      </tbody>
    </table>
  );
};
