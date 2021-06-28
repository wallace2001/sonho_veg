import { Alert, AlertIcon } from '@chakra-ui/alert'
import { useToast } from '@chakra-ui/toast'
import React from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

interface NotifyProps{
    open: boolean;
    time: number;
    class: string;
    message: string;
}

export const Notify = () => {

    const dispatch = useDispatch();
    const notify: NotifyProps = useSelector((state: RootStateOrAny) => state.notifyRedycer);


    return (
        <Alert status="success">
            <AlertIcon />
            {notify.message}
        </Alert>
    )
}
