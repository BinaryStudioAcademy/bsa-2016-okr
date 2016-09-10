import React from 'react';

import CONST from '../../../backend/config/constants';

import NewObjCredentials from './credentials.jsx';
import NewKeyResult from './key-result.jsx';

import './new-objective.scss';

const NewObjective = (props) => {
	return (
		<div id="new-objective">
			<button type="button" id="close-new-obj-window" onClick={ props.closeNewObjectiveWindow }>
				<i className="fi flaticon-multiply" aria-hidden="true"></i>
			</button>
			<form action="">
				<NewObjCredentials 
					closeNewObjectiveWindow={ props.closeNewObjectiveWindow }
					createNewTemplate={ props.createNewTemplate }
					addKeyResultToTemplate={ props.addKeyResultToTemplate }
				/>
			</form>
		</div>
	);
}

export default NewObjective;