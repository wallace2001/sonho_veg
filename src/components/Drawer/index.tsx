import React from 'react';
import { Drawer as DrawerContainer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/modal';
import styles from '../MenuLeft/index.module.scss';
import { useRouter } from 'next/router';
import { AiFillPlusCircle, AiOutlineDashboard, AiOutlineMail } from 'react-icons/ai';
import { BiFoodMenu } from 'react-icons/bi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { RiLogoutBoxLine } from 'react-icons/ri';

interface PropsDrawer{
    isOpen: boolean;
    isClose: () => void;
}

export const Drawer = ({isOpen, isClose}: PropsDrawer) => {
    const router = useRouter();
    return (
        <DrawerContainer placement={"left"} onClose={isClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
            {/* <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader> */}
                <DrawerBody w="100%" p="0">
                    <div className={styles.containerMobile}>
                        <h1>Sonho <strong>Veg</strong></h1>
                        <div className={styles.content}>
                            <div>
                                <button onClick={() => router.push("/panel_controller")} ><AiOutlineDashboard style={{marginRight: 7}} />Dashboard</button>
                                <button onClick={() => router.push("/panel_controller/send_email")} ><AiOutlineMail style={{marginRight: 7}} />Enviar e-mails</button>
                            </div>
                            <div>
                                <button onClick={() => router.push("/panel_controller/new_product")} ><AiFillPlusCircle style={{marginRight: 7}} />Adicionar Produtos</button>
                                <button onClick={() => router.push("/panel_controller/show_products")} ><AiFillPlusCircle style={{marginRight: 7}} />Ver Produtos</button>
                                <button onClick={() => router.push("/panel_controller/requests")}><BiFoodMenu style={{marginRight: 7}} />Pedidos</button>
                                <button onClick={() => router.push("/panel_controller/purchase")}><HiOutlineShoppingBag style={{marginRight: 7}} />Compras</button>
                            </div>
                            <div>
                                <button onClick={() => router.replace('/')}><RiLogoutBoxLine style={{marginRight: 7}} />Sair do painel</button>
                            </div>
                        </div>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </DrawerContainer>
    )
}
