import React from 'react'
import { Button, Text } from '@chakra-ui/react';
import styles from './button.module.scss';

interface ButtonProps{
    textButton: string;
    icon?: any;
    color?: string;
}

export const Button_Global = ({ textButton, icon, color, ...rest }: ButtonProps) => {
    return (
        <Button colorScheme={color}>
            {icon && (
                icon
            )}
            <Text>{textButton}</Text>
        </Button>
    )
}
