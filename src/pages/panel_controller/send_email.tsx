import React, { useEffect, useState } from 'react'
import styles from '../../../styles/panel.module.scss';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import { MenuLeft } from '../../components/MenuLeft';
import { Select } from '@chakra-ui/select';
import { Box, Text } from '@chakra-ui/layout';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';
import { Button_Global } from '../../components/Button';
import { GetServerSideProps } from 'next';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../store/actions/auth.action';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { sendEmails } from '../../store/actions/email.action';
import { change } from '../../store/actions/notify.action';

interface PropsInfoUser{
    id: string;
    name: string;
    email: string;
}

interface PropsEmail{
    title: string;
    description: string;
}

interface PropsUsers{
    users: [PropsInfoUser]
}

export default function SendEmail(){

    const [selectIdMail, setSelectIdMail] = useState<number>();

    const dispatch = useDispatch();
    const { users }: PropsUsers  = useSelector((state: RootStateOrAny) => state.authReducer);

    useEffect(() => {
        dispatch(listUsers());
    }, []);

    const validationSchema = yup.object().shape({
        title: yup.string().required('Campo obrigatório.'),
        description: yup.string().required('Campo obrigatório.')
    });

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        resetForm,
        setSubmitting
    } = useFormik({
        onSubmit: (e) => handleSendEmail(e),
        validationSchema,
        initialValues: {
            title: '',
            description: ''
        }
    });

    const handleSendEmail = async (e: PropsEmail) => {
        await dispatch(sendEmails({
            content: {
                ...e,
                mailerReceive: selectIdMail
            }
        }));

        dispatch(change({
            open: true,
            title: "E-mail enviado com sucesso!",
            status: 'success',
            duration: 2 * 1000
        }));

        setSubmitting(false);
        resetForm();
        setSelectIdMail(null);

        setTimeout(() => {
            dispatch(change({
                open: false
            }));
        }, 2 * 1000);
    }

    console.log(users);
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
                                    placeholder="Todos"
                                    onChange={(e) => setSelectIdMail(Number(e.target.value))}
                                    >
                                    {users.map((item, index) => {
                                        return(
                                            <option key={index} value={item.id}>{item.email}</option>
                                        );
                                    })}
                                    {/* <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option> */}
                                </Select>
                            </FormControl>

                            <FormControl mt={5} id="title" isRequired>
                                <FormLabel>Título</FormLabel>
                                <Input
                                    bg="#fff"
                                    borderRadius={0}
                                    placeholder="Digite o título"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                {touched.title && <FormHelperText>{errors.title}</FormHelperText>}
                            </FormControl>
                            
                            <FormControl mt={5} id="description" isRequired>
                                <FormLabel mb="8px">Conteúdo</FormLabel>
                                <Textarea
                                    bg="#fff"
                                    borderRadius={0}
                                    placeholder={`Coloque o conteúdo entre <p></p> para texto. Para links: <a href="seu link fica dentro destas aspas"> aqui fica o titulo do botão </a>
                                    `}
                                    size="sm"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                    {touched.description && <FormHelperText>{errors.description}</FormHelperText>}
                            </FormControl>

                            <Box d="flex" justifyContent="center" alignItems="center" mt={10}>
                                <Button_Global textButton="Enviar" isLoading={isSubmitting} colorScheme="pink" onClick={() => handleSubmit()}/>
                            </Box>
                        </div>
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