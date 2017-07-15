export default class ViewManager {

    constructor ( viewContainer ) {
        this.container = viewContainer;        
    }

    loadPage(href){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", href, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }

    displayElement( viewUrl ){
        document.getElementById(this.container).innerHTML = this.loadPage(viewUrl);
    }

}