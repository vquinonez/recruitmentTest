'use strict';

import Login from "./login";
import List from "./list";

let login = new Login();
let list;

login.displayLogin("view");

document.getElementById("login-form").addEventListener("submit", (e) =>{
	e.preventDefault();
	let form = e.target;

	login.logIn(form.elements[0].value, form.elements[1].value, (data)=>{
		console.log(data);
		list = new List();
		list.displayList("view");
	}, (res) =>{
		console.log(res);
	});
} );
