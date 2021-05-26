import React, { useState } from 'react';
import styles from '../../styles/cart.module.scss';
import { Header } from '../components/Header';
import { Footer } from '../Footer';
import { FaWhatsapp } from 'react-icons/fa';

export default function Cart(){
    const [count, setCount] = useState<number>(1);

    const addCount = () => {
        setCount(prevState => prevState + 1);
    }

    const removeCount = () => {
        setCount(prevState => prevState === 1 ? prevState = 1 : prevState - 1);
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

                    <div className={styles.cart}>
                        <div>
                            <label>
                                <img src="/donutes.svg" alt="donut" />
                                <p>Donuts de Morango</p>
                            </label>

                            <button>Excluir</button>
                        </div>

                        <div>
                            <button onClick={removeCount}>-</button>
                            <p>{count < 10 ? `0${count}` : count}</p>
                            <button onClick={addCount}>+</button>
                        </div>

                        <h4>R$ 19,99</h4>
                    </div>

                    <div className={styles.cartMobile}>
                        <div>
                            <label>
                                <img src="/donutes.svg" alt="donut" />
                                <p>Donuts de Morango</p>
                            </label>

                            {/* <button>Excluir</button> */}
                        </div>

                        <div>
                            <button onClick={removeCount}>-</button>
                            <p>{count < 10 ? `0${count}` : count}</p>
                            <button onClick={addCount}>+</button>
                        </div>

                        <h4>R$ 19,99</h4>

                        <button className={styles.delete}>Excluir</button>
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
