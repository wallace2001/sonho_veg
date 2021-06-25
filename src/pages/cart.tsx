import React, { useEffect, useState } from 'react';
import styles from '../../styles/cart.module.scss';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FaWhatsapp } from 'react-icons/fa';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { change } from '../store/actions/notify.action';
import Cookies from 'js-cookie';
import { Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { deleteCartDatabase, paymentPage, saveCartDatabase } from '../store/actions/payment.action';
import { Button_Global } from '../components/Button';
import { CarouselButton } from '../components/CarouselButton';
import format from 'date-fns/format';

interface Products{
    calories: string;
    categories_id: string;
    products_id?: string;
    description: string;
    id: string;
    image: string;
    name: string;
    price: string;
    price_single?: string;
    slug: string;
    quantity: number;
}

export default function Cart(){
    const [count, setCount] = useState<number>(1);
    const [products, setProducts] = useState<Products[]>([]);
    const [totalPrice, setTotalPrice] = useState<any>(0);
    const [open, setOpen] = useState<boolean>(false);
    const { setTeste, teste } = useContext(AuthContext);

    const dispatch = useDispatch();
    const { date } = useSelector((state: RootStateOrAny) => state.schedulingReducer);

    useEffect(() => {
        const func = async() => {
            const products = await JSON.parse(localStorage.getItem("cart_list"));

            setProducts(prevState => products ? [ ...products ] : []);

            let totalPrice = 0;
            if(products){
                for (let i = 0; i < products.length; i++) {
                    totalPrice = Number(Number(totalPrice) + Number(products[i].price));
                }
            }

            setTotalPrice(totalPrice.toFixed(2));
        }

        func();

    }, [count]);


    async function addCount(id: string, index: number){
        const products: [Products] = await JSON.parse(localStorage.getItem("cart_list"));

        const quantity = Number(products[index].quantity);
        const finalQuantity = Number(quantity) + 1;
        const priceSingle = Number(products[index].price_single);

        const finalPrice = (finalQuantity * priceSingle).toFixed(2);

        products[index].quantity = finalQuantity;
        products[index].price = finalPrice;

        console.log(finalPrice);

        localStorage.setItem("cart_list", JSON.stringify(products));
        setCount(prevState => prevState + 1);
    }
    
    async function removeCount(id: string, index: number){
        const products: [Products] = await JSON.parse(localStorage.getItem("cart_list"));

        const priceSingle = Number(products[index].price_single);
        const quantity = Number(products[index].quantity);
        const finalQuantity = Number(quantity) <= 1 ? Number(quantity) : Number(quantity) - 1;

        const finalPrice = (priceSingle * finalQuantity).toFixed(2);

        products[index].quantity = finalQuantity;
        products[index].price = finalPrice;

        console.log(products);

        localStorage.setItem("cart_list", JSON.stringify(products));
        setCount(prevState => prevState + 1);
    }

    async function handleClickDeleteItemCart(prdoc: Products){
        const items: [Products] = await JSON.parse(localStorage.getItem("cart_list"));
        const leng: number = await JSON.parse(localStorage.getItem("cart_list_length"));
        localStorage.setItem("cart_list_length", JSON.stringify(leng - 1));

        const itemsUdpdate: any = items.filter(item => item.id !== prdoc.id);

        dispatch(deleteCartDatabase(prdoc.id));

        dispatch(change({
            open: true,
            title: `${prdoc.name} foi excluido do carrinho.`,
            status: 'success',
            duration: 2 * 1000
        }));

        setTimeout(() => {
            dispatch(change({
                open: false,
            }));
        }, 2 * 1000);

        localStorage.setItem("cart_list", JSON.stringify(itemsUdpdate));
        setCount(prevState => prevState + 1);
        setTeste(teste + 1);
    }

    async function handlePayment(){
        const items: [Products] = await JSON.parse(localStorage.getItem("cart_list"));
        if(!date){
            return dispatch(change({
                open: true,
                title: "Agende uma data, por favor!",
                status: 'error',
                duration: 2 * 1000
            }))
        }
        dispatch(saveCartDatabase(items, date));
    }

    return(
        <>
            <Header aleradyCart={false}/>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.title}>
                        <p>Carrinho</p>
                    </div>

                    <div className={styles.line} />

                    <div className={styles.warning}>
                        <h4>Atenção</h4>
                        <p>Por questão de segurança, é necessário realizar metade do pagamento antes da gente começar a produzir seu pedido. Para dúvidas, clique no botão abaixo.</p>
                        <button><FaWhatsapp size={25} color='#fff' style={{ marginRight: 8 }} /> WhatsApp</button>
                    </div>

                    <div className={styles.line} />
                    
                    <div className={styles.cartWrap}>
                        {products.length === 0 ? (
                            <Box d="flex" p="1rem 0" justifyContent="center" alignItems="center" flexDirection="column">
                                <img style={{width: "50%", height: "50%", objectFit: "contain"}} src="/empty_cart.svg" alt="carrinho vazio"/>
                                <p style={{marginTop: "1rem", fontSize: "1.5rem"}}>Carrinho vazio</p>
                            </Box>
                        ) :(
                            products.map((item, index) => {

                                return(
                                    <div key={index} className={styles.cart}>
                                        <div className={styles.cart_one}>
                                            <label>
                                                <img src={item?.image} alt="donut" />
                                                <p>{item?.name}</p>
                                            </label>
                                            <button onClick={() => handleClickDeleteItemCart(item)}>Excluir</button>
                                        </div>
    
                                        <div className={styles.cart_two}> 
                                            <button onClick={() => removeCount(item.id, index)}>-</button>
                                            <p>{Number(item.quantity) < 10 ? `0${Number(item.quantity)}` : Number(item.quantity)}</p>
                                            <button onClick={() => addCount(item.id, index)}>+</button>
                                        </div>
    
                                        <h4>R$ {item?.price}</h4>
                                    </div>
                                );
                            })
                        )}

                    </div>

                    <div>
                        {products.map((item, index) => {
                            return(
                                <div key={index} className={styles.cartMobile}>
                                <div key={index}>
                                    <label>
                                        <img src={item?.image} alt="donut" />
                                        <p>{item?.name}</p>
                                    </label>
        
                                    {/* <button>Excluir</button> */}
                                </div>
        
                                <div>
                                    <button onClick={() => removeCount(item.id, index)}>-</button>
                                    <p>{Number(item?.quantity) < 10 ? `0${Number(item?.quantity)}` : Number(item?.quantity)}</p>
                                    <button onClick={() => addCount(item.id, index)}>+</button>
                                </div>
        
                                <h4>R$ {item?.price}</h4>
        
                                <button onClick={() => handleClickDeleteItemCart(item)} className={styles.delete}>Excluir</button>
                            </div>
                            );
                        })}
                    </div>

                    <div className={styles.line} />

                    <div className={styles.payment}>

                        <div>
                            <p>Agendamento</p>
                            <Button_Global onClick={ () => setOpen(true) } colorScheme="pink" textButton={date ? format(date, "dd/MM/yyyy") : "Agendar"} />
                            
                        </div>

                        <div>
                            <p>Total</p>
                            <p>R$ {totalPrice}</p>
                        </div>
                    </div>

                    <div className={styles.line} />

                    <div className={styles.paymentButton}>
                        <button onClick={handlePayment}>Finalizar</button>
                    </div>
                </div>
            </div>
            <Footer />
            <CarouselButton open={open} setOpen={setOpen} />
        </>

    );
}
