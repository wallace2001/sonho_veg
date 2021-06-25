import React, { ChangeEvent, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../store/actions/products.action';
import Dropzone from 'react-dropzone';
import styles from './index.module.scss';
import { Button } from '@chakra-ui/react';
import { change } from '../../store/actions/notify.action';
import { useEffect } from 'react';

interface PropsProduct{
    id: string;
    name: string;
    description: string;
    calories: string;
    price: string;
    category: string;
    image?: string;
}

interface Props{
    item: PropsProduct;
    open: boolean;
    onClose: () => void;
}

interface PropsFile{
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    path: string;
    preview: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}

export const ModalEdit = ({open, onClose, item}: Props) => {

    const dispatch = useDispatch();
    const [file, setFile] = useState([]);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [calories, setCalories] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const validationSchema = yup.object().shape({
        name: yup.string().required('Campo obrigatório.'),
        description: yup.string().required('Campo obrigatório.'),
        calories: yup.string().required('Campo obrigatório.'),
        category: yup.string().required('Campo obrigatório.'),
        price: yup.string().required('Campo obrigatório.'),
        // file: yup.array().required('Campo obrigatório.')
    });

    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        setSubmitting
    } = useFormik({
        onSubmit: (e) => handleCreateProduct(e),
        validationSchema,
        initialValues: {
            name: '',
            description: '',
            calories: '',
            category: '',
            price: '',
            // file: []
        }
    });

    const handleCreateProduct = async () => {
        validationSchema.isValid({
            name: name === "" ? item?.name : name,
            price: price === "" ? item?.price : price,
            description: description === "" ? item?.description : description,
            calories: calories === "" ? item?.calories : calories,
            category,
            image: file.length === 1 ? file[0] : item?.image
        }).then(res => {
            if(res === false){
                dispatch(change({
                    open: true,
                    status: "error",
                    title: "Dados faltando..."
                }));
                setTimeout(() => {
                    dispatch(change({
                        open: false,
                    }));
                }, 2 * 1000);
            }else{
                const values = {
                    name: name === "" ? item?.name : name,
                    price: price === "" ? item?.price : price,
                    description: description === "" ? item?.description : description,
                    calories: calories === "" ? item?.calories : calories,
                    category,
                    image: file.length === 1 ? file[0] : item?.image
                }

                dispatch(updateProduct(item?.id, values, item?.image));
                onClose();
            }
        });
        // const values = {
        //     name: name === "" ? item?.name : name,
        //     price: price === "" ? item?.price : price,
        //     description: description === "" ? item?.description : description,
        //     calories: calories === "" ? item?.calories : calories,
        //     category,
        //     image: file.length === 1 ? file[0] : item?.image
        // }
        // console.log(values);

    }


    console.log(file.length);

    return (
        <Modal onClose={onClose} isOpen={open}>
            <ModalOverlay />
            <ModalContent pb={5}>
                <ModalHeader>Editar produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDirection="column" justifyContent="space-between" flexWrap="wrap">
                    <form>
                        <div>
                            <h2 className={styles.titlePhoto}>Editar foto</h2>
                            <Dropzone 
                                    onDrop={acceptedFiles => setFile(acceptedFiles.map(file => Object.assign(file, {
                                        preview: URL.createObjectURL(file)
                                    })))}
                                    accept= "image/jpeg, image/png, image.jpg"
                                    >
                                    {({getRootProps, getInputProps, isDragActive, isDragReject,  isDragAccept, }) => (
                                        <section>                                         
                                        <div className={ isDragAccept ? styles.dropzoneActive : isDragReject ? styles.dropzoneReject : styles.dropzone} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                                {file.length == 1 || file.length == 1 ? (
                                                    file.map(item => {
                                                        return(
                                                            <img key={item?.name} src={item?.preview} />
                                                        );
                                                    })
                                                ) : (

                                                    <img src={item?.image} />
                                                )}
                                        </div>
                                        </section>
                                    )}
                            </Dropzone>
                        </div>
                        <div className={styles.category}>
                            <h2>Escolha a categoria</h2>
                            <select onChange={(e:ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)} name="category" id="category">
                                <option>Escolha uma categoria</option>
                                <option value="095c5b42-988c-403a-8fec-b762fe8a3136">Bolos</option>
                                <option value="be774f57-9f39-4fa2-8c58-0df7b74956e5">Milkshakes</option>
                                <option value="6d9f7ff4-6cd4-4b1f-89ce-e72bf1d647f8">Donuts</option>
                            </select>
                        </div>
                        <div className={styles.divName}>
                            <h2>Nome</h2>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" placeholder="Digite seu nome" defaultValue={item?.name} />
                        </div>

                        <div className={styles.divName}>
                            <h2>Preço</h2>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} type="number" placeholder="Digite o preço" defaultValue={item?.price} />
                        </div>

                        <div className={styles.divName}>
                            <h2>Peso</h2>
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => setCalories(e.target.value)} type="number" placeholder="Digite as calorias" defaultValue={item?.calories} />
                        </div>

                        <div className={styles.divdescription}>
                            <h2>Peso</h2>
                            <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} placeholder="Digite o conteúdo" defaultValue={item?.description} />
                        </div>
                        <div className={styles.button}>
                            <Button onClick={() => handleCreateProduct()} colorScheme="pink">Editar</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
