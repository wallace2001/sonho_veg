import styles from './index.module.scss';
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import format from 'date-fns/format';
import { Box, Button, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';
import { useState } from 'react';

interface PropsData{
    data: {
        id: string;
        user_id: string;
        intent: string;
        state: string;
        cart: string;
        payer: {
            payer_info: {
                email: {
                    email: string;
                    name: string;
                },
                shipping_address: {
                    city: string;
                    country_code: string;
                    line1: string;
                    normalization_status: string;
                    postal_code: string;
                    recipient_name: string;
                    state: string;
                }
            }
        };
        transactions: [
            {
                amount: {
                    total: string;
                }
            }
        ];
        products: [
            {
                name: string;
                quantity: string;
            }
        ],
        telphone: string;
        create_time: Date;
        date: Date;
        update_time: Date;
        status: string;
    }
}

export const Requests = ({data}: PropsData) => {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "framework",
        defaultValue: "Pendente",
        onChange: console.log,
    });
    const [openMore, setOpenMore] = useState<boolean>(false);
    const options = ["Pendente", "Finalizado", "Entregue"];

    function RadioCard(props) {
        const { getInputProps, getCheckboxProps } = useRadio(props)
      
        const input = getInputProps()
        const checkbox = getCheckboxProps()
      
        return (
          <Box className={styles.boxRadio} as="label">
            <input {...input} />
            <Box
              {...checkbox}
              cursor="pointer"
              borderWidth="1px"
              borderRadius="md"
              mb={2}
              background="#fff"
              d="flex"
              justifyContent="center"
              alignItems="center"
              boxShadow="md"
              _checked={{
                bg: "pink.600",
                color: "white",
                borderColor: "pink.600",
              }}
              _focus={{
                boxShadow: "outline",
              }}
              px={5}
              py={3}
            >
              {props.children}
            </Box>
          </Box>
        )
    }

    const group = getRootProps();

    return (
        data.id !== "" &&
        <div className={styles.container}>
        <h5 className={styles.titleRequest}>{data?.payer.payer_info.shipping_address.recipient_name}</h5>
        <div className={styles.box}>
            <div className={styles.wrap}>
                <div className={styles.left}>
                    <h5>#{data?.id}</h5>
                    <label>
                        <h4>Endereço</h4>
                        <p>{data?.payer.payer_info.shipping_address.line1}</p>
                    </label>
                    <label>
                        <h4>CEP</h4>
                        <p>{data?.payer.payer_info.shipping_address.postal_code}</p>
                    </label>
                    <label>
                        <h4>Pagamento</h4>
                        <p>{data?.state === "approved" ? "Confirmado" : "Em análise"}</p>
                    </label>
                    <label>
                        <h4>Encomendado</h4>
                        <p>{format(new Date(data.date), 'dd/MM/yyyy')}</p>
                    </label>
                </div>
                <div className={styles.mid}>
                    <label>
                        <h4>Pedido</h4>
                        {data?.products.map((item, index) => {
                            return(
                                <p key={index}>{`${Number(item.quantity)}x ${item.name}`}</p>
                            );
                        })}
                    </label>

                    <label>
                        <h4>Valor</h4>
                        <p>R$ {data?.transactions[0].amount.total}</p>
                    </label>

                    <label>
                        <h4>Status</h4>
                        <p style={{display: 'flex', alignItems: 'center'}}>{data?.status} <FaCheckCircle color="#1ff10c" style={{marginLeft: 5}} /></p>
                    </label>
                </div>
                <div className={styles.right}>
                <label>
                    <h4>Contato</h4>
                    <p>{data.payer.payer_info.email.email}</p>
                    <p>{data?.telphone}</p>
                </label>
            </div>
            </div>
            <Button mt={3} onClick={() => setOpenMore(prevState => !prevState)}>{!openMore ? "+" : "-"}</Button>
        </div>
        <div className={openMore ? styles.status : styles.statusSub}>
            <h2>Marcar como</h2>
            <div className={styles.content}>
                <HStack {...group} className={styles.groupRdio}>
                    {options.map((value) => {
                        const radio = getRadioProps({ value })
                        return (
                        <RadioCard key={value} {...radio}>
                            {value}
                        </RadioCard>
                        )
                    })}
                </HStack>
            </div>
        </div>
        </div>
    )
}
