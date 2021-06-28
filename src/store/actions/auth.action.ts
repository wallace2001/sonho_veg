import { Http, HttpAuth } from "../../config/http";
import { AppDispatch } from "../store";
import { changeLoading } from "./loading.action";
import Cookie from 'js-cookie';

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
    STATUS: "AUTH.STATUS",
    LIST_USERS: "LIST_USERS"
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

export const listUser = (payload) => ({
    type: actionTypes.LIST_USERS,
    payload
});

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    if(await Cookie.get("access_token")){
        await Cookie.remove("access_token");
    }else{
        await localStorage.removeItem("access_token");
    }
    window.location.replace('/');
    dispatch(changeLoading({open: false}));
    dispatch(success(true));
    
}

export const accountVerify = () => async (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    return await HttpAuth.get('/user').then(res => {
        dispatch(changeLoading({open: false}));
        if(!res.data.error){
            dispatch(account({
                ok: res.data.ok,
                id: res.data.id,
                admin: res.data.admin,
                email: res.data.email,
                name: res.data.name,
                sex: res.data.sex,
                telphone: res.data.telphone
            }));
        }
    }).catch((error) => {
    })
}

export const accountInfo = (state: UserProps) => async (dispatch: AppDispatch) => {
    await dispatch(account({
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
    ? Cookie.set('access_token', token) 
    : sessionStorage.setItem('access_token', token);
    
    dispatch(change({
        email: '',
        password: ''
    }));

    window.location.replace('/');

    dispatch(success(true));
}

export const listUsers = () => (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    HttpAuth.get("userList").then(res => {
        dispatch(changeLoading({open: false}));   
        if(typeof res !== 'undefined'){
            res.data.map(item => {
                return dispatch(listUser({
                    id: item.id,
                    name: item.name,
                    email: item.email
                }));
            })
        } 
    });
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
