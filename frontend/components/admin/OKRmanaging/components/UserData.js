import React from 'react';

export default ({ objective, update, index, remove, editing, edit, editingDone, editingChange}) => {

	if(editing) {

		return <tr onClick={() => update({ active: index })}>
		<td>{objective.id}</td>
		<td><img src="http://acas.ca/images/home/user_circle.png" className="OKR-managing user-image" /><input type = "text" value={objective.ownerName}/></td>

		<td>
		<input type="text" value={objective.objTitle} onKeyDown={editingDone} />
		</td>

		<td><input type = "text" value={objective.category} /></td>
			<td><img src="https://apcdiary.com/theme/ApcCandidate/img/edit-icon.png" title="Edit item" onClick={edit} onChange={editingChange}/></td>

		<td><img src="http://www.myiconfinder.com/uploads/iconsets/20-20-2ff8d83c73c3f275b747adff9f847c59.png" className="user-image" title="Delete item" onClick={remove} /></td>
    </tr>
		
	} else {
		return <tr onClick={() => update({ active: index })}>
		<td>{objective.id}</td>
		<td className="OKRmanaging userName-data"><img src="http://acas.ca/images/home/user_circle.png" className="OKR-managing user-image" /><p>{objective.ownerName}</p></td>

		<td>{objective.objTitle}            	
		</td>

		<td>{objective.category}</td>
		<td><img src="https://apcdiary.com/theme/ApcCandidate/img/edit-icon.png" title="Edit item" onClick={edit}/></td>
		<td><img src="http://www.myiconfinder.com/uploads/iconsets/20-20-2ff8d83c73c3f275b747adff9f847c59.png" className="user-image" title="Delete item" onClick={remove}/></td>
    </tr>
	}  
};
