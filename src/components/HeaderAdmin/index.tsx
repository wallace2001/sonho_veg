import React from 'react'
import styles from './index.module.scss';
import { MenuHeader } from '../ButtonHeader/index';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

interface AccountProps{
    account: {
        ok: boolean;
        name: string;
    }
}

export const HeaderAdmin = () => {
    const { account }: AccountProps = useSelector((state: RootStateOrAny) => state.authReducer);
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <MenuHeader />
            </div>
        </div>
    )
}
