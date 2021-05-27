import axios from 'axios';

export const Http = axios.create({
    baseURL: 'https://sonhovegan-com-br.umbler.net/'
});

export const HttpAuth = axios.create({
    baseURL: 'https://sonhovegan-com-br.umbler.net/auth/'
});

HttpAuth.interceptors.request.use(
    async (config) => {
        if(await localStorage.getItem("access_token")){
            config.headers.authorization = `Bearer ${await localStorage.getItem('access_token')}`;
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
            localStorage.removeItem('access_token');
            window.location.replace('/');
        }
    }
})