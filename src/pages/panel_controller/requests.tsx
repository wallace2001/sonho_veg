import { Box } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { GetServerSideProps } from 'next';
import React, { ChangeEvent, useState } from 'react'
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Requests } from '../../components/Requests';
import socketIo from 'socket.io-client';
import { getRequest } from '../../store/actions/request.action';
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import { updatePayments } from '../../store/actions/payment.action';


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
interface PropsRequestsT{
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
}

export default function Request(){

    const [paymentsFiltered, setPaymentsFiltered] = useState<PropsRequestsT[]>([]);
    const [selectFilter, setSelectFilter] = useState<string>("all");
    const dispatch = useDispatch();
    const { requests }: PropsRequests = useSelector((state: RootStateOrAny) => state.requestReducer);

    const socket = socketIo('https://sonhovegan.herokuapp.com/', {
        transports: ['websocket'],
      });

    const NewRequest = (request: PropsPayerParse) => {
        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo pedido', {
                body: `Novo pedido de ${request.payer_info.email.name}.`
            })
        }
    }

    const updateStatus = (id: string, status: string ) => {
        dispatch(updatePayments(id, status));
    }
    
    // socket.on("updateStatusProduct", (request) => {
    //     dispatch(getRequest());
    // });

    // useEffect(() => {
    //     const filtered: any = requests.filter(item => {
    //         if(selectFilter == "all" || !selectFilter){
    //             return item;
    //         }
    //         return item.status == selectFilter
    //     });

    //     setPaymentsFiltered(filtered);
    // }, [selectFilter]);

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
                                        placeholder="Todos"
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectFilter(e.target.value)}
                                        >
                                    <option value="Pendente">Pendentes</option>
                                    <option value="Finalizado">Finalizados</option>
                                    <option value="Entregue">Finalizados e prontos</option>
                                </Select>
                            </FormControl>
                            <div className={styles.requestBox}>
                                {requests.map((item, index) => {
                                    return(
                                        <Requests key={index} data={item} updateStatus={updateStatus} />
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