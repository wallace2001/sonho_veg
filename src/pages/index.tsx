import { useContext, useState } from 'react';
import styles from '../../styles/Home.module.scss';
import { Button_Global } from '../components/Button';
import { MenuHeader } from '../components/Header';
import { AuthContext } from '../context/authContext';
import { HeaderMenu } from "../data/header";
import { FaUserAlt } from 'react-icons/fa';
import { MenuIcon } from '../components/MenuIcon';
import { Login, Register } from '../components/LoginAndRegister';
import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { SliderHeader } from '../components/SliderHeader';

export default function Home() {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const { auth } = useContext(AuthContext);
  console.log(auth);

  return (
      <div className={styles.background}>
        <div className={styles.container}>
          <main className={styles.main}>

            <div className={styles.left}>
              <div />
            </div>

            <div className={styles.mid}>
              <ul>
                {HeaderMenu.map((item, index) => {
                  return(
                    <a key={index}>{item.name}</a>
                  );
                })}
              </ul>
            </div>

            <div className={styles.footer}>
              {auth.user ? (
                <MenuHeader />
              ) : (
                <Box d="flex" alignItems="center">
                <Box onClick={() => setIsOpenLogin(prevState => prevState = true)}>
                  <Button_Global 
                    textButton="Entrar"
                    icon={<FaUserAlt color="#fff" />}
                    color="pink"
                    />

                    <Login 
                      isOpen={isOpenLogin}
                      onClose={() => setIsOpenLogin(prevState => prevState = false)}
                    />

                    <Register 
                      isOpen={isOpenRegister}
                      onClose={() => setIsOpenRegister(prevState => prevState = false)}                      
                    />

                </Box>
                <Box onClick={() => setIsOpenRegister(prevState => prevState = true)}>
                  <Text>Cadastrar</Text>
                </Box>
                  </Box>
              )}

            </div>

            <div className={styles.menuIcon}>
              <MenuIcon />
            </div>

          </main>
        </div>
        <div className={styles.content}>
          <div className={styles.contentBackground}>
              
              <SliderHeader />

          </div>
        </div>
      </div>
  )
}
