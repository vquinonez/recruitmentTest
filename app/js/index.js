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

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned'+ xmlhttp.status);
           }
        }
    };

    xmlhttp.open("GET", "http://localhost:8080/", true);
    xmlhttp.send();
}