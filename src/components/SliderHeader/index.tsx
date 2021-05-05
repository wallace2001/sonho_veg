import React, { useState } from 'react'
import { CarouselProvider, Slider, Slide, Dot, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styles from './slider.module.scss';
import { Box } from '@chakra-ui/layout';
import { Button_Global } from '../Button';

import { sliderHeader } from '../../data/sliderHeader';

export const SliderHeader = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    return (
        <CarouselProvider
        className={styles.carousel}
        naturalSlideWidth={100}
        naturalSlideHeight={20}
        totalSlides={4}
        isPlaying={true}
        infinite={true}
        interval={4 * 1000}
        >
          <Slider className={styles.sliderContainer}>
              {sliderHeader.map((item, index) => {
                  return(
                    <Slide key={index} index={index}>

                        <Box d="flex" justifyContent="center" alignItems="center" w="100%" h="25rem" className={styles.slider}>
                        <Box>
                            <img src="/donuts.svg" alt="" />
                        </Box>
                        <Box className={styles.boxSlider} w="33rem" d="flex" alignItems="center" flexDirection="column" p="1rem 1rem">
                            <h2>{item.name}</h2>
                            <Box className={styles.boxSubtitle}>
                                <p>{item.subtitle}</p>
                            </Box>
                            <h1>{item.price}</h1>
                            <Box d="flex" justifyContent="center" mt={5}>
                            <Button_Global
                                textButton="Comprar"
                                color="pink"
                                />
                            </Box>
                        </Box>
                        </Box>
        
                    </Slide>
                  );
              })}
          </Slider>
            <Box d="flex" justifyContent="center" w="100%" position="relative" bottom="5rem">
                {sliderHeader.map((item, index) => {
                    return(
                        <DotGroup
                        dotNumbers={true}
                        renderDots={(e) => {
                            setCurrentSlide(e.currentSlide);
                            }}
                            >
                                <Dot slide={index}>
                                <div style={currentSlide !== index ? {
                                    width: "15px",
                                    height: "15px",
                                    marginRight: "5px",
                                    borderRadius: "100px",
                                    background: "#fff"
                                } : {
                                    width: "15px",
                                    height: "15px",
                                    marginRight: "5px",
                                    borderRadius: "100px",
                                    background: "#ccc"
                                }}></div>
                                </Dot>
                            </DotGroup>
                        );
                    })}
            </Box>
        </CarouselProvider>
    )
}
