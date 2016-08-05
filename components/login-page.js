import React from 'react';
//import Time from 'react-time'

export default class LoginPage extends React.Component {

    render() {

        return (
        	<form onSubmit={this.SendRequest.bind(this)}>
        	   <input type="text" name="userId" placeholder="userId" id="userId"/>
        	   <input type="text" name="objectiveId" placeholder="objectiveId" id="objectiveId"/>
        	   <textarea id="text"></textarea>
        	   <button>Send</button>
        	</form>
        );
    }

     SendRequest(event) {

        event.preventDefault();

        //let myDate = new Date("Thu Jul 18 2013 15:48:59 GMT+0400");

         var data = {
		   name: "name",
		   email: "email",
		   comment: "comment"
		 }

		 $.ajax({
		   type: 'POST',
		   url: '/api/comment',
		   data: data
		 })
		 .done(function(data) {
		   console.log('Done');;
		 })
		 .fail(function(jqXhr) {
		   console.log('failed to register');
		 });

    }



}
