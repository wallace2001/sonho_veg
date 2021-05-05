import React, { useState } from 'react'
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
  Radio } 
  from '@chakra-ui/react';

interface LoginProps{
    isOpen: boolean;
    onClose: () => void;
}

interface RegisterProps{
    isOpen: boolean;
    onClose: () => void;
}

export const Login = ({ isOpen, onClose }: LoginProps) => {

  const validationSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória")
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: console.log,
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
                {errorValidationDate ? <FormHelperText color="red">{errorValidationDate}</FormHelperText> : ''}
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
  const [errorValidationDate, setErrorValidationDate] = useState<string>('');

  const validationSchema = yup.object().shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
    name: yup.string().required("Nome obrigatório"),
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: (e) => console.log({...e, date, sex: value}),
    validationSchema,
    initialValues: {
      email: "",
      password: "",
      name: "",
    }
  });

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
          <DrawerCloseButton />
          <DrawerHeader>Registrar</DrawerHeader>

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
        </DrawerContent>
      </Drawer>
    )
}
