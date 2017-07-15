(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataManager = function () {
	function DataManager() {
		_classCallCheck(this, DataManager);

		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			this.xmlhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	_createClass(DataManager, [{
		key: "catchResponse",
		value: function catchResponse() {
			var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			var self = this;
			self.xmlhttp.onreadystatechange = function () {
				if (self.xmlhttp.readyState == 4 && self.xmlhttp.status == 200) {
					success(JSON.parse(self.xmlhttp.responseText));
				} else {
					error();
				}
			};
		}
	}, {
		key: "get",
		value: function get(url) {
			var success = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
			var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


			this.xmlhttp.open("GET", url, true);
			this.xmlhttp.send();
			this.catchResponse(function (data) {
				success(data);
			}, function () {
				error();
			});
		}
	}]);

	return DataManager;
}();

exports.default = DataManager;

},{}],2:[function(require,module,exports){
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

	login.logIn(form.elements[0].value, form.elements[1].value, function (data) {
		console.log(data);
		list = new _list2.default();
		list.displayList("view");
	}, function (res) {
		console.log(res);
	});
});

},{"./list":3,"./login":4}],3:[function(require,module,exports){
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

},{"./viewsManager":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _viewsManager = require("./viewsManager");

var _viewsManager2 = _interopRequireDefault(_viewsManager);

var _dataManager = require("./dataManager");

var _dataManager2 = _interopRequireDefault(_dataManager);

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
        value: function logIn(user, pass) {
            var success = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
            var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

            var data = new _dataManager2.default();
            console.log("user: " + user + " " + "pass: " + pass);

            data.get("http://localhost:8080/users", function (data) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        if (item.user == item.user && item.password == pass) {
                            success(item);
                            return item;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                error('not matching');
            });
        }
    }]);

    return Login;
}();

exports.default = Login;

},{"./dataManager":1,"./viewsManager":5}],5:[function(require,module,exports){
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

},{}]},{},[2]);
