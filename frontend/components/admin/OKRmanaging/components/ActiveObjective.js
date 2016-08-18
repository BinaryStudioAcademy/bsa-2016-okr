import React from 'react';

export default ({ data, active }) => {
  if (!data || !data[active]) { return <h3>Nothing found :(</h3>; }

  const objective= data[active];

  return (
    <div className="thumbnail">
      <i className="fi flaticon-folder-14" aria-hidden="true"></i>

      <div className="thumbnail-caption">
        <h3>{objective.title}</h3>
        <table className="OKR-managing objective-info-table">
          <tbody>
            <tr>
              <td>Objective:</td>
              <td>{objective.title}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{objective.description}</td>
            </tr>
            <tr>
              <td>Category:</td>
              <td>{objective.category}</td>
            </tr>
            <tr>
              <td>Start date:</td>
              <td>01/07/2016</td>
            </tr>
            <tr>
              <td>Due date:</td>
              <td>10/11/2016</td>
            </tr>
            <tr>
              <td>Key results:</td>
              <td></td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};
