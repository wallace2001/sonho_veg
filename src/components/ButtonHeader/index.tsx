import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/menu'
import { Box, Button } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { RiArrowDropDownFill } from 'react-icons/ri';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { accountVerify, logout } from '../../store/actions/auth.action';
import { GetServerSideProps } from 'next';

interface AuthProps{
    account: {
        email: string;
        name: string;
        sex: string;
        telphone: string;
        admin: boolean;
    }
}

export const MenuHeader = () => {
    const router = useRouter();
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(accountVerify());
    }, []);
    const { account }: AuthProps = useSelector((state: RootStateOrAny) => state.authReducer);

    return (
        <Menu>
            <MenuButton as={Button} colorScheme="pink">
                <Box w="100%" d="flex" justifyContent="space-between" alignItems="center">
                    <FaUserAlt color="#fff" />
                    <p>{account.name.split(" ")[0]}</p>
                    <RiArrowDropDownFill size={35} color="#fff"/>
                </Box>
            </MenuButton>
        <MenuList>
            <MenuGroup title="Perfil"style={{color: "black", fontWeight: "normal"}}>
            <MenuItem onClick={() => router.push('/profile')}>Meu Perfil</MenuItem>
            <MenuItem onClick={() => router.push('/payment')}>Compras</MenuItem>
            </MenuGroup>
            {account.admin ? (
                <>
                <MenuDivider />
                <MenuGroup style={{color: "black", fontWeight: "normal"}} title="Administrador">
                    <MenuItem onClick={() => router.push('/panel_controller')}>Admin</MenuItem>
                </MenuGroup>
                </>
            ) : null}
            <MenuDivider />
            <MenuGroup style={{color: "black", fontWeight: "normal"}} title="Conta">
            <MenuItem onClick={() => dispatch(logout())}>Sair</MenuItem>
            </MenuGroup>
        </MenuList>
        </Menu>
    )
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
