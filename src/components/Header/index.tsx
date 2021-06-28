import { Box, Text } from '@chakra-ui/layout';
import React, { useContext, useEffect, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import styles from './style.module.scss';
import { AuthContext } from '../../context/authContext';
import { HeaderMenu } from '../../data/header';
import { Button_Global } from '../Button';
import { MenuHeader } from '../ButtonHeader';
import { Login, Register } from '../LoginAndRegister';
import { MenuIcon } from '../MenuIcon';
import { SliderHeader } from '../SliderHeader';
import { useRouter } from 'next/router';
import { RootStateOrAny, useSelector } from 'react-redux';

interface CartProps{
    aleradyCart: boolean
}

export const Header = (props: CartProps) => {
    const [isOpenRegister, setIsOpenRegister] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);

    const { account } = useSelector((state: RootStateOrAny) => state.authReducer);
    const router = useRouter();

    const { lengthCart } = useContext(AuthContext);

    useEffect(() => {
      const func = async() => {
        const cart: number = await JSON.parse(localStorage.getItem("cart_list_length"));

      }

      func();
    }, []);

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
                {account.ok ? (
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
                    <p>{lengthCart}</p>
                </div>
              </>
          )}
        </div>
    )
}
