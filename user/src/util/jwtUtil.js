import axios  from "axios";
import { setCookie,getCookie } from "./cookieUtil";

const jaxios = axios.create();

const beforeReq = async(config)=>{
    return checkToken(config);
}

const requestFail = (err)=>{
    
    console.error(err);
}

const beforeRes = async(res)=>{
    if(res.data.error === 'ERROR_ACCESS_TOKEN'){
      const originalRequiest = res.config;
      checkToken(originalRequiest);
      return jaxios(originalRequiest);
    }
    return res;
}

const responseFail = (err) => {
    console.error(err)
    return Promise.reject(err);
};

async function checkToken(config){
    const token = getCookie("token");
    const res = await axios.get(`/api/member/refresh/${token.refreshToken}`,{headers:{"Authorization":"Bearer "+token.accessToken}});


    token.accessToken = res.data.accessToken;
    token.refreshToken = res.data.refreshToken;

    setCookie("token",JSON.stringify(token),1);

    const {accessToken} = token;
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
}

jaxios.interceptors.request.use(beforeReq, requestFail);
jaxios.interceptors.response.use(beforeRes, responseFail);

export default jaxios;