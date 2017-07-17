import ViewManager from "./viewsManager";
import DataManager from "./dataManager";
import Filters from "./filters";
const EventEmitter = require('events');

export default class List extends EventEmitter {

    constructor (  ) {
    	super();
    	this.items = [];
    	this.filter = new Filters();
    }
	
	displayList( selector ){
        let view = new ViewManager(selector);
        let self = this;

        view.displayElement("../views/home.html");
    	this.filter.displayFilters("activities-filters");

    	this.filter.on('filtersChange', (e) => {
    		self.processFilters( e.event );
    	});

        this.getItems();
    }

    processFilters( array ){
    	this.items = array;
    	this.drawItems();
    }

    getItems(){
    	let data = new DataManager();

    	if( this.items.length == 0 ){
    		data.get("http://localhost:8080/activities", (data) =>{
	            this.items = data;

	            this.filter.setData(this.items);
	            this.drawItems();
        	});
    	}else{
    		this.filter.setData(this.items);
	        this.drawItems();
    	}
    }

    drawItems ( ){
    	let activitiesWrapper = document.getElementById('activities-list');

    	this.removeListeners();

    	activitiesWrapper.innerHTML = '';

    	for( let item of this.items ){
    		let activityElem = document.createElement("div"),
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

    	this.anchorListeners();
    }

    removeListeners(){
    	let anchors = document.getElementsByClassName('link-detail');

    	for( let anchor of anchors ){
    		anchor.removeEventListener("click", () => {});
    	}
    }

    anchorListeners(){
		let anchors = document.getElementsByClassName('link-detail');

    	for( let anchor of anchors ){
    		anchor.addEventListener("click",(e) =>{
    			e.preventDefault();
    			this.emit("clickActivity", { idAct : e.target.closest("a").getAttribute("href") });
    		});
    	}
    }
}