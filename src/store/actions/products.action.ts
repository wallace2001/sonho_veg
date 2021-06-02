import { Http } from "../../config/http";
import { changeLoading } from "./loading.action";

export const actionTypes = {
    CHANGE: "PRODUCT_CHANGE",
    SHOW: "SHOW_PRODUCT"
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
});

export const changeShowProduct = (payload) => ({
    type: actionTypes.SHOW,
    payload
});

export const indexProduct = () => dispatch => {
    dispatch(changeLoading({open: true}));
    return Http.get("/products").then(res => {
        dispatch(changeLoading({ open: false }));
        if(typeof res !== 'undefined'){
            dispatch(change(res.data));
        }
    })
}

export const showProduct = (id: string) => dispatch => {
    dispatch(changeLoading({ open: true }));
    return Http.get(`/product?id=${id}`).then(res => {
        dispatch(changeLoading({ open: false }));
        if(typeof res !== "undefined"){
            dispatch(changeShowProduct(res.data));
        }

    })
}
