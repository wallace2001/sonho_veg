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
                        <h4 className={styles.title}>Enviar Emails</h4>
                        <div className={styles.emailsForm}>
                            <FormControl mt={5} isRequired>
                                <FormLabel>Escolha para quem quer enviar</FormLabel>
                                <Select
                                    bg="#fff"
                                    colorScheme="#000" 
                                    borderRadius={0}
                                    placeholder="Todos">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </Select>
                            </FormControl>

                            <FormControl mt={5} id="first-name" isRequired>
                                <FormLabel>Título</FormLabel>
                                <Input
                                    bg="#fff"
                                    borderRadius={0}
                                    placeholder="Digite o título" />
                            </FormControl>
                            
                            <FormControl mt={5} isRequired>
                                <FormLabel mb="8px">Conteúdo</FormLabel>
                                <Textarea
                                    bg="#fff"
                                    borderRadius={0}
                                    placeholder={`Coloque o conteúdo entre <p></p> para texto. Para links: <a href="seu link fica dentro destas aspas"> aqui fica o titulo do botão </a>
                                    `}
                                    size="sm"
                                    />
                            </FormControl>

                            <Box d="flex" justifyContent="center" alignItems="center" mt={10}>
                                <Button_Global textButton="Enviar" colorScheme="pink"/>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}