import axios from 'axios';
import Cookies from 'js-cookie';

export const Http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API_WEB_SERVER
});

export const HttpAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API_AUTH_SERVER
});

HttpAuth.interceptors.request.use(
    async (config) => {
        if(await Cookies.get("access_token")){
            config.headers.authorization = `Bearer ${await Cookies.get('access_token')}`;
            return config;
        }else{
            config.headers.authorization = `Bearer ${await sessionStorage.getItem('access_token')}`;
            return config;
        }
    }
);

HttpAuth.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response){
        if(error.response.status === 401){
            Cookies.remove('access_token');
            window.location.replace('/');
        }
    }
})