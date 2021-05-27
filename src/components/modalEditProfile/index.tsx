import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import React, { useState } from 'react'

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
                    <Button colorScheme="blue" mr={3}>
                    Save
                    </Button>
                    <Button onClick={() => setIsOpen(prevState => !prevState)}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
