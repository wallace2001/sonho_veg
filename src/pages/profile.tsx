import { BiDotsVertical, BiPlusCircle } from 'react-icons/bi';
import { AiFillEdit } from 'react-icons/ai';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styles from '../../styles/profile.module.scss';
import { useState } from 'react';
import { ModalEditProfile } from '../components/modalEditProfile';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button_Global } from '../components/Button';

interface AuthProps{
    account: {
        ok: boolean;
        email: string;
        name: string;
        sex: string;
        telphone: string;
    }
}

export default function Profile(){
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const { account }: AuthProps = useSelector((state: RootStateOrAny) => state.authReducer);
    const router = useRouter();
    
    return(
        !account.ok ? (
            <div className={styles.noLogged}>
                <p>Você não está logado, crie uma conta ou entre com a sua para acessar essa página.</p>
                <Button_Global 
                    color="pink"
                    textButton="Voltar"
                    mt={5}
                    onClick={() => router.push('/')}
                />
            </div>
        ) :
        <>
            <Header aleradyCart={false}/>
            <div className={styles.container}>
                <h4>Perfil</h4>
                <div className={styles.date}>
                    <label className={styles.dateTitle}>
                        <p className={styles.title}>Dados da conta</p>
                        <AiFillEdit onClick={() => setOpenModalEdit(prevState => !prevState)} color="#18ACFF" size={25} style={{cursor: "pointer", marginLeft: 5}} />
                    </label>
                    <div className={styles.boxFirst}>

                        <div className={styles.profileAccount}>
                            <label>
                                <p>Nome</p>
                                <p>{account.name}</p>
                            </label>
                        </div>

                        <div className={styles.profileAccount}>
                            <label>
                                <p>E-mail</p>
                                <p>{account.email}</p>
                            </label>
                        </div>

                        <div className={styles.profileAccount}>
                            <label>
                                <p>Telefone</p>
                                <p>{account.telphone}</p>
                            </label>
                        </div>

                    </div>

                    <ModalEditProfile 
                        isOpen={openModalEdit}
                        setIsOpen={setOpenModalEdit}
                    />
                </div>
                <div className={styles.security}>
                <p className={styles.title}>Segurança</p>
                    <div className={styles.boxFirst}>

                        <div className={styles.profileAccount}>
                            <label>
                                <p>Documento</p>
                                <p>010-288-931-75</p>
                            </label>
                            <BiDotsVertical color="#18ACFF" size={25} style={{cursor: "pointer"}} />
                        </div>

                        <div className={styles.profileAccountAdress}>
                            <label>
                                <div className={styles.add}>
                                    <p className={styles.adress}>Endereço</p>
                                    <BiPlusCircle color="#59CF22" size={25} style={{cursor: "pointer"}} />
                                </div>
                                <p>Modulo 19 conjunto A casa 5A</p>
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.</p>
                            </label>
                            <AiFillEdit color="#18ACFF" size={25} style={{cursor: "pointer"}} />
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}