import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Requests } from '../../components/Requests';

export default function Request(){
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <MenuLeft />
                </div>
                <div className={styles.right}>
                    <HeaderAdmin />
                    <div className={styles.content}>
                        <h4 className={styles.title}>Pedidos</h4>
                        <Box w="100%" h="100%" p="1rem 7rem">
                            <FormControl w="10rem" mt={5} mr="1rem">
                                <FormLabel>Filtrar por</FormLabel>
                                <Select
                                        bg="#fff"
                                        colorScheme="#000" 
                                        borderRadius={0}
                                        placeholder="Todos">
                                    <option value="2">Pendentes</option>
                                    <option value="3">Finalizados</option>
                                    <option value="3">Finalizados e prontos</option>
                                </Select>
                            </FormControl>
                            <div className={styles.requestBox}>
                                <Requests />
                                <Requests />
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}