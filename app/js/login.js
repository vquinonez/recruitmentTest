import ViewManager from "./viewsManager";
import DataManager from "./dataManager";

export default class Login {

    constructor ( listComponent ) {
        if(localStorage.getItem('logIn-user') != null){
            this.user = JSON.parse(localStorage.getItem('logIn-user'));

            listComponent.displayList('view');
        }else{
            this.displayLogin('view');
        }
    }

    displayLogin( selector ){
        let view = new ViewManager(selector);
            
        view.displayElement("../views/login.html");
    }

    logIn(user, pass, success = () => {}, error = () => {}){
        if((this.user == undefined) && (this.user == null)){
            let data = new DataManager();

            data.get("http://localhost:8080/users", (data) =>{
                for( let item of data ){
                    if((item.user == item.user) && (item.password == pass)){
                        localStorage.setItem( "logIn-user", JSON.stringify(item) );
                        success(item);
                        return item;
                    }
                }

                error('not matching');
            });
        }else{
            success(this.user);
        }
    }

}