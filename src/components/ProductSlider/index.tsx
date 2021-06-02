import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { Box } from '@chakra-ui/layout';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineExclamation } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Storage } from '../../utils/storage';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { change } from '../../store/actions/notify.action';
import { changeShowProduct, showProduct } from '../../store/actions/products.action';
import axios from 'axios';
import { Http } from '../../config/http';

interface Products{
    calories: string;
    categories_id: string;
    products_id?: string;
    description: string;
    id: string;
    image: string;
    name: string;
    price: string;
    slug: string;
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
    const dispatch = useDispatch();

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

    
  const handleClickViewerProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleSaveStorage = async (product: Products, slug: string) => {
    const cart = await JSON.parse(localStorage.getItem("cart_list"));
    const oldCart: Array<[]> = cart ? cart : [];
    let array = oldCart;

    const newItem: any = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        description: product.description,
        calories: product.calories,
        categories_id: product.categories_id,
        products_id: product.products_id,
    }
    const find = array.find((item: any) => {
        return item.id == product.id
    });

    if(find){
        oldCart.push();
        dispatch(change({
            open: true,
            title: "Produto já adicionado ao carrinho.",
            status: "error",
            duration: 2 * 1000
        }));
    }else{
        oldCart.push(newItem);
        dispatch(change({
            open: true,
            title: "Produto adicionado ao carrinho.",
            status: "success",
            duration: 2 * 1000
        }));
    }
    await localStorage.setItem("cart_list", JSON.stringify(oldCart));
  }

    return (
        <div className={styles.container}>
            <div className={styles.background}>

                <p className={styles.title}>{props.title}</p>

                <div className={styles.content}>
                <CarouselProvider
            className={styles.carousel}
            naturalSlideWidth={40}
            naturalSlideHeight={tamSlider}
            totalSlides={props.products?.length}
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
                {props?.products?.map((item, index) => {
                    return(
                        <Slide key={index} index={index}>
                            <Box d="flex" flexDirection="column" alignItems="center" justifyContent="center">

                                <Box className={styles.slider} bg={props.colorContent}>
                                    <Box d="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                        <h2 style={{textAlign: 'center'}}>{item.name}</h2>
                                        <img src={item.image} alt="" />
                                    </Box>
                                    <Box className={styles.boxSlider} w="33rem" d="flex" alignItems="center" flexDirection="column" p="1rem 1rem">
                                        <Box className={styles.boxSubtitle}>
                                            <p>{item.description}</p>
                                        </Box>
                                        <h1>{item.price}</h1>
                                    </Box>
                                </Box>

                                <Box className={styles.infoBalls} d="flex" alignItems="center">
                                    <button onClick={() => handleSaveStorage(item, item.slug)} style={{background: props.colorAdd}}><FiPlus color="#fff" size={25} /></button>
                                    <button style={{background: props.colorInfo, cursor: "pointer"}} onClick={() => handleClickViewerProduct(item.id)}><AiOutlineExclamation color="#fff" size={25} /></button>
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
