import { redirect } from "next/dist/next-server/server/api-utils";
import { HttpAuth } from "../../config/http";
import { AppDispatch } from "../store";
import { changeLoading } from "./loading.action";
import { change as changeNotify } from './notify.action';

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
        console.log(res);
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
        console.log(res);
        if(!res.data.error){
            window.location.replace(`https://sonhovegan.herokuapp.com/auth/payment/buy?id=${res.data.id}`);
        }
    });
}
