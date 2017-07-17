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
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _viewsManager = require("./viewsManager");

var _viewsManager2 = _interopRequireDefault(_viewsManager);

var _dataManager = require("./dataManager");

var _dataManager2 = _interopRequireDefault(_dataManager);

var _mapController = require("./mapController");

var _mapController2 = _interopRequireDefault(_mapController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Details = function () {
    function Details() {
        _classCallCheck(this, Details);

        this.items = [];

        this.getItems();
    }

    _createClass(Details, [{
        key: "getItems",
        value: function getItems() {
            var _this = this;

            var data = new _dataManager2.default();

            if (this.items.length == 0) {
                data.get("http://localhost:8080/activities", function (data) {
                    _this.items = data;
                });
            }
        }
    }, {
        key: "getItem",
        value: function getItem(val) {
            return this.items.filter(function (elem) {
                if (elem.index == val) return elem;
            })[0];
        }
    }, {
        key: "getUser",
        value: function getUser() {
            var user = void 0;

            user = JSON.parse(localStorage.getItem("logIn-user"));

            return user;
        }
    }, {
        key: "setUser",
        value: function setUser(user) {
            localStorage.setItem("logIn-user", JSON.stringify(user));
        }
    }, {
        key: "displayDetails",
        value: function displayDetails(selector, val) {
            var view = new _viewsManager2.default(selector);

            view.displayElement("../views/detail.html");
            this.fillView(val);
        }
    }, {
        key: "fillView",
        value: function fillView(val) {
            var activity = this.getItem(val),
                img = document.getElementById('act-img'),
                title = document.getElementById('act-title'),
                agregarFav = document.getElementById('add-elem'),
                desc = document.getElementById('act-desc'),
                addres = document.getElementById('act-address'),
                open = document.getElementById('open-time'),
                close = document.getElementById('close-time'),
                price = document.getElementById('price'),
                catWrapper = document.getElementById('act-cat'),
                map = new _mapController2.default("map", activity.location.position, activity.name),
                user = this.getUser(),
                self = this;

            this.idAct = val;

            console.log(activity);

            img.src = activity.picture;
            title.innerHTML = activity.name;
            desc.innerHTML = activity.description;
            addres.innerHTML = activity.location.address;
            open.innerHTML = activity.schedule.open;
            close.innerHTML = activity.schedule.close;
            price.innerHTML = '$' + activity.price;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = activity.category[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cat = _step.value;

                    var actCat = document.createElement('span');

                    actCat.className = "pull-right";
                    actCat.innerHTML = cat;
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = user.favActivities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var fav = _step2.value;

                    if (fav == activity.index) {
                        agregarFav.href = fav;
                        agregarFav.setAttribute('data-add', "false");
                        agregarFav.innerHTML = "Quitar";
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            agregarFav.addEventListener('click', function (e) {
                e.preventDefault();
                var val = e.target.getAttribute("href"),
                    add = e.target.getAttribute("data-add") == "true";

                console.log(e.target.getAttribute("data-add"));

                if (add) user.favActivities.push(val);

                self.updateFavBtn(val, add);
            });
        }
    }, {
        key: "updateFavBtn",
        value: function updateFavBtn(value, add) {
            var user = this.getUser(),
                agregarFav = document.getElementById('add-elem');

            console.log(add);

            if (add) {
                user.favActivities.push(parseInt(value));

                agregarFav.innerHTML = "Quitar";
                agregarFav.setAttribute('data-add', "false");
            } else {
                var index = user.favActivities.indexOf(parseInt(value));
                user.favActivities.splice(index, 1);

                agregarFav.innerHTML = "Agregar";
                agregarFav.setAttribute('data-add', "true");
            }

            this.setUser(user);
        }
    }]);

    return Details;
}();

exports.default = Details;

},{"./dataManager":1,"./mapController":7,"./viewsManager":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _viewsManager = require("./viewsManager");

var _viewsManager2 = _interopRequireDefault(_viewsManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events');

var Filters = function (_EventEmitter) {
    _inherits(Filters, _EventEmitter);

    function Filters() {
        var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Filters);

        var _this = _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).call(this));

        _this.mainData = dataArray;
        _this.data = _this.mainData;

        _this.filterObject = {
            oneTime: false,
            isOpen: false,
            category: false,
            price: false,
            favorite: false
        };
        return _this;
    }

    _createClass(Filters, [{
        key: "setData",
        value: function setData(dataArray) {
            this.mainData = dataArray;
            this.data = this.mainData;
            this.initFields();
        }
    }, {
        key: "displayFilters",
        value: function displayFilters(idElem) {
            var view = new _viewsManager2.default(idElem);

            view.displayElement("../views/filter.html");
        }
    }, {
        key: "initFields",
        value: function initFields() {
            this.fillCategories();
            this.setPricesValues();

            this.setListeners();
        }
    }, {
        key: "fillCategories",
        value: function fillCategories() {
            var categories = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elem = _step.value;

                    if (categories.length == 0) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = elem.category[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var cat = _step3.value;

                                categories.push(cat);
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    } else {
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = elem.category[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var _cat = _step4.value;

                                if (categories.indexOf(_cat, 0) == -1) {
                                    categories.push(_cat);
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = categories[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _cat2 = _step2.value;

                    var option = document.createElement('option'),
                        catSelect = document.getElementById('categories');
                    option.value = _cat2;
                    option.innerHTML = _cat2;

                    catSelect.append(option);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "setPricesValues",
        value: function setPricesValues() {
            var maxPrice = 0,
                minPrice = this.data[0].price,
                minSlider = document.getElementById('min-price'),
                maxSlider = document.getElementById('max-price');

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var item = _step5.value;

                    if (maxPrice < item.price) {
                        maxPrice = parseInt(item.price) + 1;
                    }
                    if (minPrice > item.price) {
                        minPrice = parseInt(item.price) - 1;
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            minSlider.min = minPrice;
            maxSlider.min = minPrice;

            minSlider.max = maxPrice;
            maxSlider.max = maxPrice;

            minSlider.value = minPrice;
            maxSlider.value = maxPrice;

            document.getElementById('min-value').innerHTML = minPrice;
            document.getElementById('max-value').innerHTML = maxSlider.max;
        }
    }, {
        key: "getUser",
        value: function getUser() {
            var user = void 0;

            user = JSON.parse(localStorage.getItem("logIn-user"));

            return user;
        }
    }, {
        key: "setListeners",
        value: function setListeners() {
            var self = this;
            document.getElementById('one-time').addEventListener('change', function (e) {
                self.oneTimeChange(e);
            });
            document.getElementById('is-open').addEventListener('change', function (e) {
                self.isOpenChange(e);
            });
            document.getElementById('categories').addEventListener('change', function (e) {
                self.catChange(e);
            });
            document.getElementById('min-price').addEventListener('change', function (e) {
                document.getElementById('max-price').min = e.target.value;

                document.getElementById('min-value').innerHTML = e.target.value;

                self.priceChange(e);
            });
            document.getElementById('max-price').addEventListener('change', function (e) {
                document.getElementById('min-price').max = e.target.value;

                document.getElementById('max-value').innerHTML = e.target.value;

                self.priceChange(e);
            });
            document.getElementById('is-fav').addEventListener('change', function (e) {
                self.favChange(e);
            });
        }
    }, {
        key: "oneTimeChange",
        value: function oneTimeChange(e) {

            this.filterObject.oneTime = e.target.checked;
            this.data = this.applyFilters(this.mainData, this.filterObject);
        }
    }, {
        key: "isOpenChange",
        value: function isOpenChange(e) {

            this.filterObject.isOpen = e.target.checked;
            this.data = this.applyFilters(this.mainData, this.filterObject);
        }
    }, {
        key: "catChange",
        value: function catChange(e) {

            this.filterObject.category = e.target.value != '' ? true : false;
            this.data = this.applyFilters(this.mainData, this.filterObject);
        }
    }, {
        key: "priceChange",
        value: function priceChange(e) {

            this.filterObject.price = true;
            this.data = this.applyFilters(this.mainData, this.filterObject);
        }
    }, {
        key: "favChange",
        value: function favChange(e) {

            this.filterObject.favorite = e.target.checked;
            this.data = this.applyFilters(this.mainData, this.filterObject);
        }
    }, {
        key: "applyFilters",
        value: function applyFilters(data, filtersObject) {
            var res = data;

            if (filtersObject.oneTime) {
                res = this.filterOnetime(res);
            }
            if (filtersObject.isOpen) {
                res = this.filterIsOpen(res);
            }
            if (filtersObject.category) {
                res = this.filterCat(res);
            }
            if (filtersObject.price) {
                res = this.filterPrice(res);
            }
            if (filtersObject.favorite) {
                res = this.filterFav(res);
            }

            this.emit("filtersChange", { event: res });
            return res;
        }
    }, {
        key: "filterOnetime",
        value: function filterOnetime(array) {
            var res = [];

            res = array.filter(function (elem) {
                if (elem.oneTime) return elem;
            });

            return res;
        }
    }, {
        key: "filterIsOpen",
        value: function filterIsOpen(array) {
            var res = [];

            res = array.filter(function (elem) {
                var open = new Date().setHours(elem.schedule.open.split(':')[0], elem.schedule.open.split(':')[1]),
                    close = new Date().setHours(elem.schedule.close.split(':')[0], elem.schedule.close.split(':')[1]),
                    now = Date.now();

                if (now >= open && now <= close) {
                    return elem;
                }
            });

            return res;
        }
    }, {
        key: "filterCat",
        value: function filterCat(array) {
            var res = [],
                catVal = document.getElementById('categories');

            res = array.filter(function (elem) {
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = elem.category[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var cat = _step6.value;

                        if (catVal.value == cat) return elem;
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }
            });

            return res;
        }
    }, {
        key: "filterPrice",
        value: function filterPrice(array) {
            var res = [],
                minVal = document.getElementById('min-price'),
                maxVal = document.getElementById('max-price');

            res = array.filter(function (elem) {
                if (parseInt(elem.price) > parseInt(minVal.value)) if (elem.price < maxVal.value) return elem;
            });

            return res;
        }
    }, {
        key: "filterFav",
        value: function filterFav(array) {
            var res = [],
                userFav = this.getUser().favActivities;

            res = array.filter(function (elem) {
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = userFav[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var fav = _step7.value;

                        if (elem.index == fav) return elem;
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            });

            return res;
        }
    }]);

    return Filters;
}(EventEmitter);

exports.default = Filters;

},{"./viewsManager":8,"events":9}],4:[function(require,module,exports){
'use strict';

var _login = require("./login");

var _login2 = _interopRequireDefault(_login);

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _detail = require("./detail");

var _detail2 = _interopRequireDefault(_detail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list = new _list2.default();
var login = new _login2.default(list);
var detail = new _detail2.default();
var loginForm = document.getElementById("login-form");

if (document.body.contains(loginForm)) {
	document.getElementById("login-form").addEventListener("submit", function (e) {
		e.preventDefault();
		var form = e.target;

		login.logIn(form.elements[0].value, form.elements[1].value, function (data) {
			console.log(data);
			list.displayList("view");
		}, function (res) {
			console.log(res);
		});
	});
}

document.getElementById("home").addEventListener('click', function (e) {
	e.preventDefault();

	if (localStorage.getItem("logIn-user")) {
		list.displayList("view");
	} else {
		login.displayLogin("view");
	}
});

list.on('clickActivity', function (e) {
	console.log(e);
	detail.displayDetails("view", e.idAct);
});

},{"./detail":2,"./list":5,"./login":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _viewsManager = require("./viewsManager");

var _viewsManager2 = _interopRequireDefault(_viewsManager);

var _dataManager = require("./dataManager");

var _dataManager2 = _interopRequireDefault(_dataManager);

var _filters = require("./filters");

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events');

var List = function (_EventEmitter) {
    _inherits(List, _EventEmitter);

    function List() {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

        _this.items = [];
        _this.filter = new _filters2.default();
        return _this;
    }

    _createClass(List, [{
        key: "displayList",
        value: function displayList(selector) {
            var view = new _viewsManager2.default(selector);
            var self = this;

            view.displayElement("../views/home.html");
            this.filter.displayFilters("activities-filters");

            this.filter.on('filtersChange', function (e) {
                self.processFilters(e.event);
            });

            this.getItems();
        }
    }, {
        key: "processFilters",
        value: function processFilters(array) {
            this.items = array;
            this.drawItems();
        }
    }, {
        key: "getItems",
        value: function getItems() {
            var _this2 = this;

            var data = new _dataManager2.default();

            if (this.items.length == 0) {
                data.get("http://localhost:8080/activities", function (data) {
                    _this2.items = data;

                    _this2.filter.setData(_this2.items);
                    _this2.drawItems();
                });
            } else {
                this.filter.setData(this.items);
                this.drawItems();
            }
        }
    }, {
        key: "drawItems",
        value: function drawItems() {
            var activitiesWrapper = document.getElementById('activities-list');

            this.removeListeners();

            activitiesWrapper.innerHTML = '';

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var activityElem = document.createElement("div"),
                        imgEelem = document.createElement("img"),
                        infoWrapper = document.createElement("div"),
                        anchor = document.createElement('a'),
                        title = document.createElement('h3'),
                        par = document.createElement('p');

                    activityElem.className = 'col-md-12 activity';
                    imgEelem.src = item.picture;
                    infoWrapper.className = 'info';
                    anchor.href = item.index;
                    anchor.className = 'link-detail';
                    title.innerHTML = item.name;
                    par.innerHTML = item.description;

                    anchor.append(title);
                    anchor.append(par);
                    infoWrapper.append(anchor);
                    activityElem.append(imgEelem);
                    activityElem.append(infoWrapper);

                    activitiesWrapper.append(activityElem);
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

            this.anchorListeners();
        }
    }, {
        key: "removeListeners",
        value: function removeListeners() {
            var anchors = document.getElementsByClassName('link-detail');

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = anchors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var anchor = _step2.value;

                    anchor.removeEventListener("click", function () {});
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "anchorListeners",
        value: function anchorListeners() {
            var _this3 = this;

            var anchors = document.getElementsByClassName('link-detail');

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = anchors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var anchor = _step3.value;

                    anchor.addEventListener("click", function (e) {
                        e.preventDefault();
                        _this3.emit("clickActivity", { idAct: e.target.closest("a").getAttribute("href") });
                    });
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return List;
}(EventEmitter);

exports.default = List;

},{"./dataManager":1,"./filters":3,"./viewsManager":8,"events":9}],6:[function(require,module,exports){
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
    function Login(listComponent) {
        _classCallCheck(this, Login);

        if (localStorage.getItem('logIn-user') != null) {
            this.user = JSON.parse(localStorage.getItem('logIn-user'));

            listComponent.displayList('view');
        } else {
            this.displayLogin('view');
        }
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

            if (this.user == undefined && this.user == null) {
                var data = new _dataManager2.default();

                data.get("http://localhost:8080/users", function (data) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            if (item.user == item.user && item.password == pass) {
                                localStorage.setItem("logIn-user", JSON.stringify(item));
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
            } else {
                success(this.user);
            }
        }
    }]);

    return Login;
}();

exports.default = Login;

},{"./dataManager":1,"./viewsManager":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//This Class manage the Map.
var MapController = function () {

  //Constructo of the Class, it recieve the container id and the initial center
  function MapController(container) {
    var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var markerName = arguments[2];

    _classCallCheck(this, MapController);

    this.container = container;
    this.center = center;
    this.markerName = markerName;

    //This initialize the map
    this.initMap();
  }

  //This initialize the map with the default center.


  _createClass(MapController, [{
    key: "initMap",
    value: function initMap() {
      var self = this;
      this.map = new google.maps.Map(document.getElementById(self.container), {
        zoom: 17,
        center: this.center
      });

      this.setMarker(this.center);
    }
  }, {
    key: "setMarker",
    value: function setMarker(position) {
      var marker = new google.maps.Marker({
        position: this.center,
        map: this.map,
        title: this.markerName
      });
    }
  }]);

  return MapController;
}();

exports.default = MapController;

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[4]);
