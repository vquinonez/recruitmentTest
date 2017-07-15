'use strict';

import Login from "./login";
import List from "./list";

let login = new Login();
let list;

login.displayLogin("view");

document.getElementById("login-form").addEventListener("submit", (e) =>{
	e.preventDefault();
	let form = e.target;

	login.logIn(form.elements[0].value, form.elements[1].value, ()=>{
		list = new List();
		list.displayList("view");
	});
} );

loadXMLDoc();

function loadXMLDoc(){
	var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
  		xmlhttp=new XMLHttpRequest();
  	}else {// code for IE6, IE5
 		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	xmlhttp.onreadystatechange=function(){
  		if (xmlhttp.readyState==4 && xmlhttp.status==200){
    		console.log(JSON.parse(xmlhttp.responseText));
    	}
  	}
  	xmlhttp.open("GET","http://localhost:8080/users",true);
	xmlhttp.send();
}