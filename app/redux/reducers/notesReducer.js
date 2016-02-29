
import initialState from "../initialstate";
import Rebase from 're-base';

const base = Rebase.createClass('https://intense-torch-8126.firebaseio.com/Notes/');
console.log('base: ',base);


module.exports = function(notes=initialState().notes,action){

	var newstate = notes.slice(); // sloppily copying the old notes here, so we never mutate it
	switch(action.type){
		case "INIT_NOTES":
			newstate = action.data;
			return newstate;

		case "ADD_NOTE":
			console.log("adding new note to "+action.username);
			base.post(action.username, {
	      		data: notes.concat([action.text])
	    	});
			return newstate.concat([action.text]);

		default: return notes;
	}
};

