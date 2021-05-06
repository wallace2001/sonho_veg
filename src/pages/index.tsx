import { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Home.module.scss';
import { Button_Global } from '../components/Button';
import { MenuHeader } from '../components/Header';
import { AuthContext } from '../context/authContext';
import { HeaderMenu } from "../data/header";
import { FaUserAlt } from 'react-icons/fa';
import { MenuIcon } from '../components/MenuIcon';
import { Login, Register } from '../components/LoginAndRegister';
import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { SliderHeader } from '../components/SliderHeader';
import { IoMdCart } from 'react-icons/io';
import { ProductSlider } from '../components/ProductSlider';

import { milkshakes } from '../data/milkshakeData';
import { donuts } from '../data/donuts';

export default function Home() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [windowTam, setWindowTam] = useState<number>();
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    setWindowTam(window.innerWidth);
  },[]);

  return (
    <div className={styles.totalBackground}>
      <div className={styles.totalWallpaper}>
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
                      <a key={index}>{item.name}</a>
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
          <div className={styles.content}>
            <div className={styles.contentBackground}>
                
                <SliderHeader />

            </div>
          </div>

          <div className={styles.cart}>
            <IoMdCart size={25} color={windowTam <= 500 ? "#fff" : "#FFC9F0" } />
          </div>

          <div className={styles.cartValue}> 
            <p>1</p>
          </div>
          
        </div>
          <div style={{marginTop: '4rem'}}>
            <ProductSlider 
              title="MilkShakes"
              products={milkshakes}
              colorContent="rgb(250, 243, 255)"
              colorAdd="#D88CFC"
              colorInfo="#FEE875"
            />
          </div>

          <div className={styles.dream_veg}>
            <div className={styles.background_second}>
                  <div>
                    <img src="/donts.svg" alt="" />
                  </div>

                  <div>
                    <h2>Sonho Veg</h2>
                    <p>It is a long eer will be distracted by the readable content of a page when looki</p>
                  </div>
            </div>
          </div>

            <div style={{marginTop: '4rem'}}>
              <ProductSlider 
                title="Donuts"
                products={donuts}
                colorContent="#FFFFF3"
                colorAdd="#FFFF00"
                colorInfo="#D88CFC"
              />
            </div>
          </div>
        </div>
  )
}
