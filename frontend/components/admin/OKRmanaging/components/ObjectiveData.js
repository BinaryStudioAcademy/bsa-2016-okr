import React from 'react';

export default ({ objective, update, index, remove, editing, edit, editingDone, editingChange}) => {

	if(editing) {

		return <tr onClick={() => update({ active: index })}>
		<td></td>
		<td><input type ="text" value={objective.ownerName}/></td>

		<td>
		<input type="text" value={objective.title} onKeyDown={editingDone} />
		</td>

		<td><input type = "text" value={objective.category} /></td>
			<td><img src="https://apcdiary.com/theme/ApcCandidate/img/edit-icon.png" title="Edit item" onClick={edit} onChange={editingChange}/></td>

		<td><img src="http://www.myiconfinder.com/uploads/iconsets/20-20-2ff8d83c73c3f275b747adff9f847c59.png" className="user-image" title="Delete item" onClick={remove} /></td>
    </tr>
		
	} else {
		return <tr onClick={() => update({ active: index })}>
		
		<td>{index}</td>

		<td>{objective.category}</td>

		<td className="OKR-managing objective-title">{objective.title}</td>

		<td>{objective.description}</td>

		<td><i className="fi flaticon-garbage-2" aria-hidden="true" onClick={remove}></i></td>
    </tr>
	}  
};
