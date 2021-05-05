import React from 'react'
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button, Box, Text, Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

interface CalendarProps{
    isOpen: boolean;
    onClose: () => void;
    setDate: (date: any) => void;
    date: any;
}

export const CalendarData = ({ isOpen, onClose, setDate, date }: CalendarProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="2rem">
            <Calendar
                onChange={(e) => setDate(e)}
                value={date}
            />
            
            <Box mt={4}>
                <Text>Data: {format(date, 'd/MM/yyyy', { locale: ptBR })}</Text>
            </Box>

            <Button mt={5} onClick={onClose}>
                Confirmar
            </Button>
        </ModalContent>
      </Modal>
    )
}
