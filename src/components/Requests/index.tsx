import styles from './index.module.scss';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';

export const Requests = () => {
    return (
        <>
        <h5 className={styles.titleRequest}>Wallace de paula silva</h5>
        <div className={styles.box}>
            <div className={styles.left}>
                <h5># 234df23-f23343fdfs-34f34f</h5>
                <label>
                    <h4>Endereço</h4>
                    <p>Mestre D'armas Módulo 19 Conjunto A casa 5A</p>
                </label>
                <label>
                    <h4>Pagamento</h4>
                    <p>Confirmado</p>
                </label>
                <label>
                    <h4>Encomendado</h4>
                    <p>24/12/2001</p>
                </label>
            </div>
            <div className={styles.mid}>
                <label>
                    <h4>Pedido</h4>
                    <p>4x Donuts de chocolate</p>
                    <p>2x Milkshakes de chocolate</p>
                </label>

                <label>
                    <h4>Valor</h4>
                    <p>R$ 59,00</p>
                </label>

                <label>
                    <h4>Status</h4>
                    <p style={{display: 'flex', alignItems: 'center'}}>Finalizado <FaCheckCircle color="#1ff10c" style={{marginLeft: 5}} /></p>
                </label>
            </div>
            <div className={styles.right}>
                <label>
                    <h4>Contato</h4>
                    <p>kollen22@outlook.com</p>
                    <p>(61) 99178-6805</p>
                </label>
            </div>
        </div>
        </>
    )
}
