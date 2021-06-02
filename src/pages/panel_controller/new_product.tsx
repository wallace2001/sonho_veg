import React from 'react'
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Select } from '@chakra-ui/select';
import { Box, Text } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';
import { Button_Global } from '../../components/Button';
import Dropzone from 'react-dropzone';

export default function SendEmail(){
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
                            >
                            <Box      
                            w="100" 
                            h="auto" 
                            d="flex" 
                            flexDirection="row">
                                <FormControl mt={5} isRequired mr="1rem">
                                    <FormLabel>Categoria</FormLabel>
                                    <Select
                                        bg="#fff"
                                        colorScheme="#000"
                                        borderRadius={0}
                                        placeholder="Escolha a categoria">
                                        <option value="1">Bolos</option>
                                        <option value="2">Milkshakes</option>
                                        <option value="3">Donuts</option>
                                    </Select>
                                </FormControl>

                                <FormControl mt={5} id="name" isRequired>
                                    <FormLabel>Nome</FormLabel>
                                    <Input
                                        borderRadius={0}
                                        bg="#fff"
                                        placeholder="Digite o nome" />
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
                                        placeholder="Digite o preço" />
                                </FormControl>

                                <FormControl mt={5} id="name" isRequired>
                                    <FormLabel>Peso</FormLabel>
                                    <Input
                                        bg="#fff" 
                                        borderRadius={0}
                                        placeholder="Digite o peso" />
                                </FormControl>
                            </Box>
                            <FormControl mt={5} isRequired>
                                <FormLabel mb="8px">Conteúdo</FormLabel>
                                <Textarea
                                    bg="#fff"
                                    borderRadius={0}
                                    placeholder={`Digite a descrição do seu produto`}
                                    size="sm"
                                    />
                            </FormControl>
                            <FormControl mt={5} isRequired>
                                <FormLabel>Imagem</FormLabel>
                                <Dropzone 
                                    onDrop={acceptedFiles => console.log(acceptedFiles)}
                                    accept= "image/jpeg, image/png, image.jpg"
                                    >
                                    {({getRootProps, getInputProps, isDragActive, isDragReject,  isDragAccept, }) => (
                                        <section>
                                        <div className={ isDragAccept ? styles.dropzoneActive : isDragReject ? styles.dropzoneReject : styles.dropzone} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <p>Arraste a imagem do seu produto</p>
                                        </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </FormControl>
                            <Button_Global mt={10} color="pink" textButton="Criar" />
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}