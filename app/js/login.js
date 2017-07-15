import ViewManager from "./viewsManager";
import DataManager from "./dataManager";

export default class Login {

    constructor (  ) {       
    }

    displayLogin( selector ){
        let view = new ViewManager(selector);
            
        view.displayElement("../views/login.html");
    }

    logIn(user, pass, success = () => {}, error = () => {}){
        let data = new DataManager();
        console.log("user: "+ user + " " + "pass: "+ pass);

        data.get("http://localhost:8080/users", (data) =>{
            for( let item of data ){
                if((item.user == item.user) && (item.password == pass)){
                    success(item);
                    return item;
                }
            }

            error('not matching');
        });
    }

}