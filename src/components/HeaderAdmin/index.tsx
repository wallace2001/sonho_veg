import React, { useState } from 'react'
import styles from './index.module.scss';
import { MenuHeader } from '../ButtonHeader/index';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';
import { Drawer } from '../Drawer';

interface AccountProps{
    account: {
        ok: boolean;
        name: string;
    }
}

export const HeaderAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { account }: AccountProps = useSelector((state: RootStateOrAny) => state.authReducer);
    const router = useRouter();

    const onClose = () => {
        setIsOpen(prevState => !prevState);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <MenuHeader />
                </div>
            </div>
            <div className={styles.containerMobile}>
                <div className={styles.content}>
                    <button onClick={() => setIsOpen(prevState => !prevState)}><FiMenu size={30}/></button>
                    <MenuHeader />
                </div>
            </div>
            <Drawer isOpen={isOpen} isClose={onClose} />
        </>
    )
}
