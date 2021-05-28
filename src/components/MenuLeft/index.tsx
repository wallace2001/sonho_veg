import React from 'react'
import styles from './index.module.scss';
import { AiOutlineDashboard, AiOutlineMail, AiFillPlusCircle } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { RiLogoutBoxLine } from 'react-icons/ri';

export const MenuLeft = () => {
    return (
        <div className={styles.container}>
            <h1>Sonho <strong>Veg</strong></h1>
            <div className={styles.content}>
                <div>
                    <button><AiOutlineDashboard style={{marginRight: 7}} />Dashboard</button>
                    <button><AiOutlineMail style={{marginRight: 7}} />Enviar e-mails</button>
                </div>
                <div>
                    <button><AiFillPlusCircle style={{marginRight: 7}} />Adicionar Produtos</button>
                    <button><BiFoodMenu style={{marginRight: 7}} />Pedidos</button>
                    <button><HiOutlineShoppingBag style={{marginRight: 7}} />Compras</button>
                </div>
                <div>
                    <button><RiLogoutBoxLine style={{marginRight: 7}} />Sair do painel</button>
                </div>
            </div>
        </div>
    )
}
