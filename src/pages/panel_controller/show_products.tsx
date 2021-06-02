import React from 'react'
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Select } from '@chakra-ui/select';
import { Box } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { CardProducts } from '../../components/CardProducts';

export default function ShowProducts(){
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <MenuLeft />
                </div>
                <div className={styles.right}>
                    <HeaderAdmin />
                    <div className={styles.content}>
                        <h4 className={styles.title}>Produtos</h4>
                        <Box w="100%" h="100%" p="0 7rem 100rem 7rem">
                            <FormControl w="10rem" mt={5} mr="1rem">
                                    <FormLabel>Filtrar por</FormLabel>
                                    <Select
                                            bg="#fff"
                                            borderRadius={0}
                                            colorScheme="#000" 
                                            placeholder="Todos">
                                        <option value="2">Bolos</option>
                                        <option value="3">Milkshakes</option>
                                        <option value="3">Donuts</option>
                                    </Select>
                            </FormControl>

                            <Box w="100%" h="auto" p="1rem 0 10rem 0" d="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
                                <CardProducts />
                                <CardProducts />
                                <CardProducts />
                                <CardProducts />
                                <CardProducts />
                                <CardProducts />
                                <CardProducts />
                                <CardProducts />
                                <CardProducts />
                                <CardProducts />
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}