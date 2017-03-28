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

		

		console.log("We do have a promise:", action)
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