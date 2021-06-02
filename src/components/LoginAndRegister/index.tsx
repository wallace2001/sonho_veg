import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {CalendarData} from '../Calendar';
import { 
  DrawerOverlay, 
  Stack, 
  RadioGroup, 
  Button, 
  InputRightElement, 
  Input, 
  InputGroup, 
  Text, 
  FormControl, 
  FormHelperText, 
  DrawerContent, 
  Drawer, 
  DrawerCloseButton, 
  DrawerHeader, 
  DrawerBody, 
  DrawerFooter, 
  Radio, 
  Checkbox,
  Alert,
  AlertIcon} 
  from '@chakra-ui/react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { accountInfo, accountVerify, login, register } from '../../store/actions/auth.action';
import { useRouter } from 'next/router';

interface LoginProps{
    isOpen: boolean;
    onClose: () => void;
}

interface RegisterProps{
    isOpen: boolean;
    onClose: () => void;
}

interface ErrorLoginProps{
  error: {
    ok: boolean;
    message: string;
  }
}

export const Login = ({ isOpen, onClose }: LoginProps) => {

  const validationSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória")
  });

  const dispatch = useDispatch();
  const { error }: ErrorLoginProps = useSelector((state: RootStateOrAny) => state.authReducer);
  const [checkedRemember, setCheckedRemember] = useState(false);

  useEffect(() => {
    dispatch(accountVerify());
  }, [dispatch]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting
  } = useFormik({
    onSubmit: async (e) => {
      await dispatch(login(e, checkedRemember));
      if(error.ok){
        setSubmitting(false);
      }
    },
    validationSchema,
    initialValues: {
      email: "",
      password: ""
    }
  });

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(prevState => !prevState);
  const [errorValidationDate, setErrorValidationDate] = useState<string>('');
  const handleSubmitLogin = () => {
    if(values.email === '' && values.password === ''){
      return setErrorValidationDate("Dados não preenchidos.");
    }

    setErrorValidationDate("");
    handleSubmit();
  }

    return (
        <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        colorScheme="#F4EEE2"
      >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Login</DrawerHeader>

            <DrawerBody>

              <FormControl mb={5}>
                {error.ok ?  
                  <Alert status="error">
                    <AlertIcon />
                    {error.message}
                  </Alert> 
                  : ''}
                {errorValidationDate ?  
                  <Alert status="error">
                    <AlertIcon />
                    {errorValidationDate}
                  </Alert> 
                  : ''}
              </FormControl>

              <FormControl id="email">
                <Text>E-mail</Text>
                <Input type="text" placeholder="Digite seu E-mail" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                {touched.email && <FormHelperText>{errors.email}</FormHelperText>}
              </FormControl>

              <FormControl id="password" mt={4}>
              <Text>Senha</Text>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={values.password} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                  {touched.password && <FormHelperText>{errors.password}</FormHelperText>}
              </FormControl>

              <Checkbox onChange={(value) => setCheckedRemember(value.target.checked)} isChecked={checkedRemember} mt={3} defaultIsChecked>Lembrar de mim</Checkbox>
              <h4 style={{
                fontSize: 14,
                fontFamily: "Ubuntu",
                marginTop: 20,
                fontWeight: 200
              }}>Esqueceu sua conta ? <a style={{
                cursor: 'pointer',
                color: "#432158"
              }}>Clique aqui.</a></h4>

            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Fechar
              </Button>
              <Button colorScheme="pink" onClick={handleSubmitLogin} isLoading={isSubmitting}>Entrar</Button>
            </DrawerFooter>
          </DrawerContent>
      </Drawer>
    )
}
export const Register = ({ isOpen, onClose }: RegisterProps) => {

  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [value, setValue] = useState<string>("3");
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date());
  const [telphone, setTelphone] = useState<string>('');
  const [errorValidationDate, setErrorValidationDate] = useState<string>('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootStateOrAny) => state.authReducer);
  const router = useRouter();

  const validationSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
    name: yup.string().required("Nome obrigatório"),
    telphone: yup.string(),
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting
  } = useFormik({
    onSubmit: async (e) => {
      const credential = {
        ...e, 
        date,
        sex: value,
        telphone
      };
      await dispatch(register(credential));
      if(error.ok){
        setSubmitting(false);
      }
    },
    validationSchema,
    initialValues: {
      email: "",
      password: "",
      name: "",
      telphone: ""
    }
  });

  const handleKeyUp = useCallback((e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 12;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    e.currentTarget.value = value;
    setTelphone(value);
  }, []);

  const handleCloseModalCalendar = () => setIsOpenCalendar(prevState => prevState = false);
  const handleClick = () => setShow(prevState => !prevState);
  const handleSubmitRegister = () => {
    const yearDate = date.getFullYear();

    if(yearDate >= 2015){
      return setErrorValidationDate("Idade mínima de 12 anos.");
    }

    else if(yearDate <= 1900){
      return setErrorValidationDate("Você não tem mais de 120 anos.")
    }

    setErrorValidationDate("");
    handleSubmit()

  }

    return (
        <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          {status ? (
            <>
              <DrawerCloseButton />
              <DrawerHeader>Registrar</DrawerHeader>

              {error.ok ? 
                <Alert>
                  <AlertIcon />
                  {error.message}
                </Alert> : ''
              }

              <DrawerBody>
                <Text>Parabéns, sua conta foi criada com sucesso.</Text>
                <Text>Um e-mail de confirmação foi enviado para seu email, é preciso confirmar para fazer o login.</Text>
              </DrawerBody>
              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="pink" disabled>Cadastrar</Button>
            </DrawerFooter>
            </>
          ) : (
            <>
              <DrawerCloseButton />
                <DrawerHeader>Registrar</DrawerHeader>

                {error.ok ? 
                <Alert status="error">
                  <AlertIcon />
                  {error.message}
                </Alert> : ''
              }

                <DrawerBody>
                <FormControl id="email">
                      <Text>E-mail</Text>
                      <Input type="text" placeholder="Digite seu e-mail" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                      {touched.email && <FormHelperText>{errors.email}</FormHelperText>}
                    </FormControl>

                    <FormControl id="name" mt={4}>
                        <Text>Nome</Text>
                        <Input type="text" placeholder="Digite seu nome" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        {touched.name && <FormHelperText>{errors.name}</FormHelperText>}
                    </FormControl>

                    <FormControl id="telphone" mt={4}>
                        <Text>Telefone</Text>
                        <Input onKeyUp={handleKeyUp} type="text" placeholder="(99) 99999-9999" />
                    </FormControl>

                    <FormControl id="sex">
                      <RadioGroup value={value} onChange={(e) => setValue(e)} onBlur={handleBlur} mt={4}>
                        <Text>Sexo</Text>
                        <Stack direction="row">
                          <Radio value="1">Masculino</Radio>
                          <Radio value="2">Feminino</Radio>
                          <Radio value="3">Não opinar</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>

                    <FormControl mt={4} id="date">
                      <Text>Data de Nascimento</Text>
                      <Button 
                        mt={3}
                        colorScheme="pink" 
                        onClick={() => setIsOpenCalendar(prevState => prevState = true)}
                        >Data: {format(date, 'd/MM/yyyy', { locale: ptBR })}</Button>

                      <CalendarData isOpen={isOpenCalendar} date={date} setDate={setDate} onClose={handleCloseModalCalendar} />
                      {errorValidationDate !== '' ? <FormHelperText>{errorValidationDate}</FormHelperText> : ''}
                    </FormControl>

                    <FormControl id="password" mt={4}>
                        <Text>Senha</Text>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Digite sua senha"
                          value={values.password} 
                          onChange={handleChange} 
                          onBlur={handleBlur}
                          />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                        {touched.password && <FormHelperText>{errors.password}</FormHelperText>}
                    </FormControl>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="pink" onClick={handleSubmitRegister} isLoading={isSubmitting}>Cadastrar</Button>
                </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    )
}
