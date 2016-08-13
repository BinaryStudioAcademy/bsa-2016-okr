import data_for_recycle from'../components/mockData/data_for_recycle_bin'

const initialState = data_for_recycle;

export default function recycle(state = initialState, action) {
	switch (action.type) {
		case 'RESTORE_ITEM': {
			return state.filter(item =>
				item.id !== action.id
			)
		}
		
		default: {
			return state;
		}
	}
}