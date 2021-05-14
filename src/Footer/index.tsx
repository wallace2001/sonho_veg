import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import styles from './style.module.scss';

export const Footer = () => {
    return (
        <>
            <div className={styles.footerMedia}>
              <div className={styles.contentFooter}>
                <label>
                  <h2>LOGO</h2>
                  <p>Comidas veganas</p>
                </label>
                <label>
                  <p>Sobre</p>
                  <p>Contato</p>
                </label>
              </div>
            </div>  

            <div className={styles.line} />  
            
            <div className={styles.mediaSocial}>
              <div className={styles.contentMediaSocial}>
                <div>
                  <FaInstagram size={30} style={{marginRight: "2rem"}} />
                  <FaFacebook size={30} color="#1877F2"/>
                </div>

                <p>©Copyright - todos os direitos autorais reservados.</p>
              </div>
            </div>  
        </>
    )
}
