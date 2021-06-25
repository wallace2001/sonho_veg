import { Box } from '@chakra-ui/layout';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/payment.module.scss';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { userPayments } from '../store/actions/request.action';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@chakra-ui/react';
import { ModalShowMore } from '../components/ModalShowMore';

interface PropsRequests{
    requests: [
        {
            id: "",
            user_id: "",
            intent: "",
            state: "",
            cart: "",
            payer: {
                payer_info: {
                    email: {
                        email: "",
                        name: ""
                    },
                    shipping_address: {
                        city: "",
                        country_code: "",
                        line1: "",
                        normalization_status: "",
                        postal_code: "",
                        recipient_name: "",
                        state: "",
                    }
                }
            },
            transactions: [
                {
                    amount: {
                        total: ""
                    }
                }
            ],
            products: [
                {
                    name: string;
                    quantity: string;
                }
            ],
            date: "2021-06-23T01:47:42Z",
            telphone: "",
            create_time: "2021-06-23T01:47:42Z",
            update_time: "2021-06-23T01:47:42Z",
            status: ""
        }
    ]
}

interface PropsItem{
        id: "",
        user_id: "",
        intent: "",
        state: "",
        cart: "",
        payer: {
            payer_info: {
                email: {
                    email: "",
                    name: ""
                },
                shipping_address: {
                    city: "",
                    country_code: "",
                    line1: "",
                    normalization_status: "",
                    postal_code: "",
                    recipient_name: "",
                    state: "",
                }
            }
        },
        transactions: [
            {
                amount: {
                    total: ""
                }
            }
        ],
        products: [
            {
                name: string;
                quantity: string;
            }
        ],
        date: "2021-06-23T01:47:42Z",
        telphone: "",
        create_time: "2021-06-23T01:47:42Z",
        update_time: "2021-06-23T01:47:42Z",
        status: ""
}

export default function Payment(){

    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState<PropsItem>();
    const [open, setOpen] = useState<boolean>(false);
    const { requests }: PropsRequests = useSelector((state: RootStateOrAny) => state.requestReducer);

    useEffect(() => {
        const func = async() => {
            await dispatch(userPayments());
        }
        func();
    }, []);

    const handleShowMore = (item: PropsItem) => {
        setShowMore(item);
        setOpen(true);
    }

    const onClose = () => {
        setOpen(!open);
    }

    console.log(showMore);

    return(
        <>
            <Header aleradyCart={false} />
            <div className={styles.container}>
                <h1 className={styles.title}>Compras</h1>
            </div>
            <Box w="100%" h="100%" p="0 1rem" d="flex"  overflow="auto">
                <Table variant="striped" colorScheme="pink">
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>id</Th>
                            <Th>Status</Th>
                            <Th>Dia</Th>
                            <Th>E-mail</Th>
                            <Th>Valor</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    {requests.map((item: PropsItem, index) => {
                        return(
                            <Tbody key={index}>
                                <Tr>
                                    <Td>{index}</Td>
                                    <Td>{item?.id}</Td>
                                    <Td>{item?.status}</Td>
                                    <Td>{format(new Date(item?.create_time), 'dd/MM/yyyy')}</Td>
                                    <Td>{item?.payer.payer_info.email.email}</Td>
                                    <Td>R$ {item?.transactions[0].amount.total}</Td>
                                    <Td><Button onClick={() => handleShowMore(item)} colorScheme="pink">Ver mais</Button></Td>
                                </Tr>
                            </Tbody>
                        );
                    })}
                            <ModalShowMore open={open} onClose={onClose} item={showMore} />
                </Table>
            </Box>
            <Footer />
        </>
    )
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
        props: {},
    };
}