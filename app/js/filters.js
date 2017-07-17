import ViewManager from "./viewsManager";
const EventEmitter = require('events');

export default class Filters extends EventEmitter {

    constructor ( dataArray = [] ) {
    	super();
    	this.mainData = dataArray;
    	this.data = this.mainData;

    	this.filterObject = {
    		oneTime: false,
    		isOpen: false,
    		category: false,
    		price: false,
    	};
    }

    setData (dataArray){
    	this.mainData = dataArray;
    	this.data = this.mainData;
    	this.initFields();
    }

    displayFilters( idElem ){
        let view = new ViewManager(idElem);
        
        view.displayElement("../views/filter.html");
    }

    initFields(){
    	this.fillCategories();
    	this.setPricesValues();

    	this.setListeners();
    }

    fillCategories(){
    	let categories = [];

    	for( let elem of this.data ){
    		if( categories.length == 0 ){
    			for( let cat of elem.category ){
    				categories.push(cat);
    			}
    		}else{
    			for( let cat of elem.category ){
	    			if( categories.indexOf(cat,0) == -1){
	    				categories.push(cat);
	    			}
    			}
    		}
    	}

    	for( let cat of categories ){
    		let option = document.createElement('option'),
    			catSelect = document.getElementById('categories');
    		option.value = cat;
    		option.innerHTML  = cat;

    		catSelect.append(option);
    	}

    	console.log(categories);

    }

    setPricesValues(){
    	let maxPrice = 0,
    		minPrice = this.data[0].price,
    		minSlider = document.getElementById('min-price'),
    		maxSlider = document.getElementById('max-price');

    	for( let item of this.data ){
    		if( maxPrice < item.price ){
    			maxPrice = parseInt(item.price) + 1;
    		}
    		if( minPrice > item.price){
    			minPrice = parseInt(item.price) - 1;
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

    setListeners(){
    	let self = this;
    	document.getElementById('one-time').addEventListener('change', (e) =>{
    		self.oneTimeChange(e);
    	});
    	document.getElementById('is-open').addEventListener('change', (e) =>{
    		self.isOpenChange(e);
    	});
    	document.getElementById('categories').addEventListener('change', (e) =>{
    		self.catChange(e);
    	});
    	document.getElementById('min-price').addEventListener('change', (e) =>{
			document.getElementById('max-price').min = e.target.value;

    		document.getElementById('min-value').innerHTML = e.target.value;

    		self.priceChange(e);
    	});
    	document.getElementById('max-price').addEventListener('change', (e) =>{
			document.getElementById('min-price').max = e.target.value;

    		document.getElementById('max-value').innerHTML = e.target.value;

    		self.priceChange(e);
    	});
    }

    oneTimeChange(e){

    	this.filterObject.oneTime = e.target.checked;
		this.data = this.applyFilters(this.mainData, this.filterObject);
		
    }

    isOpenChange(e){

		this.filterObject.isOpen = e.target.checked;
		this.data = this.applyFilters(this.mainData, this.filterObject);

    }

    catChange(e){

    	this.filterObject.category = (e.target.value != '')? true : false;
		this.data = this.applyFilters(this.mainData, this.filterObject);

    }
    priceChange(e){

    	this.filterObject.price = true;
		this.data = this.applyFilters(this.mainData, this.filterObject);

    }

    applyFilters(data, filtersObject){
    	let res = data; 

    	console.log(filtersObject);

    	if(filtersObject.oneTime){
    		res = this.filterOnetime(res);
    	}
    	if(filtersObject.isOpen){
    		res = this.filterIsOpen(res);
    	}
    	if(filtersObject.category){
    		res = this.filterCat(res);
    	}
    	if(filtersObject.price){
    		res = this.filterPrice(res);
    	}

	 	this.emit("filtersChange", {event: res});
    	return res;
    }

    filterOnetime( array ){
    	let res =[];

    	res = array.filter((elem) => {
	 		if(elem.oneTime)
	 			return elem;
	 	});

	 	return res;
    }

    filterIsOpen( array ){
    	let res =[];

    	res = array.filter((elem) => {
    		let open = new Date().setHours(elem.schedule.open.split(':')[0],elem.schedule.open.split(':')[1]),
    			close = new Date().setHours(elem.schedule.close.split(':')[0],elem.schedule.close.split(':')[1]),
    			now = Date.now();

    		if( (now >= open) && (now <= close) ){
    			return elem;
    		}
	 	});

	 	return res;
    }

    filterCat( array ){
    	let res =[],
    		catVal = document.getElementById('categories');

    	res = array.filter((elem) => {
    		for(let cat of elem.category){
    			if(catVal.value == cat)
    				return elem;
    		}
	 	});

	 	return res;
    }

    filterPrice( array ){
    	let res =[],
    		minVal = document.getElementById('min-price'),
    		maxVal = document.getElementById('max-price');

    	res = array.filter((elem) => {
    		if(parseInt(elem.price) > parseInt(minVal.value))
    			if(elem.price < maxVal.value)
    				return elem;
	 	});

	 	return res;
    }

}