import React, { PropTypes } from 'react';

import CONST from '../../../backend/config/constants';

import NewObjCredentials from './credentials.jsx';
import NewKeyResult from './key-result.jsx';

import './new-objective.scss';

const NewObjective = ({ 
	createNewTemplate,
	addKeyResultToTemplate,
	removeKeyResultFromTemplate,
	closeNewObjectiveWindow,
	keyResults,
	categories
}) => {
	return (
		<div id="new-objective">
			<button type="button" id="close-new-obj-window" onClick={ closeNewObjectiveWindow }>
				<i className="fi flaticon-multiply" aria-hidden="true"></i>
			</button>
			<form action="">
				<NewObjCredentials 
					createNewTemplate={ createNewTemplate }
					addKeyResultToTemplate={ addKeyResultToTemplate }
					removeKeyResultFromTemplate={ removeKeyResultFromTemplate }
					closeNewObjectiveWindow={ closeNewObjectiveWindow }
					keyResults={ keyResults }
					categories={ categories }
				/>
			</form>
		</div>
	);
}

NewObjective.propTypes = {
	createNewTemplate: PropTypes.func.isRequired,
	addKeyResultToTemplate: PropTypes.func.isRequired,
	removeKeyResultFromTemplate: PropTypes.func.isRequired,
	closeNewObjectiveWindow: PropTypes.func.isRequired,
	keyResults: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
};

export default NewObjective;