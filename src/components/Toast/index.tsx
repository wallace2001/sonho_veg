import { useToast } from '@chakra-ui/toast'
import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux';
import styles from './index.module.scss';

export const Toast = () => {
    const toast = useToast();

    const notify = useSelector((state: RootStateOrAny) => state.notifyReducer);

    return (
        <div className={styles.container}>
            {notify.open &&
            toast({
                title: notify.title,
                status: notify.status,
                duration: notify.duration,
                isClosable: true,
            })
            }
        </div>
    )
}
