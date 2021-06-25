import { Spinner } from '@chakra-ui/spinner'
import React from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss';

export const Loading = () => {

    const dispatch = useDispatch();
    const { open } = useSelector((state: RootStateOrAny) => state.loadingReducer);

    return (
        <div className={open ? styles.open : styles.close}>
            <Spinner 
                thickness="4px"
                speed="0.65s"
                color="blue.500"
                size="xl"
            />
        </div>
    )
}
