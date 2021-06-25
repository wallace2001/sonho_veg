import { HttpAuth } from "../../config/http";
import { AppDispatch } from "../store";
import { changeLoading } from "./loading.action";

interface propsContent{
    content: {
        title: string;
        description: string;
        mailerReceive: number;
    }
}

export const actionTypes = {
    SEND: "SEND_EMAIL"
}

export const change = (payload) => ({
    type: actionTypes.SEND,
    payload
});

export const sendEmails = ({ content }: propsContent) => (dispatch: AppDispatch) => {
    dispatch(changeLoading({open: true}));
    HttpAuth.post('sendEmail', content).then(res => {
        dispatch(changeLoading({open: false}));
        // console.log(content);
        if(res.data.error){
            dispatch(change({
                message: res.data.error
            }));
        }

        dispatch(change({
            message: res.data.message
        }));
    })
}
