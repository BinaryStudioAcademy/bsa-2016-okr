import React from 'react';

export default ({ objective, update, index, remove }) => {
  return (
    <tr onClick={() => update({ active: index })}>
      <td>{objective.id}</td>
      <td><img src="http://acas.ca/images/home/user_circle.png" className="OKR-managing user-image" />{objective.ownerName}</td>
      <td>{objective.objTitle}</td>
      <td>{objective.category}</td>
      <td><img src="http://www.myiconfinder.com/uploads/iconsets/20-20-2ff8d83c73c3f275b747adff9f847c59.png" className="user-image" title="Delete item" onClick={remove}/></td>
    </tr>
  );
};
