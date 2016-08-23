var date = new Date();
var currentYear = date.getFullYear();
var currentMonth = date.getMonth() + 1;
var currentQuarter;

switch(currentMonth) {
case 1:
case 2:
case 3:
	currentQuarter = 1;
	break;
case 4:
case 5:
case 6:
	currentQuarter = 2;
	break;
case 7:
case 8:
case 9:
	currentQuarter = 3;
	break;
case 10:
case 11:
case 12:
	currentQuarter = 4;
	break;
}

module.exports = {
	keyResult: {
		EASY: 'easy',
		INTERMEDIATE: 'intermediate',
		ADVANCED: 'advanced'
	},
	objective: {
		categories: {
			KNOWLEDGE: 'knowledge',
			EXPERTIZE: 'expertise',
			PROJECTS: 'projects'
		}
	},
		currentYear: currentYear,
		currentQuarter: currentQuarter
};
