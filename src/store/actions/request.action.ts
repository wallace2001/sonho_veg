import { HttpAuth } from "../../config/http";
import { AppDispatch } from "../store";
import { changeLoading } from "./loading.action";

interface PropsRequests{
        id: string;
        user_id: string;
        intent: string;
        state: string;
        cart: string;
        payer: string;
        products: string;
        transactions: any;
        telphone: string;
        date: Date;
        create_time: Date;
        update_time: Date;
        status: string;
}

export const actionTypes = {
    CHANGE: "CHANGE_REQUEST"
};

export const changeRequest = (payload) => ({
    type: actionTypes.CHANGE,
    payload
});

export const getRequest = () => (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    HttpAuth.get("payment/request").then(res => {
        dispatch(changeLoading({open: false}));
        if(!res.data.error){
            const request = res.data.map((item: PropsRequests) => ({
                id: item.id,
                user_id: item.user_id,
                payer: JSON.parse(item.payer),
                transactions: JSON.parse(item.transactions),
                products: JSON.parse(item.products),
                cart: item.cart,
                intent: item.intent,
                state: item.state,
                status: item.status,
                date: item.date,
                telphone: item.telphone,
                create_time: item.create_time,
                update_time: item.update_time,
            }));
            console.log(request);
            dispatch(changeRequest(request));
        }
    });
}

export const sendRequest = (requests) => (dispatch: AppDispatch) => {
    dispatch(changeLoading(requests));
}

export const userPayments = () => async(dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    HttpAuth.get(`payment/userpayments`).then(res => {
        dispatch(changeLoading({open: false}));
        if(!res.data.error){
            const request = res.data.map((item: PropsRequests) => ({
                id: item.id,
                user_id: item.user_id,
                payer: JSON.parse(item.payer),
                transactions: JSON.parse(item.transactions),
                products: JSON.parse(item.products),
                cart: item.cart,
                intent: item.intent,
                state: item.state,
                status: item.status,
                date: item.date,
                telphone: item.telphone,
                create_time: item.create_time,
                update_time: item.update_time,
            }));
            dispatch(changeRequest(request));
        }
    });
}
