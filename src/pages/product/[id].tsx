import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Spinner } from '@chakra-ui/spinner';
import { Box } from '@chakra-ui/layout';
import styles from '../../../styles/product.module.scss';
import { Header } from '../../components/Header';
import { ProductSlider } from '../../components/ProductSlider';
import { donuts } from '../../data/donuts';
import { Footer } from '../../Footer';
import { changeLoading } from '../../store/actions/loading.action';
import { Loading } from '../../components/loading';
import { changeMessage } from '../../store/actions/message.action';
import { Notify } from '../../components/Notify';
import { Alert } from '@chakra-ui/alert';
import { useToast } from '@chakra-ui/toast';

interface NotifyProps{
    open: boolean;
    time: number;
    class: string;
    message: string;
}

export default function Product({ id }){
    const [windowTam, setWindowTam] = useState<number>();
    const [loadingPage, setLoadingPage] = useState(true);
    const toast = useToast()

    setTimeout(() => {
        setLoadingPage(false);
    }, 2 * 1000);

    useEffect(() => {
      setWindowTam(window.innerWidth);
    },[]);

    const dispatch = useDispatch();
    const loading = useSelector((state: RootStateOrAny) => state.loadingReducer);

    useEffect(() => {
        dispatch(changeLoading({open: true}));
        setTimeout(() => {
            dispatch(changeLoading({open: false}));
        }, 2 * 1000);
    }, []);

    if(loading.open){
        return(
            <Loading />
        );
    }  

    return(
        <>
            <Header aleradyCart={false}/>
            <div className={styles.container}>
                <div className={styles.contentDescription}>
                    <div className={styles.columnTop}>
                        <div className={styles.productPrice}>
                            <img src="/milkshake.svg" alt="produto"/>
                            <label>R$ 19,99</label>
                        </div>
                    </div>
                    <div className={styles.columnBottom}>
                        <div className={styles.productDesc}>
                            <p>{id}</p>
                            <div>
                                <button className={styles.buttonBuy}>Comprar</button>
                                <button className={styles.buttonAddCart}>Adicionar ao carrinho</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.columnDescription}>
                    <h2>Descrição</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lor</p>
                </div>

                <div className={styles.contentDescriptionMobile}>
                    <div className={styles.column}>
                        <p className={styles.title}>{id}</p>
                        <img src="/milkshake.svg" alt="produto"/>
                        <h4>Descrição</h4>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lor</p>
                        <label>R$ 19,99</label>
                        <div>
                            <button 
                                   onClick={() =>
                                    toast({
                                      description: "Produto adicionado ao carrinho.",
                                      status: "success",
                                      duration: 2 * 1000,
                                      isClosable: true,
                                    })
                                  }
                             className={styles.buttonBuyMobile}>Comprar</button>
                            <button className={styles.buttonAddCartMobile}>Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>

                <div className={styles.line}></div>

                <div className={styles.slider}>
                    <ProductSlider 
                        title="Mais vendidos"
                        products={donuts}
                        quantitySlider={windowTam <= 1228 ? windowTam >= 883 ? 2 : 1 : 3}
                        colorContent="#FFFFF3"
                        colorAdd="#FFFF00"
                        colorInfo="#D88CFC"
                        />
                </div>

            </div>
            <Footer />
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async() => {

    const paths = [
        {
            params: {id: "1"}
        }
    ]

    return{
        paths,
        fallback: "blocking"
    };
}

export const getStaticProps: GetStaticProps = async(ctx) => {
    const { id } = ctx.params;
    return{
        props: {
            id
        },
        revalidate: 10
    };
}
