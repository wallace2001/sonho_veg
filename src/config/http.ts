import axios from 'axios';
import Cookies from 'js-cookie';

export const Http = axios.create({
    baseURL: "https://sonhovegan.herokuapp.com/"
});

export const HttpAuth = axios.create({
    baseURL: "https://sonhovegan.herokuapp.com/auth/"
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