import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from '../../styles/contact.module.scss';

export default function Contact(){
    return(
        <>
            <Header aleradyCart={false}/>
            <div className={styles.container}>
                <div className={styles.about}>
                    <label>
                        <p className={styles.title}>Contato</p>
                        <div>
                            <p>email</p>
                            <p>kollen22@outlook.com</p>
                        </div>
                        <div>
                            <p>Telefone</p>
                            <p>(61) 99178-6805</p>
                        </div>
                        <div>
                            <p>Instagram</p>
                            <p>@Wallace.2001</p>
                        </div>
                    </label>
                    <img src="/contact_tel.svg" alt="" />
                </div>

            </div>
            <div className={styles.team}>
                    <h1>Nossa equipe</h1>
                    {/* <img src="/logo.png" alt="" /> */}
                    <div className={styles.teamInfo}>
                        <div className={styles.box}>
                            <div className={styles.first}>
                                <div />
                                <div>
                                    <p>Wallace Silva</p>
                                    <p>32 Anos</p>
                                </div>
                            </div>
                            <p className={styles.description}>aliquam et. Praesent vitae porttitor elit, interdum tincidunt tellus. Duis interdum in purus pellentesque eleifend. Nullam luctus auctor ex sed congue.</p>
                            <div>
                                <p>Instagram</p>
                                <p>@Wallace.2001</p>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.first}>
                                <div />
                                <div>
                                    <p>Wallace Silva</p>
                                    <p>32 Anos</p>
                                </div>
                            </div>
                            <p className={styles.description}>aliquam et. Praesent vitae porttitor elit, interdum tincidunt tellus. Duis interdum in purus pellentesque eleifend. Nullam luctus auctor ex sed congue.</p>
                            <div>
                                <p>Instagram</p>
                                <p>@Wallace.2001</p>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.first}>
                                <div />
                                <div>
                                    <p>Wallace Silva</p>
                                    <p>32 Anos</p>
                                </div>
                            </div>
                            <p className={styles.description}>aliquam et. Praesent vitae porttitor elit, interdum tincidunt tellus. Duis interdum in purus pellentesque eleifend. Nullam luctus auctor ex sed congue.</p>
                            <div>
                                <p>Instagram</p>
                                <p>@Wallace.2001</p>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    );
}