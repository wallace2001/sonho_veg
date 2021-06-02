import React from 'react'
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { Graphics } from '../../components/Graphics';

export default function Home(){

    const cardBox = [
        {
            title: "Visualização de hoje",
            value: 54,
            percent: 10.99,
            up: true
        },
        {
            title: "Visualização da semana",
            value: 54,
            percent: 10.99,
            up: false
        },
        {
            title: "Visualização do mês",
            value: 54,
            percent: 10.99,
            up: true
        },
    ]
    const cardBoxPayments = [
        {
            title: "Total ganho hoje",
            value: 54.88,
            percent: 10.99,
            up: true
        },
        {
            title: "Total ganho da semana",
            value: 100.88,
            percent: 10.99,
            up: false
        },
        {
            title: "Total ganho do mês",
            value: 150.21,
            percent: 10.99,
            up: true
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <MenuLeft />
                </div>
                <div className={styles.right}>
                    <HeaderAdmin />
                    <div className={styles.content}>
                        <h4 className={styles.title}>Dashboard</h4>
                        <div className={styles.statusViewers}>
                            {cardBox.map((item, index) => {
                                return(
                                    <div key={index} className={styles.cardBox}>
                                    <p>{item.title}</p>
                                    <div>
                                        <h4>{item.value}</h4>
                                        <p className={item.up ? styles.percentUp : styles.percentDown}>
                                            {item.up 
                                            ? (<BsArrowUp size={22} color="#3F8B03" />) 
                                            : (<BsArrowDown size={22} color="#740202" />)} 
                                            {item.percent}%
                                        </p>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                        <div className={styles.statusPayments}>
                            {cardBoxPayments.map((item, index) => {
                                return(
                                    <div key={index} className={styles.cardBox}>
                                    <p>{item.title}</p>
                                    <div>
                                        <h4>R$ {item.value}</h4>
                                        <p className={item.up ? styles.percentUp : styles.percentDown}>
                                            {item.up 
                                            ? (<BsArrowUp size={22} color="#3F8B03" />) 
                                            : (<BsArrowDown size={22} color="#740202" />)} 
                                            {item.percent}%
                                        </p>
                                    </div>
                                </div>
                                );
                            })}
                        </div>

                        <Graphics title="Gráficos de visualizações" />
                        <Graphics title="Gráficos de ganhos" />
                        <Graphics title="Todas as contas" />
                        <Graphics title="Contas não verificadas" />

                        {/* <div className={styles.contentGraphicsViewer}>
                            <h4>Gráficos de visualizações</h4>
                        </div> */}
                        {/* <footer>
                            <div>
                                <p>©Copyright - todos os direitos autorais reservados.</p>
                            </div>
                        </footer> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
