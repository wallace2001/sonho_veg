import { useEffect, useState } from 'react';

import { ProductSlider } from '../components/ProductSlider';
import styles from '../../styles/Home.module.scss';
import { Information } from '../components/Information';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Header } from '../components/Header';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { indexProduct, productsAll } from '../store/actions/products.action';
import {ProductSliderNew} from '../components/ProductSliderNew';


export default function Home() {
  const [windowTam, setWindowTam] = useState<number>();

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(indexProduct());
  }, [dispatch]);
  
  const { products } = useSelector((state: RootStateOrAny) => state.productsReducer);

  useEffect(() => {
    setWindowTam(window.innerWidth);
  },[]);

  return (
    <div className={styles.totalBackground}>
      <div className={styles.totalWallpaper}>
        <Header aleradyCart={true} />
          <div style={{marginTop: '4rem'}}>
            {/* <ProductSliderNew 
              title="MilkShake" 
              products={products?.milkshake} 
              colorAdd="#D88CFC"
              colorInfo="#FEE875"
              colorContent="rgb(250, 243, 255)"
              /> */}
            <ProductSlider 
              title="MilkShakes"
              products={products?.milkshake}
              quantitySlider={windowTam <= 1240 ? windowTam >= 683 ? 2 : 1 : 4}
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
              products={products?.donut}
              quantitySlider={windowTam <= 1240 ? windowTam >= 683 ? 2 : 1 : 4}
              colorContent="rgb(250, 243, 255)"
              colorAdd="#D88CFC"
              colorInfo="#FEE875"
            />
            </div>

            <div className={styles.three_product} style={{marginTop: '4rem'}}>
              <div>
              <ProductSlider 
              title="Bolos"
              products={products?.cake}
              quantitySlider={windowTam <= 1240 ? windowTam >= 683 ? 2 : 1 : 4}
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
                  buttonRoute="/contact"
                  description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to"
                  title="Entre em contato"
                />
            </div>

            <div className={styles.line} />

            <div className={styles.containerContact}>
              <Information 
                title="Sobre a gente"
                buttonText="Ver mais"
                buttonRoute="/about"
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
