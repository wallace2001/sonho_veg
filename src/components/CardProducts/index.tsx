import React from 'react'
import { Box } from '@chakra-ui/layout'
import styles from './index.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

interface Props{
    
}

export const CardProducts = (props) => {
    return (
        <Box
        className={styles.cardContent}
        h="60%" 
        d="flex" 
        flexDirection="column" 
        margin="1.5rem 1.5rem 1rem 1.5rem"
        >
            <Box 
                w="100%" 
                h="md" 
                mt={10} 
                bg="#fff" 
                borderRadius={10} 
                p=" 1rem 2rem" 
                d="flex" 
                justifyContent="space-between" 
                flexDirection="column" 
                alignItems="center"
                className={styles.cardProducts}
                >
                    <h1>Morango</h1>
                    <img src="/donutes.svg" alt="" />
                    <p>It is a long eer will be distracted by the readable content of a page when looki</p>
                    <h3>R$ 19,99</h3>
            </Box>
            <Box mt={5} d="flex" justifyContent="space-evenly">
                <button className={styles.edit}><AiFillEdit color="#fff" /></button>
                <button className={styles.delete}><BsFillTrashFill color="#fff" /></button>
            </Box>
        </Box>
    )
}
