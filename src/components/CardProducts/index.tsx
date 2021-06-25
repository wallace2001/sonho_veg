import React from 'react'
import { Box } from '@chakra-ui/layout'
import styles from './index.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/actions/products.action';
import { useState } from 'react';
import { ModalEdit } from '../ModalEditProduct';

interface Props{
    data: {
        id: string;
        name: string;
        description: string;
        calories: string;
        price: string;
        category: string;
        image: string;
    }
}

interface PropsProduct{
    id: string;
    name: string;
    description: string;
    calories: string;
    price: string;
    category: string;
    image: string;
}

export const CardProducts = ({data}: Props) => {

    const [open, setOpen] = useState<boolean>(false);
    const [item, setItem] = useState<PropsProduct>();
    const dispatch = useDispatch();
    const handleDelete = (id: string) => {
        dispatch(deleteProduct(id));
    };

    const onClose = () => {
        setOpen(prevState => !prevState);
    }

    const handleEdit = (data: PropsProduct) => {
        setItem(data);
        setOpen(prevState => true);
    }

    return (
        <Box
        className={styles.cardContent}
        h="60%" 
        d="flex" 
        flexDirection="column" 
        alignItems="center"
        >
            <Box 
                // w="80%" 
                h="25rem" 
                mt={10} 
                bg="#fff" 
                borderRadius={10} 
                p=" 0.6rem" 
                d="flex" 
                justifyContent="space-between" 
                flexDirection="column"
                alignItems="center"
                className={styles.cardProducts}
                >
                    <h1 style={{textAlign: 'center'}}>{data.name}</h1>
                    <img src={data.image} alt="" />
                    <p>{data.description}</p>
                    <h3>{data.price}</h3>
            </Box>
            <Box w="100%" mt={5} d="flex" justifyContent="space-evenly">
                <button className={styles.edit} onClick={() => handleEdit(data)}><AiFillEdit color="#fff" size={16} /></button>
                <button className={styles.delete} onClick={() => handleDelete(data.id)}><BsFillTrashFill color="#fff" size={16} /></button>
            </Box>
            <ModalEdit open={open} onClose={onClose} item={item} />
        </Box>
    )
}
