import React from 'react'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'

import styles from '../../../styles/payment_success.module.scss';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Button_Global } from '../../components/Button';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props{
    id: string;
}

export default function Payment_success(props: Props){
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("cart_list");
        localStorage.removeItem("cart_list_length");
    }, []);

    return (
        <>
            <Header aleradyCart={false} />
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.box}>
                        <label>Pedido {props.id} Confirmado</label>
                        <p className={styles.thank}>Muito obrigado!</p>
                        <div>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now  on purpose (injected humour and the like).</p>
                            <img src="/payment_success.svg" alt="" />
                        </div>
                        <Button_Global onClick={() => router.push('/payment')} w="15rem" colorScheme="pink" textButton="Minhas compras" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    const { access_token } = ctx.req.cookies;
    const { id, slug } = ctx.params;

    if(!access_token){
        return{
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return{
        props: {
            id
        }
    };
}
