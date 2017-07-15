export default class DataManager {


    constructor (  ) {
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	  		this.xmlhttp=new XMLHttpRequest();
	  	}else {// code for IE6, IE5
	 		this.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  	}
    }

    catchResponse(success = () => {}, error = () => {}){
    	let self = this;
		self.xmlhttp.onreadystatechange=function(){
	  		if (self.xmlhttp.readyState==4 && self.xmlhttp.status==200){
	    		success(JSON.parse(self.xmlhttp.responseText));
	    	}else{
	    		error();
	    	}
	  	}
	}

	get(url, success = () => {}, error = () => {}){

		this.xmlhttp.open("GET", url,true);
		this.xmlhttp.send();
		this.catchResponse((data) =>{ success(data) }, () => { error() });
	}

}