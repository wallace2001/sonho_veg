import { useContext, useEffect, useState } from 'react';
import styles from '../../styles/Home.module.scss';
import { Button_Global } from '../components/Button';
import { MenuHeader } from '../components/Header';
import { AuthContext } from '../context/authContext';
import { HeaderMenu } from "../data/header";
import { FaUserAlt } from 'react-icons/fa';
import { MenuIcon } from '../components/MenuIcon';
import { Login, Register } from '../components/LoginAndRegister';
import { Box, Divider } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { SliderHeader } from '../components/SliderHeader';
import { IoMdCart } from 'react-icons/io';
import { ProductSlider } from '../components/ProductSlider';

import { milkshakes } from '../data/milkshakeData';
import { donuts } from '../data/donuts';
import { Information } from '../components/Information';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Cart } from '../components/Cart';

export default function Home() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [windowTam, setWindowTam] = useState<number>();
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const { auth } = useContext(AuthContext);

  const onCloseCart = () => {
    setIsOpenCart(prevState => prevState = false);
  }

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

          <div className={styles.cart} onClick={() => setIsOpenCart(prevState => prevState = true)}>
            <IoMdCart size={25} color="#fff" />
          </div>

          <div className={styles.cartValue} onClick={() => setIsOpenCart(prevState => prevState = true)}> 
            <p>1</p>
          </div>
          
          <Cart 
            isOpen={isOpenCart}
            onClose={onCloseCart}
          />
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

            <div className={styles.three_product} style={{marginTop: '4rem'}}>
              <div>
                <ProductSlider 
                  title="Bolos"
                  products={milkshakes}
                  colorContent="rgb(250, 243, 255)"
                  colorAdd="#D88CFC"
                  colorInfo="#FEE875"
                  />
              </div>
            </div>

            <div className={styles.containerContact}>
              <Information 
                  buttonText="Entre em contato"
                  image="/contact.svg"
                  description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to"
                  title="Entre em contato"
                />
            </div>

            <div className={styles.line} />

            <div className={styles.containerContact}>
              <Information 
                title="Sobre a gente"
                buttonText="Entre em contato"
                image="/about.svg"
                reverse={true}
                description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to"
              />
            </div>

            <div className={styles.line} />
            
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
          </div>
        </div>
  )
}
