import { Http, HttpAuth } from "../../config/http";
import { AppDispatch } from "../store";
import { changeLoading } from "./loading.action";
import { change as changeNotify  } from './notify.action';

interface PropsContent{
    content: {
        name: string;
        description: string;
        calories: string;
        price: string;
        category: string;
        image?: File;
    }
}

export const actionTypes = {
    CHANGE: "PRODUCT_CHANGE",
    SHOW: "SHOW_PRODUCT",
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
});

export const changeShowProduct = (payload) => ({
    type: actionTypes.SHOW,
    payload
});

export const indexProduct = () => (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    return Http.get("/products").then(res => {
        dispatch(changeLoading({ open: false }));
        if(typeof res !== 'undefined'){
            dispatch(change(res.data));
        }
    })
}

export const showProduct = (id: string) => (dispatch: AppDispatch) => {
    dispatch(changeLoading({ open: true }));
    return Http.get(`/product?id=${id}`).then(res => {
        dispatch(changeLoading({ open: false }));
        if(typeof res !== "undefined"){
            dispatch(changeShowProduct(res.data));
        }

    })
}

export const productsAll = () => (dispatch: AppDispatch) => {
    Http.get('productsall').then(res => {
        if(typeof res !== 'undefined'){
            console.log(res.data);
            dispatch(change(res.data));
        }
    })
}

export const createProduct = ({content}: PropsContent) => (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    const data = new FormData();

    data.append('name', content.name);
    data.append('description', content.description);
    data.append('calories', content.calories);
    data.append('category', content.category);
    data.append('price', content.price);
    data.append('file', content.image);

    HttpAuth.post('/createProduct', data).then(res => {

        dispatch(changeLoading({open: false}));
        if(typeof res !== 'undefined'){

            dispatch(changeNotify({
                open: true,
                title: res.data.message
            }));
    
            setTimeout(() => {
                dispatch(changeNotify({open: false}));
            }, 2 * 1000);
        }

        if(res.data.error){
            dispatch(changeNotify({
                open: true,
                title: res.data.error
            }));
    
            setTimeout(() => {
                dispatch(changeNotify({open: false}));
            }, 2 * 1000);
        }
    });
}

export const deleteProduct = (id: string) => (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    HttpAuth.delete(`products_delete/${id}`).then(res => {
        dispatch(changeLoading({open: false}));
        if(!res.data.error){
            dispatch(change(true));
            dispatch(changeNotify({
                open: true,
                title: "Produto deletado com sucesso"
            }));
            setTimeout(() => {
                dispatch(changeNotify({open: false}));
            }, 2 * 1000);
        }else{
            dispatch(changeNotify({
                open: true,
                title: res.data.error
            }));
            setTimeout(() => {
                dispatch(changeNotify({open: false}));
            }, 2 * 1000);
        }
    });
}

export const updateProduct = (id: string, {content}: PropsContent) => (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    const data = new FormData();

    data.append('name', content.name);
    data.append('description', content.description);
    data.append('calories', content.calories);
    data.append('category', content.category);
    data.append('price', content.price);
    data.append('file', content.image);
    HttpAuth.patch(`products_update/${id}`, data).then(res => {
        dispatch(changeLoading({open: false}));

        if(!res.data.error){
            dispatch(changeNotify({
                open: true,
                title: "Produto atualizado com sucesso"
            }));
        }else{
            dispatch(changeNotify({
                open: true,
                title: "Erro ao atualizar produto"
            }));
            setTimeout(() => {
                dispatch(changeNotify({
                    open: false
                }));
            }, 2 * 1000);
        }
    });
}
