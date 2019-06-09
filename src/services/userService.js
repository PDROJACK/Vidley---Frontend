import http from './httpService';
import { apiUrl } from "../config.json";

const api = apiUrl+"/users"

export function registerUser(user){
    return http.post(api,{
        email: user.username,
        name: user.name,
        password: user.password         
    });
}

