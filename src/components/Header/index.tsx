import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/menu'
import { Box, Button } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';
import { RiArrowDropDownFill } from 'react-icons/ri';
import React from 'react';

export const MenuHeader = () => {
    return (
        <Menu>
            <MenuButton as={Button} colorScheme="pink">
                <Box d="flex" alignItems="center">
                    <FaUserAlt color="#fff" />
                    <p>Wallace</p>
                    <RiArrowDropDownFill size={35} color="#fff"/>
                </Box>
            </MenuButton>
        <MenuList>
            <MenuGroup title="Perfil"style={{color: "black", fontWeight: "normal"}}>
            <MenuItem>Meu Perfil</MenuItem>
            <MenuItem>Compras </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup style={{color: "black", fontWeight: "normal"}} title="Conta">
            <MenuItem>Sair</MenuItem>
            </MenuGroup>
        </MenuList>
        </Menu>
    )
}
