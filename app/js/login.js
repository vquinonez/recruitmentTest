import ViewManager from "./viewsManager";

export default class Login {

    constructor (  ) {       
    }

    displayLogin( selector ){
        let view = new ViewManager(selector);
            
        view.displayElement("../views/login.html");
    }

    logIn(user, pass, success, error){
        console.log("user: "+ user + " " + "pass: "+ pass);

        success();
    }

}