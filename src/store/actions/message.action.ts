export const actionName = {
    CHANGE: "CHANGE_MESSAGE"
}

export const changeMessage = (payload) => ({
    type: actionName.CHANGE,
    payload
})
