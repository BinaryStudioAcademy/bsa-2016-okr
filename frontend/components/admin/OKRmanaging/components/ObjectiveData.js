import React from 'react';

export default ({ objective, update, index, remove, editing, edit, editingDone, editingChange}) => {

	if(editing) {

		return <tr onClick={() => update({ active: index})}>
		<td>{index+1}</td>

		<td>
			<select>
				<option selected value={objective.category.title}>{objective.category.title}</option>
				<option>Knowledge</option>
				<option>Expertise</option>
				<option>Projects</option>
			</select>
		</td>

		<td>
		<input type="text" value={objective.title}/>
		</td>

		<td><input type = "text" value={objective.description} /></td>
		<td><i className="fi flaticon-edit" aria-hidden="true" onClick={edit}></i></td>

		<td><i className="fi flaticon-garbage-2" aria-hidden="true" onClick={remove}></i></td>
    </tr>
		
	} else {
		return <tr onClick={() => update({ active: index })}>
		
		<td>{index+1}</td>

		<td>{objective.category.title}</td>

		<td className="OKR-managing objective-title">{objective.title}</td>

		<td>{objective.description}</td>

		<td><i className="fi flaticon-edit" aria-hidden="true" onClick={edit}></i></td>

		<td><i className="fi flaticon-garbage-2" aria-hidden="true" onClick={remove}></i></td>
    </tr>
	}  
};
