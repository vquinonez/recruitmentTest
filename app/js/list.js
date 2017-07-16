import ViewManager from "./viewsManager";
import DataManager from "./dataManager";

export default class List {

    constructor (  ) {
    	this.items = [];
    }
	
	displayList( selector ){
        let view = new ViewManager(selector);
        
        view.displayElement("../views/home.html");

        this.getItems();
    }

    getItems(){
    	let data = new DataManager();

    	if( this.items.length == 0 ){
    		data.get("http://localhost:8080/activities", (data) =>{
	            this.items = data;
	            console.log(data);
	            this.drawItems();
        	});
    	}
    }

    drawItems (){
    	let activitiesWrapper = document.getElementById('activities-list');
						
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
    		anchor.href = "activity/"+item.index;
    		title.innerHTML = item.name;
    		par.innerHTML = item.description;

    		anchor.append(title);
    		anchor.append(par);
    		infoWrapper.append(anchor);
    		activityElem.append(imgEelem);
    		activityElem.append(infoWrapper);

    		activitiesWrapper.append(activityElem);
    	}
    }
}