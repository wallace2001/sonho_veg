import { useDisclosure } from '@chakra-ui/hooks'
import styles from './index.module.scss';
import { AiOutlinePlus, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { BiMinus } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { 
    Drawer, 
    DrawerOverlay, 
    DrawerCloseButton, 
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Input,
    DrawerFooter,
    Button,
    Box,
    Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Button_Global } from '../Button';

interface PropsCart{
    isOpen: boolean;
    onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: PropsCart) => {
    const [number, setNumber] = useState<number>(1);
    const [priceProduct, setPriceProduct] = useState<number>(19.90);
    const btnRef = React.useRef()

    const handleAddProduct = () => {
        if(number < 1){
            setNumber(prevState => prevState = 1);
            setPriceProduct(prevState => prevState = 19.90);
        }

        setNumber(prevState => prevState + 1);
        setPriceProduct(prevState => prevState + 19.90);
    }

    const handleRemoveProduct = () => {
        if(number < 1){
            setNumber(prevState => prevState = 1);
            setPriceProduct(prevState => prevState = 19.90);
        }

        setNumber(prevState => prevState - 1);
        setPriceProduct(prevState => prevState - 19.90);
    }

    return (
        <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
            <DrawerOverlay />
            <DrawerContent d="flex" flexDirection="column" justifyContent="space-between">
            <div className={styles.background}>
                <Box w="100%" overflow="auto" h="100%" bg="rgba(245, 245, 245, .90)">
                <DrawerCloseButton />
                <DrawerHeader>Carrinho</DrawerHeader>

                <DrawerBody w="100%">
                    <Box w="100%" h="auto" borderRadius={10} bg="rgba(255,255,255)" d="flex" justifyContent="center" flexDirection="column" p="1rem">
                        <Text fontSize={25} textAlign="center">MilkShake-chocolate</Text>
                        <Box className={styles.content} w="100%" d="flex" flexDirection="column">
                            <div className={styles.add}>
                                <img src="/milkshake.svg" alt="" />
                                <div style={{padding:"0.4rem 0" , width: 100, borderRadius: 10, border: "1px solid #000"}}>
                                    <button onClick={handleRemoveProduct}><BiMinus color="#000" /></button>
                                    <label style={{padding: "0 1rem"}}>x{number}</label>
                                    <button onClick={handleAddProduct}><AiOutlinePlus color="#000" fontWeight="bold" /></button>
                                </div>
                            </div>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-le</p>
                        </Box>
                        <p style={{ fontWeight: "normal", fontSize: 30, textAlign: "center" }}>R$ {priceProduct.toFixed(2)}</p>
                        <Box d="flex" justifyContent="center" p="1rem 0" w="15rem">
                        <Button_Global
                            icon={<BsTrash />}
                            color="red"
                            />
                            </Box>
                    </Box>
                </DrawerBody>

                <DrawerFooter d="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box w="100%" h="10rem" bg="rgba(255,255,255)" d="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Box w="100%" d="flex" justifyContent="space-between" p="0 1rem">
                            <Text>Endereço</Text>
                            <AiFillCloseCircle size={25} color="#fc1212" />
                        </Box>
                        <Box w="100%" d="flex" justifyContent="space-between" p="1rem 1rem">
                            <Text>Total</Text>
                            <Text>R$: {priceProduct.toFixed(2)}</Text>
                        </Box>
                        <Button_Global
                            mt={4}
                            icon={<AiFillCheckCircle style={{marginRight: 5}} size={25} color="#38fc65" />}
                            textButton="Finalizar"
                            color="purple"
                        />
                    </Box>
                </DrawerFooter>
                </Box>
            </div>
            </DrawerContent>
      </Drawer>
    )
}
