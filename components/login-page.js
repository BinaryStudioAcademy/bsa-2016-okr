import React from 'react';
//import Time from 'react-time'

export default class LoginPage extends React.Component {

    render() {

        return (
        	<form onSubmit={this.SendRequest.bind(this)}>
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
