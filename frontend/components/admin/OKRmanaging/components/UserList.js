import React from 'react';
import UserData from './UserData';

export default ({ data, update, remove }) => {
  if (!data) { return (<p>Loading...</p>); }

  const objectives = data.map((objective, index) => {
    return (<UserData objective={objective} key={index} index={index} update={update} remove={remove} />);
  });

  return (
    <table className="OKR-managing user-list-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Objective</th>
          <th>Category</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {objectives}
      </tbody>
    </table>
  );
};
