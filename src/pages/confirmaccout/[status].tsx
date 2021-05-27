import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../../styles/confirm.module.scss';
import { Button_Global } from '../../components/Button';

interface Props{
    status: {
        status: string;
    };
}

export default function Confirmed({status}: Props){
    const router = useRouter();
    console.log(router.query);

    return(
        status.status === '0' ? (
            <div className={styles.container}>
                <div className={styles.box}>
                    <h3>Conta confirmada</h3>
                    <p className={styles.text}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many</p>
                    <Button_Global onClick={() => router.push('/')} color="pink" textButton="Ir para o site" />
                </div>
            </div>
        ) : (
            <div className={styles.container}>
                <div className={styles.box}>
                    <h3>Conta Já confirmada</h3>
                    <p style={{textAlign: 'center'}} className={styles.text}>Clique no botão abaixo para ir para o site.</p>
                    <Button_Global onClick={() => router.push('/')} color="pink" textButton="Ir para o site" />
                </div>
            </div>
        )
    );
}

export const getStaticPaths: GetStaticPaths = async() => {
    const paths = [
        {
            params: {
                status: '0',
            }
        }
    ]

    return{
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async(ctx) => {
    const status = ctx.params;

    return{
        props: {
            status
        },
        revalidate: 86400
    }
}