import React from 'react'
import { Button, Text, ButtonProps } from '@chakra-ui/react';
import styles from './button.module.scss';

interface ButtonAllProps extends ButtonProps{
    textButton: string;
    icon?: any;
    color?: string;
}

export const Button_Global = ({ textButton, icon, color, ...rest }: ButtonAllProps) => {    
    return (
        <Button colorScheme={color} {...rest}>
            {icon && (
                icon
            )}
            <Text>{textButton}</Text>
        </Button>
    )
}
