import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Box } from '@chakra-ui/layout';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineExclamation } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Spinner } from '@chakra-ui/spinner';

interface Products{
    name: string;
    img: string;
    description: string;
    price: string;
}

interface PropsProductSlider{
    title: string;
    products: Array<Products>
    colorContent: string;
    colorAdd: string;
    quantitySlider: number;
    colorInfo: string;
}

export const ProductSlider = (props: PropsProductSlider) => {
    const [windowTam, setWindowTam] = useState<number>();
    const [tamSlider, setTamSlider] = useState<number>();
    const router = useRouter();

    useEffect(() => {
        setWindowTam(window.innerWidth);
        console.log(innerWidth);
        if(window.innerWidth >= 1300){
            setTamSlider(60)
        }else if(window.innerWidth <= 983){
            window.innerWidth <= 700 ? setTamSlider(60) : setTamSlider(50);
        }else{
            setTamSlider(50);
        }
    }, []);

    
  const handleClickViewerProduct = (name: string) => {
    router.push(`/product/${name}`);
  };

    return (
        <div className={styles.container}>
            <div className={styles.background}>

                <p className={styles.title}>{props.title}</p>

                <div className={styles.content}>
                <CarouselProvider
            className={styles.carousel}
            naturalSlideWidth={40}
            naturalSlideHeight={tamSlider}
            totalSlides={props.products.length}
            infinite={true}
            visibleSlides={props.quantitySlider}
            >
                <Box d="flex" justifyContent="space-between" position="relative">
                    <Box position="relative" top="15rem" left="0.5rem">
                        <ButtonBack>
                            <IoIosArrowBack size={30}/>
                        </ButtonBack>
                    </Box>
            <Slider className={styles.sliderContainer}>
                {props.products.map((item, index) => {
                    return(
                        <Slide key={index} index={index}>
                            <Box d="flex" flexDirection="column" alignItems="center" justifyContent="center">

                                <Box className={styles.slider} bg={props.colorContent}>
                                    <Box d="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                        <h2>{item.name}</h2>
                                        <img src={item.img} alt="" />
                                    </Box>
                                    <Box className={styles.boxSlider} w="33rem" d="flex" alignItems="center" flexDirection="column" p="1rem 1rem">
                                        <Box className={styles.boxSubtitle}>
                                            <p>{item.description}</p>
                                        </Box>
                                        <h1>{item.price}</h1>
                                    </Box>
                                </Box>

                                <Box className={styles.infoBalls} d="flex" alignItems="center">
                                    <button style={{background: props.colorAdd}}><FiPlus color="#fff" size={25} /></button>
                                    <button style={{background: props.colorInfo, cursor: "pointer"}} onClick={() => handleClickViewerProduct(props.title)}><AiOutlineExclamation color="#fff" size={25} /></button>
                                </Box>
                            </Box>
                        </Slide>
                    );
})}
            </Slider>

            <Box position="relative" top="15rem" right="0.5rem">
                <ButtonNext>
                    <IoIosArrowForward size={30}/>
                </ButtonNext>
            </Box>
                
                </Box>
            </CarouselProvider>
                </div>
            </div>
        </div>
    )
}
