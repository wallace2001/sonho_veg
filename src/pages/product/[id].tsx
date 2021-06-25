import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Spinner } from '@chakra-ui/spinner';
import { Box } from '@chakra-ui/layout';
import styles from '../../../styles/product.module.scss';
import { Header } from '../../components/Header';
import { ProductSlider } from '../../components/ProductSlider';
import { donuts } from '../../data/donuts';
import { Footer } from '../../components/Footer';
import { changeLoading } from '../../store/actions/loading.action';
import { Loading } from '../../components/loading';
import { changeMessage } from '../../store/actions/message.action';
import { Notify } from '../../components/Notify';
import { Alert } from '@chakra-ui/alert';
import { useToast } from '@chakra-ui/toast';
import { accountVerify } from '../../store/actions/auth.action';
import { productsAll, showProduct } from '../../store/actions/products.action';
import { change } from '../../store/actions/notify.action';
import { useRouter } from 'next/router';

interface NotifyProps{
    open: boolean;
    time: number;
    class: string;
    message: string;
}

interface Products{
    product: {

        calories: string;
        categories_id: string;
        products_id?: string;
        description: string;
        id: string;
        image: string;
        name: string;
        price: string;
        slug: string;
    }
}

export default function Product({ id }){
    const [windowTam, setWindowTam] = useState<number>();
    const [loadingPage, setLoadingPage] = useState(true);
    const toast = useToast()
    const router = useRouter();

    setTimeout(() => {
        setLoadingPage(false);
    }, 2 * 1000);

    useEffect(() => {
      setWindowTam(window.innerWidth);
    },[]);

    const dispatch = useDispatch();
    const { product } = useSelector((state: RootStateOrAny) => state.productsReducer) as Products;

    useEffect(() => {
        dispatch(showProduct(id));
    }, [dispatch]);

    const handleSaveStorage = async () => {
        const cart = await JSON.parse(localStorage.getItem("cart_list"));
        const oldCart: Array<[]> = cart ? cart : [];
        let array = oldCart;
    
        const newItem: any = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
            description: product.description,
            calories: product.calories,
            categories_id: product.categories_id,
            products_id: product.products_id,
        }
        const find = array.find((item: any) => {
            return item.id == product.products_id
        });
    
        if(find){
            oldCart.push();
            await dispatch(change({
                open: true,
                title: "Produto já adicionado ao carrinho.",
                status: "error",
                duration: 2 * 1000
            }));
            dispatch(change({
                open: false
            }));
        }else{
            oldCart.push(newItem);
            await dispatch(change({
                open: true,
                title: "Produto adicionado ao carrinho.",
                status: "success",
                duration: 2 * 1000
            }));
            dispatch(change({
                open: false
            }));
        }
        await localStorage.setItem("cart_list", JSON.stringify(oldCart));
      }
      console.log(product.name);
    return(
        <>
            <Header aleradyCart={false}/>
            <div className={styles.container}>
                <div className={styles.contentDescription}>
                    <div className={styles.columnTop}>
                        <div className={styles.productPrice}>
                            <img src="/milkshake.svg" alt="produto"/>
                            <label>R$ {product.price}</label>
                        </div>
                    </div>
                    <div className={styles.columnBottom}>
                        <div className={styles.productDesc}>
                            <p>{product.name}</p>
                            <div>
                                <button onClick={() => router.push('/cart')} className={styles.buttonBuy}>Comprar</button>
                                <button onClick={handleSaveStorage} className={styles.buttonAddCart}>Adicionar ao carrinho</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.columnDescription}>
                    <h2>Descrição</h2>
                    <p>{product.description}</p>
                </div>

                <div className={styles.contentDescriptionMobile}>
                    <div className={styles.column}>
                        <p className={styles.title}>{product.name}</p>
                        <img src="/milkshake.svg" alt="produto"/>
                        <h4>Descrição</h4>
                        <p>{product.description}</p>
                        <label>R$ {product.price}</label>
                        <div>
                            <button 
                            onClick={() => router.push('/cart')}
                             className={styles.buttonBuyMobile}>Comprar</button>
                            <button onClick={handleSaveStorage} className={styles.buttonAddCartMobile}>Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>

                <div className={styles.line}></div>

                {/* <div className={styles.slider}>
                    <ProductSlider 
                        title="Mais vendidos"
                        products={donuts}
                        quantitySlider={windowTam <= 1228 ? windowTam >= 883 ? 2 : 1 : 3}
                        colorContent="#FFFFF3"
                        colorAdd="#FFFF00"
                        colorInfo="#D88CFC"
                        />
                </div> */}

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
    const { id, slug } = ctx.params;
    return{
        props: {
            id,
        },
        revalidate: 10
    };
}
