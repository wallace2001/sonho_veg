import { AppDispatch } from "../store";
import { changeLoading } from "./loading.action";

export const actionTypes = {
    CHANGE: "CHANGE_DATE"
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
});

export const changeScheduling = (date: Date) => (dispatch: AppDispatch) => {
    dispatch(change(date));
}
