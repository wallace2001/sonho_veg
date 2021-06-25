import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/modal';
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../store/actions/products.action';
import { Input, Select } from '@chakra-ui/react';
import { useEffect } from 'react';

interface PropsProduct{
    name: string;
    description: string;
    calories: string;
    price: string;
    category: string;
    image?: string;
}

interface Props{
    item: PropsProduct;
    open: boolean;
    onClose: () => void;
}

export const ModalEdit = ({open, onClose, item}: Props) => {

    const dispatch = useDispatch();
    const [file, setFile] = useState<any>();
    const validationSchema = yup.object().shape({
        name: yup.string().required('Campo obrigatório.'),
        description: yup.string().required('Campo obrigatório.'),
        calories: yup.string().required('Campo obrigatório.'),
        category: yup.string().required('Campo obrigatório.'),
        price: yup.number().required('Campo obrigatório.'),
        // file: yup.array().required('Campo obrigatório.')
    });

    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setSubmitting
    } = useFormik({
        onSubmit: (e) => handleCreateProduct(e),
        validationSchema,
        initialValues: {
            name: '',
            description: '',
            calories: '',
            category: '',
            price: '',
            // file: []
        }
    });

    const handleCreateProduct = async (e: PropsProduct) => {
        const content = {
            content: {...e, image: file && file[0]}
        }
        await dispatch(createProduct(content));
        setSubmitting(false);
    }

    return (
        <Modal onClose={onClose} isOpen={open}>
            <ModalOverlay />
            <ModalContent pb={5}>
                <ModalHeader>Editar produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDirection="column" justifyContent="space-between" flexWrap="wrap">
                    <FormControl id="category" mt={5} isRequired mr="1rem">
                        <FormLabel>Categoria</FormLabel>
                        <Select
                            bg="#fff"
                            colorScheme="#000"
                            borderRadius={0}
                            value={values.category}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Escolha a categoria">
                            <option value="095c5b42-988c-403a-8fec-b762fe8a3136">Bolos</option>
                            <option value="be774f57-9f39-4fa2-8c58-0df7b74956e5">Milkshakes</option>
                            <option value="6d9f7ff4-6cd4-4b1f-89ce-e72bf1d647f8">Donuts</option>
                        </Select>
                        {touched.category && <FormHelperText>{errors.category}</FormHelperText>}
                    </FormControl>
                    <FormControl mt={5} id="name" isRequired>
                        <FormLabel>Nome</FormLabel>
                        <Input
                            borderRadius={0}
                            bg="#fff"
                            placeholder="Digite o nome"
                            value={values.name}
                            defaultValue={item?.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.name && <FormHelperText>{errors.name}</FormHelperText>}
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
