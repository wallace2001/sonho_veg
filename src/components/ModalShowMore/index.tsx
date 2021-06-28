import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import styles from './index.module.scss';
import format from 'date-fns/format';

interface Props{
    item: {
        id: "",
        user_id: "",
        intent: "",
        state: "",
        cart: "",
        payer: {
            payer_info: {
                email: {
                    email: "",
                    name: ""
                },
                shipping_address: {
                    city: "",
                    country_code: "",
                    line1: "",
                    normalization_status: "",
                    postal_code: "",
                    recipient_name: "",
                    state: "",
                }
            }
        },
        transactions: [
            {
                amount: {
                    total: ""
                }
            }
        ],
        products: [
            {
                name: string;
                quantity: string;
            }
        ],
        date: "2021-06-23T01:47:42Z",
        telphone: "",
        create_time: "2021-06-23T01:47:42Z",
        update_time: "2021-06-23T01:47:42Z",
        status: ""
    },
    open: boolean;
    onClose: () => void;
}

export const ModalShowMore = ({item, open, onClose}: Props) => {
    return (
        <Modal onClose={onClose} isOpen={open}>
            <ModalOverlay />
            <ModalContent pb={5}>
                <ModalHeader>Detalhes da sua compra</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDirection="column" justifyContent="space-between" flexWrap="wrap">
                    <label className={styles.label}>
                        <h2>id</h2>
                        <p>{item?.id}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>Nome</h2>
                        <p>{item?.payer.payer_info.shipping_address.recipient_name}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>Valor</h2>
                        <p>R$ {item?.transactions[0].amount.total}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>Status do pagamento</h2>
                        <p>{item?.state}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>Pedidos</h2>
                        {item?.products.map((item, index) => {
                            return(
                                <p key={index}> {`${item.quantity}x ${item.name}`}</p>
                            );
                        })}
                    </label>
                    <label className={styles.label}>
                        <h2>E-mail do comprador</h2>
                        <p>{item?.payer.payer_info.email.email}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>Telefone</h2>
                        <p>{item?.telphone}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>Data da compra</h2>
                        <p>{item?.date && format(new Date(item?.create_time), "dd/MM/yyyy")}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>Data de agendamento</h2>
                        <p>{item?.date && format(new Date(item?.date), "dd/MM/yyyy")}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>CEP</h2>
                        <p>{item?.payer.payer_info.shipping_address.postal_code}</p>
                    </label>
                    <label className={styles.label}>
                        <h2>Status do pedido</h2>
                        <p>{item?.status}</p>
                    </label>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
