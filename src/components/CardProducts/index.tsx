import React from 'react'
import { Box } from '@chakra-ui/layout'
import styles from './index.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

interface Props{
    data: {

        name: string;
        description: string;
        calories: string;
        price: string;
        category: string;
        image: string;
    }
}

export const CardProducts = ({data}: Props) => {
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
                <button className={styles.edit}><AiFillEdit color="#fff" size={16} /></button>
                <button className={styles.delete}><BsFillTrashFill color="#fff" size={16} /></button>
            </Box>
        </Box>
    )
}
