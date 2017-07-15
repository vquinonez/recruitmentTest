import ViewManager from "./viewsManager";

export default class List {

    constructor (  ) {       
    }
	
	displayList( selector ){
        let view = new ViewManager(selector);
            
        view.displayElement("../views/home.html");
    }
}