import {
	FETCH_USERS
} from '../actions/types';
// we are assuming that the action contains a payload that contains all the different types of users
//
export default function(state = [], action) {
	switch(action.type) {
		case FETCH_USERS:
		console.log(action.payload)
			return [ ...state, ...action.payload.data];
		default:
			return state;
	}
	
}