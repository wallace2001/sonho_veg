import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { useState } from 'react'
import { Button_Global } from '../Button'

export const ModalEditProfile = ({ isOpen, setIsOpen }) => {

    const initialRef = React.useRef()
    const finalRef = React.useRef()
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => setIsOpen(prevState => !prevState)}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Editar seu perfil</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>E-mail</FormLabel>
                    <Input ref={initialRef} placeholder="E-mail" />
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Nome</FormLabel>
                    <Input placeholder="Nome" />
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Telefone</FormLabel>
                    <Input placeholder="Telefone" />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button_Global color="pink" mr={3} textButton="Salvar" />
                    <Button onClick={() => setIsOpen(prevState => !prevState)}>Cancelar</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
