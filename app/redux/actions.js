import Rebase from 're-base';

const base = Rebase.createClass('https://intense-torch-8126.firebaseio.com/Notes/');

export default { 
	// initNotes: function(username){
	// 	return {
	// 		'type': "INIT_NOTES",
	// 		'username': username
	// 	}
	// },
	addNote: function (noteText, username){
		// A normal action creator, returns a simple object describing the action.
		return {
			'type': "ADD_NOTE",
			'text': noteText,
			'username': username	
		};
	},
	initNotes: function(username){
		// here we take advantage of Redux-thunk; instead of returning an object describing an action,
		// we return a function that takes dispatch and getState as arguments. This function can then
		// invoke dispatch, now or later using setTimeout or similar.
		return function(dispatch,getState){
			base.fetch(username, {
			    context: {'a': 'a'},
			    asArray: true,
			    then(data){
			    	dispatch({
			    		'type': "INIT_NOTES",
			    		'data': data
					})
			      console.log('data ',data);
			      return data;
			    }
			  });
		}
	}
	// ,
	// aimAt: function(killer,victim){
	// 	// Another async action using the Redux-thunk syntax
	// 	return function(dispatch,getState){
	// 		dispatch({type:constants.AIM_AT,killer:killer,victim:victim});
	// 		setTimeout(function(){
	// 			dispatch({type:constants.KILL_HERO,killer:killer,victim:victim});
	// 		},2000);
	// 	};
	// }
}