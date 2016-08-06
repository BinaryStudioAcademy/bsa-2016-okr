
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "./actions/actions";

var Chance = require('chance');

export default class LoginPage extends React.Component {

    render() {

        const { message } = this.props.stateFromReducer;

        return (

        	<form onSubmit={this.SendRequest.bind(this)}>
               <h3>{message}</h3>
               <div>
	           	   <input type="text" name="userId" placeholder="userId" id="userId"/>
                </div>
                <div>
            	   <input type="text" name="objectiveId" placeholder="objectiveId" id="objectiveId"/>
               </div>
                <div>
             	   <textarea id="text"></textarea>
                </div>
          	   <button>Send</button>
          	</form>
        );
    }

     SendRequest(event) {

        event.preventDefault();

        this.props.test();

        var chance = new Chance();

        var comment = {};
        comment.userId = document.querySelector("input[id=userId]").value;
        comment.objectiveId = document.querySelector("input[id=objectiveId]").value;
        comment.text = document.querySelector("textarea").value;
        comment.createDate = chance.date({ year: 2016 });
        comment.editDate = chance.date({ year: 2016 });

        var history = {};
        history.authorId = comment.userId;
        history.typeId = comment.objectiveId;
        history.type = "added comment";
        history.date = comment.editDate;

  		  var url = "/api/comment/",
  		 			method = "POST",
  		 			callback = function() {},
  		 			data = {},
  		 		  xmlHttp = new XMLHttpRequest();
  		 
  		 	xmlHttp.open(method, url, true);
  		 	xmlHttp.setRequestHeader("Content-Type", "application/json");
  		 	xmlHttp.send(JSON.stringify(data));

    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}

const LogPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default LogPage