import  React from 'react';
import Repos from './Github/Repos';
import  UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';
import {dispatch} from 'redux';
import {connect} from 'react-redux';
import actions from "../redux/actions";

const base = Rebase.createClass('https://intense-torch-8126.firebaseio.com/Notes/')

class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state ={
	      bio: {},
	      repos: []
		}
	}

  	componentDidMount (){
	  	this.init(this.props.params.username);
	}

	componentWillMount (){
	  	this.props.dispatchInitNotes(this.props.params.username);
	}

	handleAddNote(newNote){
		this.props.dispatchAddNote(newNote,this.props.params.username);   
	 } 

  	componentWillReciveProps(nextProps){
  		base.removeBinding(this.ref);
  		debugger;
  		// this.init(nextProps.params.username);
  	}

  	init(username){
  		debugger;
  		console.log(this.props.params.username);

		getGithubInfo(username)
	      .then(function(data){
	        this.setState({
	          bio: data.bio,
	          repos: data.repos
	        })
	      }.bind(this))
  	}

  	componentWillUnmount (){
  		base.removeBinding(this.ref);
    }

  	render(){
	    return (
	      <div className="row">
	        <div className="col-md-4">
	          <UserProfile username={this.props.params.username} bio={this.state.bio} />
	        </div>
	        <div className="col-md-4">
	          <Repos username={this.props.params.username} repos={this.state.repos}/>
	        </div>
	        <div className="col-md-4">
	          <Notes username={this.props.params.username} notes={this.props.notes} addNote={(newNote)=>this.handleAddNote(newNote)} />
	        </div>
	      </div>
	    )
  }
}



var mapStateToProps = function(state){
	// This component will have access to `state.battlefield` through `this.props.battle`
	return {notes:state.notes};
};

var mapDispatchToProps = function(dispatch){
	return {
		dispatchInitNotes: function(username){ dispatch(actions.initNotes(username)); },
		dispatchAddNote: function(newNote,username){ dispatch(actions.addNote(newNote,username)); }
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
