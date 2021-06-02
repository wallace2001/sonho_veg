import { Http, HttpAuth } from "../../config/http";
import { AppDispatch } from "../store";
import { changeLoading } from "./loading.action";

interface UserProps{
    admin: boolean;
    email: string;
    name: string;
    sex: string;
    telphone: string;
}

interface credentialsRegisterProps{
        name: string;
        email: string;
        password: string;
        date: any;
        telphone?: string;
        sex: string;
        cpf?: string;
}

interface credentialsProps{
    email: string;
    password: string;
}

export const actionTypes = {
    CHANGE: "AUTH_CHANGE",
    SUCCESS: "AUTH_SUCCESS",
    ACCOUNT: "AUTH_ACCOUNT",
    ERROR: "AUTH_ERROR",
    STATUS: "AUTH.STATUS"
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
});

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
});

export const account = (payload) => ({
    type: actionTypes.ACCOUNT,
    payload
});

export const error = (payload) => ({
    type: actionTypes.ERROR,
    payload
});

export const status = (payload) => ({
    type: actionTypes.STATUS,
    payload
});

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    if(await localStorage.getItem("access_token")){
        await localStorage.removeItem("access_token");
    }else{
        await sessionStorage.removeItem("access_token");
    }
    window.location.replace('/');
    dispatch(changeLoading({open: false}));
    dispatch(success(true));
    
}

export const accountVerify = () => async (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    return await HttpAuth.get('/user').then(res => {
        dispatch(changeLoading({open: false}));
        // console.log(res.data);
        dispatch(account({
            ok: res.data.ok,
            admin: res.data.admin,
            email: res.data.email,
            name: res.data.name,
            sex: res.data.sex,
            telphone: res.data.telphone
        }));
    }).catch((error) => {
        console.log(error);
    })
}

export const accountInfo = (state: UserProps) => (dispatch: AppDispatch) => {
    dispatch(account({
        ok: true,
        admin: state.admin,
        email: state.email,
        name: state.name,
        sex: state.sex,
        telphone: state.telphone
    }));
}

export const setUserToken = (token: string, checked: boolean) => (dispatch: AppDispatch) => {

    checked 
    ? localStorage.setItem('access_token', token) 
    : sessionStorage.setItem('access_token', token);
    
    dispatch(change({
        email: '',
        password: ''
    }));

    window.location.replace('/');

    dispatch(success(true));
}

export const login = (credentials: credentialsProps, checked: boolean) => (dispatch) => {
    dispatch(changeLoading({
        open: true
    }));

    return Http.post('loginUser', credentials).then(res => {
        dispatch(changeLoading({open: false}));

        if(typeof res !== 'undefined'){
            if(res.data.token){
                dispatch(setUserToken(res.data.token, checked));
                dispatch(accountInfo(res.data.account));
            }
        }
        if(res.data.error){
            dispatch(error({
                ok: true,
                message: res.data.error
            }))
        }
    }).catch((error) => {
        console.log(error);
        // dispatch(changeLoading({ open: false }));

        // if(typeof error.response !== 'undefined') {
        //     if(error.response.status === 401 || error.response.status === 400) {
        //         dispatch(changeNotify({
        //             open: true,
        //             message: "Email ou senha incorretos",
        //             class: 'error',
        //         }))
        //     }
        // } else {
        //     dispatch(changeNotify({
        //         open: true,
        //         message: "Erro ao se conectar ao servidor",
        //         class: 'error',
        //     }))
        // }
    })
}

export const register = (credential: credentialsRegisterProps) => (dispatch) => {
    dispatch(changeLoading({
        open: true
    }))

    Http.post('createUser', credential).then(res => {
        if(typeof res !== 'undefined'){
            if(res.data.status){
                const credentials = {
                    email: credential.email,
                    password: credential.password
                }
                dispatch(status(true));
                dispatch(login(credentials, false));
            }
        }
        if(res.data.error){
            dispatch(status(false));
            dispatch(error({
                ok: true,
                message: res.data.error
            }))
        }
    })
}
