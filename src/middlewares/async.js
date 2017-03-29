/*
Here is the general pattern for middlewares:
- top level function is going to get called with dispatch
- which returns a function that gets called with the next keyword
- which then returns another function that gets called with the action
- the next(action) sends it onto the next middleware

*/
export default function({ dispatch }) {
	return next => action => {
		// if action doesn't have payload or payload doesn't have .then() property, send on
		if(!action.payload || !action.payload.then) {
			return next(action);
		}

		

		// Make sure the action's promise resolves
		action.payload
			.then(function(response) {
				// Create new action with all the data from the action PLUS what we receive from the promise
				// take everything in our current action and replace our payload with the promise response
				const newAction = { ...action, payload: response }

				// dispatch means send it through all the middlewares again
				dispatch(newAction);
			});
	}
}


// ES5 version
/*
export default function({ dispatch }) {
	return function(next) {
		return function (action) {
			console.log(action);

			next(action);
		}
	}
}
*/