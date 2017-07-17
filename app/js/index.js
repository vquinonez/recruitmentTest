'use strict';

import Login from "./login";
import List from "./list";
import Details from "./detail";

let list = new List();
let login = new Login(list);
let detail = new Details();
let loginForm = document.getElementById("login-form");

if(document.body.contains(loginForm)){
	document.getElementById("login-form").addEventListener("submit", (e) =>{
		e.preventDefault();
		let form = e.target;

		login.logIn(form.elements[0].value, form.elements[1].value, (data)=>{
			console.log(data);
			list.displayList("view");
		}, (res) =>{
			console.log(res);
		});

	} );
}

list.on('clickActivity', (e) =>{
	console.log(e);
	detail.displayDetails("view", e.idAct);
});
