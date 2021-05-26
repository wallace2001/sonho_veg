import { Box, Text } from '@chakra-ui/layout';
import React, { useContext, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import styles from './style.module.scss';
import { AuthContext } from '../../context/authContext';
import { HeaderMenu } from '../../data/header';
import { Button_Global } from '../Button';
import { MenuHeader } from '../ButtonHeader';
import { Cart } from '../Cart';
import { Login, Register } from '../LoginAndRegister';
import { MenuIcon } from '../MenuIcon';
import { SliderHeader } from '../SliderHeader';
import { useRouter } from 'next/router';

interface CartProps{
    aleradyCart: boolean
}

export const Header = (props: CartProps) => {
    const [isOpenRegister, setIsOpenRegister] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const { auth } = useContext(AuthContext);
    const router = useRouter();

    const onCloseCart = () => {
        setIsOpenCart(prevState => prevState = false);
      }

    return (
        <div className={styles.background}>
          <div className={styles.container}>
            <main className={styles.main}>

              <div className={styles.left}>
                <div />
              </div>

              <div className={styles.mid}>
                <ul>
                  {HeaderMenu.map((item, index) => {
                    return(
                      <a key={index} onClick={() => router.push(item.from)}>{item.name}</a>
                    );
                  })}
                </ul>
              </div>

              <div className={styles.footer}>
                {auth.user ? (
                  <MenuHeader />
                ) : (
                  <Box d="flex" alignItems="center">
                  <Box onClick={() => setIsOpenLogin(prevState => prevState = true)}>
                    <Button_Global 
                      textButton="Entrar"
                      icon={<FaUserAlt color="#fff" />}
                      color="pink"
                      />

                      <Login 
                        isOpen={isOpenLogin}
                        onClose={() => setIsOpenLogin(prevState => prevState = false)}
                      />

                      <Register 
                        isOpen={isOpenRegister}
                        onClose={() => setIsOpenRegister(prevState => prevState = false)}                      
                      />

                  </Box>
                  <Box onClick={() => setIsOpenRegister(prevState => prevState = true)}>
                    <Text>Cadastrar</Text>
                  </Box>
                    </Box>
                )}

              </div>

              <div className={styles.menuIcon}>
                <MenuIcon />
              </div>

            </main>
          </div>
          {props.aleradyCart && (
              <>
                    <div className={styles.content}>
                    <div className={styles.contentBackground}>
                        
                        <SliderHeader />

                    </div>
                </div>

                <div className={styles.cart} onClick={() => router.push('/cart')}>
                    <IoMdCart size={25} color="#fff" />
                </div>

                <div className={styles.cartValue} onClick={() => router.push('/cart')}> 
                    <p>1</p>
                </div>
              </>
          )}
        </div>
    )
}
