import React, { useEffect, useState } from 'react'
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Select } from '@chakra-ui/select';
import { Box } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { CardProducts } from '../../components/CardProducts';
import { GetServerSideProps } from 'next';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { productsAll } from '../../store/actions/products.action';

interface PropsProducts{
    name: string;
    description: string;
    calories: string;
    price: string;
    category: string;
    image: string;
}

export default function ShowProducts(){

    const [filter, setFilter] = useState<string>('all');
    const { products } = useSelector((state: RootStateOrAny) => state.productsReducer);
    const [productsFiltered, setProductsFiltered] = useState<PropsProducts[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsAll());
    }, []);

    useEffect(() => {
        const product = products.filter(item => {
            if(filter === 'all' || !filter){
                return item;
            }

            return item.categories_id === filter
        })
        setProductsFiltered(product);
    }, [filter]);
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
                        <Box w="100%" h="100%" p="0 7rem 5rem 7rem" className={styles.BoxShowProducts}>
                            <FormControl w="10rem" mt={5} mr="1rem">
                                    <FormLabel>Filtrar por</FormLabel>
                                    <Select
                                            bg="#fff"
                                            borderRadius={0}
                                            colorScheme="#000" 
                                            placeholder="Todos"
                                            onChange={(e) => setFilter(e.target.value)}
                                            >
                                        <option value="095c5b42-988c-403a-8fec-b762fe8a3136">Bolos</option>
                                        <option value="be774f57-9f39-4fa2-8c58-0df7b74956e5">Milkshakes</option>
                                        <option value="6d9f7ff4-6cd4-4b1f-89ce-e72bf1d647f8">Donuts</option>
                                    </Select>
                            </FormControl>

                            <Box w="100%" h="auto" p="1rem 0 10rem 0" d="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
                                {productsFiltered.length !== 0 ? (
                                    productsFiltered.map((item, index) => {
                                        return(
                                            <CardProducts key={index} data={item} />
                                        );
                                    })
                                ) : (
                                    products.map((item, index) => {
                                        return(
                                            <CardProducts key={index} data={item} />
                                        );
                                    })
                                )}
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