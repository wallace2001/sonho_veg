export const actionTypes = {
    CHANGE: "CHANGE_NOTIFY"
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
});
