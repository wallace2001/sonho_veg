import React, { useState } from 'react'
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Select } from '@chakra-ui/select';
import { Box, Text } from '@chakra-ui/layout';
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';
import { Button_Global } from '../../components/Button';
import Dropzone from 'react-dropzone';
import { GetServerSideProps } from 'next';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../store/actions/products.action';
import { change } from '../../store/actions/notify.action';
import { Button } from '@chakra-ui/react';

interface PropsProduct{
    name: string;
    description: string;
    calories: string;
    price: string;
    category: string;
    // image: File;
}

export default function SendEmail(){

    const { message } = useSelector((state: RootStateOrAny) => state.productsReducer);
    const [file, setFile] = useState<any>();
    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        name: yup.string().required('Campo obrigatório.'),
        description: yup.string().required('Campo obrigatório.'),
        calories: yup.string().required('Campo obrigatório.'),
        category: yup.string().required('Campo obrigatório.'),
        price: yup.number().required('Campo obrigatório.'),
        // file: yup.array().required('Campo obrigatório.')
    });

    // console.log(file[0]);

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

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <MenuLeft />
                </div>
                <div className={styles.right}>
                    <HeaderAdmin />
                    <div className={styles.content}>
                        <h4 className={styles.title}>Adicionar produtos</h4>
                        <Box 
                            w="100" 
                            h="auto" 
                            d="flex" 
                            flexDirection="column"
                            padding= "1rem 10rem"
                            className={styles.addProductBox}
                            >
                            <Box      
                            w="100" 
                            h="auto" 
                            d="flex" 
                            flexDirection="row">
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        />
                                        {touched.name && <FormHelperText>{errors.name}</FormHelperText>}
                                </FormControl>
                            </Box>
                            <Box      
                            w="100" 
                            h="auto" 
                            d="flex" 
                            flexDirection="row">

                                <FormControl mt={5} mr="1rem" id="price" isRequired>
                                    <FormLabel>Preço</FormLabel>
                                    <Input
                                        borderRadius={0}
                                        bg="#fff"
                                        placeholder="Digite o preço"
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        />
                                        {touched.price && <FormHelperText>{errors.price}</FormHelperText>}
                                </FormControl>

                                <FormControl mt={5} id="calories" isRequired>
                                    <FormLabel>Peso</FormLabel>
                                    <Input
                                        bg="#fff" 
                                        borderRadius={0}
                                        placeholder="Digite o peso"
                                        value={values.calories}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        />
                                        {touched.calories && <FormHelperText>{errors.calories}</FormHelperText>}
                                </FormControl>
                            </Box>
                            <FormControl mt={5} id="description" isRequired>
                                <FormLabel mb="8px">Conteúdo</FormLabel>
                                <Textarea
                                    bg="#fff"
                                    borderRadius={0}
                                    placeholder={`Digite a descrição do seu produto`}
                                    size="sm"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                    {touched.description && <FormHelperText>{errors.description}</FormHelperText>}
                            </FormControl>
                            <FormControl mt={5} isRequired>
                                <FormLabel>Imagem</FormLabel>
                                <Dropzone 
                                    onDrop={acceptedFiles => setFile(acceptedFiles)}
                                    accept= "image/jpeg, image/png, image.jpg"
                                    >
                                    {({getRootProps, getInputProps, isDragActive, isDragReject,  isDragAccept, }) => (
                                        <section>                                         
                                        <div className={ isDragAccept ? styles.dropzoneActive : isDragReject ? styles.dropzoneReject : styles.dropzone} {...getRootProps()}>
                                            <input {...getInputProps()}
                                                // onChange={(e) => console.log(e.target.files[0])}
                                                // value={values.file}
                                                // onChange={handleChange}
                                                // onBlur={handleBlur}
                                                />
                                            <p>{file ? 'Uma imagem carregada' : 'Arraste a imagem do seu produto' }</p>
                                        </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </FormControl>
                            <Button onClick={() => handleSubmit()} isLoading={isSubmitting} mt={10} color="pink">Criar</Button>
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