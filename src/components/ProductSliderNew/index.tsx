import React, { useState, useEffect } from 'react';

import styles from './index.module.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { change } from '../../store/actions/notify.action';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineExclamation } from 'react-icons/ai';

interface Products{
    calories: string;
    categories_id: string;
    products_id?: string;
    description: string;
    id: string;
    image: string;
    name: string;
    price: string;
    quantity: number;
    slug: string;
}

interface PropsProductSlider{
    title: string;
    products: Array<Products>
    colorContent: string;
    // quantitySlider: number;
    colorAdd: string;
    colorInfo: string;
}

export const ProductSliderNew = (props: PropsProductSlider) => {

    const [windowTam, setWindowTam] = useState<number>();
    const [slider, setSlider] = useState<any>();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        setWindowTam(window.innerWidth)
    }, []);

    console.log(props.products);

    const handleSaveStorage = async (product: Products, slug: string) => {
        const cart = await JSON.parse(localStorage.getItem("cart_list"));
        const oldCart: Array<[]> = cart ? cart : [];
        let array = oldCart;
    
        console.log(product);
    
        const newItem: any = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
            quantity: product.quantity,
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
            setTimeout(() => {
                dispatch(change({
                    open: false
                }));
            }, 2 * 1000);
        }else{
            oldCart.push(newItem);
            dispatch(change({
                open: true,
                title: "Produto adicionado ao carrinho.",
                status: "success",
                duration: 2 * 1000
            }));
            setTimeout(() => {
                dispatch(change({
                    open: false
                }));
            }, 2 * 1000);
        }
        await localStorage.setItem("cart_list", JSON.stringify(oldCart));
      }

    const handleClickViewerProduct = (id: string) => {
        router.push(`/product/${id}`);
      };

    const next = () => {
        setSlider(slider.slickNext());
    }

    const previus = () => {
        setSlider(slider.slickPrev());
    }

    function SamplePrevArrow(props) {
        console.log(props);
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
          />
        );
      }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
          />
        );
      }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: props.products?.length <= 1 ? 1 : windowTam <= 1248 ? windowTam <= 856 ? 1 : 2 : 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };

      console.log(props?.products);

    return (
        <>
      <div className={styles.container}>
        <h2 className={styles.title}>{props?.title}</h2>
        <Slider ref={(c) => setSlider(c)} {...settings}>
            {props?.products?.map((item, index) => {
                return(
                    <div className={styles.boxContent}>
                        <div style={{backgroundColor: props.colorContent}} className={styles.content}>
                            <h1>{item.name}</h1>
                            <img src={item.image} alt={item.name} />
                            <p>{item.description}</p>
                            <h2>R$ {item.price}</h2>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={() => handleSaveStorage(item, item.slug)} style={{background: props.colorAdd}}><FiPlus color="#fff" size={25} /></button>
                            <button style={{background: props.colorInfo, cursor: "pointer"}} onClick={() => handleClickViewerProduct(item.id)}><AiOutlineExclamation color="#fff" size={25} /></button>
                        </div>
                    </div>
                );
            })}
        </Slider>

      </div>
        </>
    )
}
