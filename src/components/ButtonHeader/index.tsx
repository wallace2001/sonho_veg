import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/menu'
import { Box, Button } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { RiArrowDropDownFill } from 'react-icons/ri';
import React from 'react';
import { useRouter } from 'next/router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/auth.action';

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
    const { account }: AuthProps = useSelector((state: RootStateOrAny) => state.authReducer);

    console.log(account.admin);

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
            <MenuItem>Compras</MenuItem>
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
