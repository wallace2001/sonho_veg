import React, { useEffect, useState } from 'react'
import styles from './index.module.scss';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { milkshakes } from '../../data/milkshakeData';
import { Box } from '@chakra-ui/layout';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineExclamation } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export const ProductSlider = () => {
    const [windowTam, setWindowTam] = useState<number>();

    useEffect(() => {
        setWindowTam(window.innerWidth);
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.background}>

                <p className={styles.title}>MilkShakes</p>

                <div className={styles.content}>
                <CarouselProvider
            className={styles.carousel}
            naturalSlideWidth={40}
            naturalSlideHeight={50}
            totalSlides={milkshakes.length}
            infinite={true}
            visibleSlides={windowTam <= 1240 ? windowTam >= 683 ? 2 : 1 : 4}
            >
                <Box d="flex" justifyContent="space-between" position="relative">
                    <Box position="relative" top="10rem" left="1rem">
                        <ButtonBack>
                            <IoIosArrowBack size={30}/>
                        </ButtonBack>
                    </Box>
            <Slider className={styles.sliderContainer}>
                {milkshakes.map((item, index) => {
                    return(
                        <Slide key={index} index={index}>
                            <Box d="flex" flexDirection="column" alignItems="center" justifyContent="center">

                                <Box className={styles.slider}>
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
                                    <div><FiPlus color="#fff" size={25} /></div>
                                    <div><AiOutlineExclamation color="#fff" size={25} /></div>
                                </Box>
                            </Box>
                        </Slide>
                    );
})}
            </Slider>

            <Box position="relative" top="10rem" right="1rem">
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
