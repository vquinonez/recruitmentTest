import ViewManager from "./viewsManager";
import DataManager from "./dataManager";
import MapController from "./mapController";

export default class Details {

    constructor (  ) {
        this.items = [];

        this.getItems();
    }

    getItems(){
        let data = new DataManager();

        if( this.items.length == 0 ){
            data.get("http://localhost:8080/activities", (data) =>{
                this.items = data;
                
            });
        }
    }

    getItem( val ){
        return this.items.filter( (elem) => {
            if(elem.index == val)
                return elem;
        })[0];
    }

    getUser(){
        let user;

        user = JSON.parse(localStorage.getItem("logIn-user"));

        return user;
    }

    setUser(user){
        localStorage.setItem("logIn-user", JSON.stringify(user));
    }

    displayDetails(selector, val){
        let view = new ViewManager(selector);

        view.displayElement("../views/detail.html");
        this.fillView(val);
    }

    fillView(val){
        let activity = this.getItem(val),
            img = document.getElementById('act-img'),
            title = document.getElementById('act-title'),
            agregarFav = document.getElementById('add-elem'),
            desc = document.getElementById('act-desc'),
            addres = document.getElementById('act-address'),
            open = document.getElementById('open-time'),
            close = document.getElementById('close-time'),
            price = document.getElementById('price'),
            catWrapper = document.getElementById('act-cat'),
            map = new MapController("map", activity.location.position, activity.name),
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
        price.innerHTML = '$'+activity.price;

        for(let cat of activity.category){
            let actCat = document.createElement('span');

            actCat.className = "pull-right";
            actCat.innerHTML = cat;
        }

        for(let fav of user.favActivities){
            if(fav == activity.index){
                agregarFav.href = fav;
                agregarFav.setAttribute('data-add', "false");
                agregarFav.innerHTML = "Quitar";
                break;
            }
        }

        agregarFav.addEventListener('click', (e) =>{
            e.preventDefault();
            let val = e.target.getAttribute("href"),
                add = (e.target.getAttribute("data-add") == "true");

            console.log(e.target.getAttribute("data-add"));

            if(add)
                user.favActivities.push(val);

            self.updateFavBtn(val, add);
        });
    }

    updateFavBtn( value, add ){
        let user = this.getUser(),
            agregarFav = document.getElementById('add-elem');

        console.log(add);

        if(add){
            user.favActivities.push(parseInt(value));

            agregarFav.innerHTML = "Quitar";
            agregarFav.setAttribute('data-add', "false");
        }else{
            let index = user.favActivities.indexOf(parseInt(value));
            user.favActivities.splice(index, 1);
            
            agregarFav.innerHTML = "Agregar";
            agregarFav.setAttribute('data-add', "true");
        }

        this.setUser(user);
    }

}