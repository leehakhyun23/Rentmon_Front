import {Cookies} from "react-cookie";
const cookie = new Cookies();

export const setCookie = (name, value, days=1)=>{
    const exprie = new Date();
    exprie.setUTCDate(exprie.getUTCDate() + days);
    return cookie.set(name, value, {path:"/", expires:exprie});
}

export const getCookie=(name)=>{
    return cookie.get(name);
}

export const removeCookie = (name,path="/")=>{
    cookie.remove(name, {path});
}