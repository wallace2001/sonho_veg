import { Box } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { GetServerSideProps } from 'next';
import React from 'react'
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Requests } from '../../components/Requests';
import socketIo from 'socket.io-client';
import { getRequest } from '../../store/actions/request.action';
import { FormLabel, FormControl } from '@chakra-ui/form-control';


interface PropsPayerParse{
    payer_info: {
        email: {
            email: string;
            name: string;
        }
    }
}

interface PropsRequests{
    requests: [{
        id: string;
        user_id: string;
        intent: string;
        state: string;
        cart: string;
        payer: {
            payer_info: {
                email: {
                    email: string;
                    name: string;
                },
                shipping_address: {
                    city: string;
                    country_code: string;
                    line1: string;
                    normalization_status: string;
                    postal_code: string;
                    recipient_name: string;
                    state: string;
                }
            }
        };
        transactions: [
            {
                amount: {
                    total: string;
                }
            }
        ];
        products: [
            {
                name: string;
                quantity: string;
            }
        ],
        telphone: string;
        create_time: Date;
        date: Date;
        update_time: Date;
        status: string;
    }];
}

export default function Request(){

    const dispatch = useDispatch();
    const { requests }: PropsRequests = useSelector((state: RootStateOrAny) => state.requestReducer);

    const socket = socketIo('https://sonhovegan.herokuapp.com', {
        transports: ['websocket'],
      });

    const NewRequest = (request: PropsPayerParse) => {
        new Audio('/notification.mp3').play();
        // const lengthR = requests.length;
        // const valueRequest = requests[lengthR];
        // const payerParse: PropsPayerParse = JSON.parse(valueRequest.payer);

        if(Notification.permission === 'granted'){
            new Notification('Novo pedido', {
                body: `Novo pedido de ${request.payer_info.email.name}.`
            })
        }
    }

    useEffect(() => {
        Notification.requestPermission();
        const func = async() => {
            await dispatch(getRequest());
        }
        func();

        socket.on("newRequest", (request) => {
            requests.push(request);
            dispatch(getRequest());
            NewRequest(request.payer);
        });
    }, []);



    console.log(requests);

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <MenuLeft />
                </div>
                <div className={styles.right}>
                    <HeaderAdmin />
                    <div className={styles.content}>
                        <h4 className={styles.title}>Pedidos</h4>
                        <Box w="100%" h="100%" p="1rem 7rem 8rem 7rem" className={styles.box}>
                            <FormControl w="10rem" mt={5} mr="1rem">
                                <FormLabel>Filtrar por</FormLabel>
                                <Select
                                        bg="#fff"
                                        colorScheme="#000" 
                                        borderRadius={0}
                                        placeholder="Todos">
                                    <option value="2">Pendentes</option>
                                    <option value="3">Finalizados</option>
                                    <option value="3">Finalizados e prontos</option>
                                </Select>
                            </FormControl>
                            <div className={styles.requestBox}>
                                {requests.map((item, index) => {
                                    return(
                                        <Requests key={index} data={item} />
                                    );
                                })}
                            </div>
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