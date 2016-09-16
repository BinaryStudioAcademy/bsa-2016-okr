var date = new Date();
var currentYear = date.getFullYear();
var currentMonth = date.getMonth() + 1;
var currentQuarter;

switch(currentMonth) {
case 3:
case 4:
case 5:
	currentQuarter = 1;
	break;
case 5:
case 7:
case 8:
	currentQuarter = 2;
	break;
case 9:
case 10:
case 11:
	currentQuarter = 3;
	break;
case 12:
case 1:
case 2:
	currentQuarter = 4;
	break;
}

module.exports = {
	user: {
		localRole: {
			USER: 'user',
			MENTOR: 'mentor',
			ADMIN: 'admin',
			DEFAULT: 'default',
		},
		globalRole: {
			ADMIN: 'ADMIN', 
			DEVELOPER: 'DEVELOPER',
			HR: 'HR', 
			CEO: 'CEO', 
			TECH_LEAD: 'Tech Lead',
		}
	},
	keyResult: {
		EASY: 'easy',
		INTERMEDIATE: 'intermediate',
		ADVANCED: 'advanced',
	},
	objective: {
		categories: {
			KNOWLEDGE: 'knowledge',
			EXPERTIZE: 'expertise',
			PROJECTS: 'projects',
		},
	},
	history: {
		type: {
			ADD: 'ADD',
			UPDATE: 'UPDATE',
			SOFT_DELETE: 'SOFT_DELETE',
			HARD_DELETE: 'HARD_DELETE',
			CHANGE_SCORE: 'CHANGE_SCORE',
			CHANGE_TITLE: 'CHANGE_TITLE',
			CHANGE_DIFFICULTY: 'CHANGE_DIFFICULTY',
			RESTORE: 'RESTORE',
			CHANGE_APPROVE: 'CHANGE_APPROVE',
			TOOK_APPRENTICE: 'TOOK_APPRENTICE',
			REMOVED_APPRENTICE: 'REMOVED_APPRENTICE',
			ARCHIVED: "ARCHIVED",
			UNARCHIVED: "UNARCHIVED"
		},
		target: {
			OBJECTIVE: 'OBJECTIVE',
			KEY_RESULT: 'KEY_RESULT',
			QUARTER: 'QUARTER',
			CATEGORY: 'CATEGORY',
			USER: 'USER',
			USER_OBJECTIVE: 'USER_OBJECTIVE',
			USER_KEY_RESULT: 'USER_KEY_RESULT',
		},
	},
	currentYear: currentYear,
	currentQuarter: currentQuarter,
	NOT_SORTED: 0,
	SORTED_ASC: 1,
	SORTED_DESC: 2
};
