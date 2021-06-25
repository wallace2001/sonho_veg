import React, { useState } from 'react';
import { addDays, subDays, format } from 'date-fns';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';
import { changeScheduling } from '../../store/actions/scheduling.action';


interface PropsCarousel{
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const CarouselButton = (props:  PropsCarousel) => {
    const [when, setWhen] = useState<Date[]>([]);
    const dispatch = useDispatch();
    const onClose = () => {
        props.setOpen(!props.open);
    }

    const addDay = () => {
        const dates = [];
        for (let i = 1; i < 25; i++) {
            const date = addDays(new Date(), i);
            const form = format(date, "EEEE");
            if(form === "Saturday" || form === "Wednesday"){
                dates.push(date);
            }
        }
        setWhen([...dates]);
    }

    const saveScheduling = (item: Date) => {
        dispatch(changeScheduling(item));
    }

    useEffect(() => {
        addDay();
    }, []);

    return (
        <div className={styles.container}>
            <Modal onClose={onClose} isOpen={props.open}>
                <ModalOverlay opacity={styles.opacity} />
                <ModalContent pb={5} {...styles}>
                    <ModalHeader>Agende seu pedido</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" justifyContent="space-between" flexWrap="wrap">
                        {when.map((item, index) => {
                            return(
                                <Button onClick={() => {
                                    saveScheduling(item);
                                    onClose();
                                }} key={index} p="1rem" mt="1rem">{format(item, "dd/MM/yyyy")}</Button>
                            );
                        })}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}
