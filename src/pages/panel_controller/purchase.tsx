import React from 'react'
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Select } from '@chakra-ui/select';
import { Box, Text } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { GetServerSideProps } from 'next';

export default function SendEmail(){
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <MenuLeft />
                </div>
                <div className={styles.right}>
                    <HeaderAdmin />
                    <div className={styles.content}>
                        <h4 className={styles.title}>Compras</h4>
                        <Box w="100%" h="100%" p="0 7rem 1rem 7rem" className={styles.cardPayment}>
                            <FormControl w="10rem" mt={5} mr="1rem">
                                    <FormLabel>Filtrar por</FormLabel>
                                    <Select
                                            bg="#fff"
                                            colorScheme="#000" 
                                            borderRadius={0}
                                            placeholder="Todos">
                                        <option value="2">Bolos</option>
                                        <option value="3">Milkshakes</option>
                                        <option value="3">Donuts</option>
                                    </Select>
                            </FormControl>

                            <Box w="100" h="20rem" mt={10} bg="#fff" p="1rem 2rem">
                                <Text fontSize={17} fontFamily="Ubuntu" >Compras</Text>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    const { access_token } = ctx.req.cookies;

    if(!access_token){
        return{
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return{
        props: {}
    }
}