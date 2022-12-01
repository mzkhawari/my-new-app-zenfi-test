import { Config } from "../../assets/Config.js";
import { BehaviorSubject } from "rxjs";

/**جهت نگهداری متغییرهای عمومی و ثابت */
export default class Globals {

    private static _apiServer =  Config.httpApi;   // ""http://192.168.255.170:8088/"; //  "http://127.0.0.1/";  25.0.0.3    ; 172.16.2.1


    static get urlServer(){
        return this._apiServer;
    }



    static get UrlAuth(){
        return "api/Auth/";
    }
    static get UrlRefreshtoken(){
        return "api/Auth/refreshToken";
    }
    static get UrlUser(){
        return "user";
    }
   constructor(){
    }







}