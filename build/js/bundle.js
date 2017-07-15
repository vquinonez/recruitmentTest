(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _login = require("./login");

var _login2 = _interopRequireDefault(_login);

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = new _login2.default();
var list = void 0;

login.displayLogin("view");

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var form = e.target;

    login.logIn(form.elements[0].value, form.elements[1].value, function () {
        list = new _list2.default();
        list.displayList("view");
    });
});

loadXMLDoc();

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned' + xmlhttp.status);
            }
        }
    };

    xmlhttp.open("GET", "http://localhost:8080/", true);
    xmlhttp.send();
}

},{"./list":2,"./login":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _viewsManager = require("./viewsManager");

var _viewsManager2 = _interopRequireDefault(_viewsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {
    function List() {
        _classCallCheck(this, List);
    }

    _createClass(List, [{
        key: "displayList",
        value: function displayList(selector) {
            var view = new _viewsManager2.default(selector);

            view.displayElement("../views/home.html");
        }
    }]);

    return List;
}();

exports.default = List;

},{"./viewsManager":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _viewsManager = require("./viewsManager");

var _viewsManager2 = _interopRequireDefault(_viewsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Login = function () {
    function Login() {
        _classCallCheck(this, Login);
    }

    _createClass(Login, [{
        key: "displayLogin",
        value: function displayLogin(selector) {
            var view = new _viewsManager2.default(selector);

            view.displayElement("../views/login.html");
        }
    }, {
        key: "logIn",
        value: function logIn(user, pass, success, error) {
            console.log("user: " + user + " " + "pass: " + pass);

            success();
        }
    }]);

    return Login;
}();

exports.default = Login;

},{"./viewsManager":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewManager = function () {
    function ViewManager(viewContainer) {
        _classCallCheck(this, ViewManager);

        this.container = viewContainer;
    }

    _createClass(ViewManager, [{
        key: "loadPage",
        value: function loadPage(href) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", href, false);
            xmlhttp.send();
            return xmlhttp.responseText;
        }
    }, {
        key: "displayElement",
        value: function displayElement(viewUrl) {
            document.getElementById(this.container).innerHTML = this.loadPage(viewUrl);
        }
    }]);

    return ViewManager;
}();

exports.default = ViewManager;

},{}]},{},[1]);
