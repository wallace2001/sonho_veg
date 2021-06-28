import { redirect } from "next/dist/next-server/server/api-utils";
import { HttpAuth } from "../../config/http";
import { AppDispatch } from "../store";
import { changeLoading } from "./loading.action";
import { change as changeNotify } from './notify.action';
import { getRequest } from "./request.action";

interface TypeProducts{
    calories: string;
    categories_id: string;
    products_id?: string;
    description: string;
    id: string;
    name: string;
    price: string;
    slug: string;
    quantity: number;
}

export const actionTypes = {
    CHANGE: 'CHANGE_PAYMENT'
};

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
});

export const saveCartDatabase = (products, date: Date) => async(dispatch) => {
    await HttpAuth.post('payment/save_cart', {
        products: [...products],
        date
    }).then(res => {
        dispatch(change(true));
        if(res.data.error === 'Token invalid'){
            dispatch(changeNotify({
                open: true,
                title: "É preciso estar logado para finalizar a compra.",
                status: 'error',
                duration: 2 * 1000
            }));

            setTimeout(() => {
                dispatch(changeNotify({
                    open: false
                }));
            }, 2 * 1000);
        }
        dispatch(paymentPage());
    })
}

export const deleteCartDatabase = (id: string) => async(dispatch) => {
    HttpAuth.get(`payment/delete_cart?id=${id}`).then(res => {
        dispatch(change(true));
    });
}

export const paymentPage = () => async(dispatch) => {
    await HttpAuth.get('/user').then(res => {
        dispatch(change(true));
        if(!res.data.error){
            window.location.replace(`https://sonhovegan.herokuapp.com/auth/payment/buy?id=${res.data.id}`);
        }
    });
}

export const updatePayments = (id: string, status: string) => async(dispatch) => {
    dispatch(changeLoading({open: true}));
    HttpAuth.patch(`payment/update_status/${id}`, {status}).then(res => {
        dispatch(changeLoading({open: false}));
        if(!res.data.error){
            dispatch(changeNotify({
                open: true,
                title: "Atualizado com sucesso"
            }));
            dispatch(getRequest());
            setTimeout(() => {
                dispatch(changeNotify({open: false}));
            }, 2 * 1000);
        }else{
            dispatch(changeNotify({
                open: true,
                title: "Erro ao atualizar",
                status: "error"
            }));
            setTimeout(() => {
                dispatch(changeNotify({open: false}));
            }, 2 * 1000);
        }
    });
}
