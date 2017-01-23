const HelpService = require('../utils/HelpService');

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

var isDeveloping = process.env.NODE_ENV !== 'production';

var LOCAL_PROD = false;
if(process.env.LOCAL_PROD != undefined) {
	LOCAL_PROD = HelpService.stringToBoolean(process.env.LOCAL_PROD);
}

var ROOT_URL = (isDeveloping || LOCAL_PROD) ? '' : '/okr';

module.exports = {
	isDeveloping: isDeveloping,
	LOCAL_PROD: LOCAL_PROD,
	ROOT_URL: ROOT_URL,
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
			ARCHIVED: 'ARCHIVED',
			UNARCHIVED: 'UNARCHIVED',
			ADD_TO_BACKLOG: 'ADD_TO_BACKLOG',
			RESTORE_TO_BACKLOG: 'RESTORE_TO_BACKLOG'
		},
		target: {
			OBJECTIVE: 'OBJECTIVE',
			KEY_RESULT: 'KEY_RESULT',
			QUARTER: 'QUARTER',
			CATEGORY: 'CATEGORY',
			USER: 'USER',
			USER_OBJECTIVE: 'USER_OBJECTIVE',
			USER_KEY_RESULT: 'USER_KEY_RESULT',
			USER_BACKLOG_OBJECTIVE: 'USER_BACKLOG_OBJECTIVE',
		},
	},
	links: {
		LOCAL_AUTH: 'http://localhost:2020/',
		PROD_AUTH: 'http://team.binary-studio.com/auth',
	},
	page: {
		OTHER_PERSON_PAGE: 'OTHER_PERSON_PAGE',
		HOME_PAGE: 'HOME_PAGE',
	},
	error: {
		TOKEN: 'TOKEN',
	},
	currentYear: currentYear,
	currentQuarter: currentQuarter,
	NOT_SORTED: 0,
	SORTED_ASC: 1,
	SORTED_DESC: 2,
	navMenu: {
		user: [{
			text: 'Home',
			icon: 'fi flaticon-home-1',
			link: `${ ROOT_URL }/`
		},
		{
			text: 'Users',
			icon: 'fi flaticon-users',
			link: `${ ROOT_URL }/users`
		},
		{
			text: 'Recent Actions',
			icon: 'fi flaticon-calendar-6',
			link: `${ ROOT_URL }/users-actions`
		},
		{
			text: 'Statistics',
			icon: 'fi-1 flaticon-1-arrow-chart',
			link: `${ ROOT_URL }/charts`
		},
		{
			text: 'Recycle bin',
			icon: 'fi flaticon-garbage-1',
			link: `${ ROOT_URL }/recycle-bin`
		},
		{
			text: 'Backlog',
			icon: 'fi flaticon-archive',
			link: `${ ROOT_URL }/backlog`
		}],
	}
};
