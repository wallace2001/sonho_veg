import { Button } from '@chakra-ui/button'
import { IoMenuOutline } from 'react-icons/io5';
import React, { useRef, useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, DrawerHeader } from '@chakra-ui/modal';
import { Text } from '@chakra-ui/react';
import { Box, Divider, Stack } from '@chakra-ui/layout';
import { Login, Register } from '../LoginAndRegister/index';

import styles from './menu.module.scss';
import { HeaderMenu } from "../../data/header";
import { Button_Global } from '../Button';
import { RootStateOrAny, useSelector } from 'react-redux';
import { MenuHeader } from '../ButtonHeader';

interface AuthProps{
  account: {
    ok: boolean;
  }
}

export const MenuIcon = () => {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()

    const { account }: AuthProps = useSelector((state: RootStateOrAny) => state.authReducer);
      
    return (
        <>
            <Button colorScheme="pink" onClick={onOpen}>
                <IoMenuOutline color="#fff" size={20} />
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="top"
              initialFocusRef={firstField}
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  Menu
                </DrawerHeader>
      
                <DrawerBody p="1rem 8rem">
                  <Stack spacing="24px">
                    {HeaderMenu.map((item, index) => {
                        return(
                            <Button key={index}>
                                <Text>{item.name}</Text>
                            </Button>
                        );
                    })}
                  </Stack>
                </DrawerBody>
                
                <Divider />

                <DrawerBody>
                  <Stack spacing="24px">
                    {account.ok ? (
                      <MenuHeader />
                    ) : (
                      <>
                        <Box d="flex" flexDirection="column" onClick={() => setIsOpenLogin(prevState => prevState = true)}>
                          <Button_Global
                            textButton="Entrar"
                            color="pink"
                          />
                        </Box>
                        <Box d="flex" flexDirection="column" onClick={() => setIsOpenRegister(prevState => prevState = true)}>

                          <Button_Global 
                              textButton="Cadastrar"
                          />

                        </Box>
                      </>
                    )}

                    <Login 
                      isOpen={isOpenLogin}
                      onClose={() => setIsOpenLogin(prevState => prevState = false)}
                    />

                    <Register 
                      isOpen={isOpenRegister}
                      onClose={() => setIsOpenRegister(prevState => prevState = false)}                      
                    />
                  </Stack>
                </DrawerBody>
      
                <DrawerFooter borderTopWidth="1px">
                  <Button colorScheme="blackAlpha" variant="outline" mr={3} onClick={onClose}>
                    <Text color="black">Fechar</Text>
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )
}
