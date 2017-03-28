# README

Advanced React and Redux: Middlewares

## Lecture 48: App Building Plan
- Process:
  - build app with dummy data
  - replace dummy data with ajax
  - write middleware to help fetch data

## Lecture 49: Users Reducer
- We built our users reducer and the action types file.
- When building the reducer, we assumed that the action that it is receiving would have a payload
of an array containing all the users that we requested.  Even right here, we are making an assumption
about how the action creators and reducer(s) will work together
```js
import {
	FETCH_USERS
} from '../actions/types';
// we are assuming that the action contains a payload that contains all the different types of users
//
export default function(state = [], action) {
	switch(action.type) {
		case FETCH_USERS:
			return [ ...state, ...action.payload];
		default:
			return state;
	}
	
}
```

## Lecture 50: Static Users Action Creator
- the following code isn't too revolutionary but I did want to just show how he created a static
list of users.  In another example, the "static"-ness came from the reducer but here, the action
returns the same action each time as the payload is an array of the same objects
```js
import {
	FETCH_USERS
} from './types';

export function fetchUsers() {
	return {
		type: FETCH_USERS,
		payload: [
			{ name: 'Jane'},
			{ name: 'Alex'},
			{ name: 'Jim'},
			{ name: 'Anthony'},
			{ name: 'Casey'}
		]
	};
}
```
## Lecture 51: Rendering a List of Users


## Lecture 53: Pains Without Middleware

- install Axios
```sh
npm i --save axios
```
- After installing Axios, we updated our action to fetch users:
```js
// actions/index.js
import axios from 'axios';
import {
	FETCH_USERS
} from './types';

export function fetchUsers() {
	const request = axios.get('https://jsonplaceholder.typicode.com/users');
	return {
		type: FETCH_USERS,
		payload: request
	};
}
```
- When we looked at the app (refreshed page), nothing was populating.
- We then added a debugger to our reducer, right before our return statement, to see what's going on
- In the console, we could see that `action.payload` was a Promise that was pending.  This means that
right before the moment we needed to use the data, the get request had not yet resolved. **This is where**
**middlewares come in.** We need a way to NOT run the reducer until we get the data back...

## Lecture 54: Middleware Stack
- After an action is created, it will pass through each of the middlewares before it hits the reducers.  If
the middleware doesn't need to do anything with the action, it can pass it on using 'next'.  'Next' is a keyword
that we'll be learning more about...

## Lecture 55: Middleware Internals
```js
/*
Here is the general pattern for middlewares:
- top level function is going to get called with dispatch
- which returns a function that gets called with the next keyword
- which then returns another function that gets called with the action
- the next(action) sends it onto the next middleware

*/
export default function({ dispatch }) {
	return next => action => {
		console.log(action);

		next(action);
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
```

## Lecture 56: Handling Unrelated Actions
- We wrote the basic logic to identify whether the action's payload is a promise.  One clever way was to
see if the action.payload has a `.then` property.  If it does, it's a promise; if not, then this middleware
doesn't need to touch it.
- This is our `async` middleware now:
```js
export default function({ dispatch }) {
	return next => action => {
		// if action doesn't have payload or payload doesn't have .then() property, send on
		if(!action.payload || !action.payload.then) {
			return next(action);
		}

		

		console.log("We do have a promise:", action)
	}
}
```
- finish L56, start L57

## Lecture 57: Handling Promises


















