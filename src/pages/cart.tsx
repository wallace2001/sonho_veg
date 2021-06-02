import React, { useEffect, useState } from 'react';
import styles from '../../styles/cart.module.scss';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FaWhatsapp } from 'react-icons/fa';

interface Products{
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

export default function Cart(){
    const [count, setCount] = useState<number>(1);
    const [products, setProducts] = useState<Products[]>([]);

    useEffect(() => {
        const func = async() => {
            const products = await JSON.parse(localStorage.getItem("cart_list"));
            console.log(products);
            setProducts(prevState => products ? [ ...products ] : []);
        }  

        func();

    }, []);

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
                            <p>Nenhum produto no carrinho.</p>
                        ) :(
                            products.map((item, index) => {
                                function addCount(){
                                    setCount(prevState => prevState + 1);
                                }
                                
                                function removeCount(){
                                    setCount(prevState => prevState === 1 ? prevState = 1 : prevState - 1);
                                }
                                return(
                                    <div key={index} className={styles.cart}>
                                        <div className={styles.cart_one}>
                                            <label>
                                                <img src={item?.image} alt="donut" />
                                                <p>{item?.name}</p>
                                            </label>
    
                                            <button>Excluir</button>
                                        </div>
    
                                        <div className={styles.cart_two}> 
                                            <button onClick={() => removeCount()}>-</button>
                                            <p>{count < 10 ? `0${count}` : count}</p>
                                            <button onClick={() => addCount()}>+</button>
                                        </div>
    
                                        <h4>R$ {item?.price}</h4>
                                    </div>
                                );
                            })
                        )}

                    </div>

                    <div>
                        {products.map((item, index) => {
                            function addCount(){
                                setCount(prevState => prevState + 1);
                            }
                            
                            function removeCount(){
                                setCount(prevState => prevState === 1 ? prevState = 1 : prevState - 1);
                            }
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
                                    <button onClick={removeCount}>-</button>
                                    <p>{count < 10 ? `0${count}` : count}</p>
                                    <button onClick={addCount}>+</button>
                                </div>
        
                                <h4>{item?.price}</h4>
        
                                <button className={styles.delete}>Excluir</button>
                            </div>
                            );
                        })}
                    </div>

                    <div className={styles.line} />

                    <div className={styles.payment}>
                        <div>
                            <p>Endereço</p>
                            <button>Adicionar</button>
                        </div>

                        <div>
                            <p>Total</p>
                            <p>R$ 19,99</p>
                        </div>
                    </div>

                    <div className={styles.line} />

                    <div className={styles.paymentButton}>
                        <button>Finalizar</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}
