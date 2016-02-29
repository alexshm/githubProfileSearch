import initialState from "./initialstate";
import { combineReducers,applyMiddleware ,createStore } from "redux";
import notesRedoucer from "./reducers/notesReducer";
import thunk from 'redux-thunk';

var rootReducer = combineReducers({
	notes: notesRedoucer   // this means notesRedouce will operate on appState.note
});

module.exports = applyMiddleware(thunk)(createStore)(rootReducer,initialState());