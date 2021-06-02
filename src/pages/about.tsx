import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import styles from '../../styles/about.module.scss';

export default function About(){
    return(
        <>
            <Header aleradyCart={false}/>
            <div className={styles.container}>
                <div className={styles.about}>
                    <label>
                        <p>Sobre a gente</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat mi vitae turpis ultrices, non tincidunt nunc aliquet. Nullam eu massa felis. Morbi euismod luctus dolor eget placerat. Mauris a condimentum magna, in consectetur quam. Ut dignissim tortor at nulla vehicula sagittis. Vivamus pretium mi metus, a volutpat lorem maximus sed. Sed imperdiet tortor augue, ac fermentum risus aliquam et. Praesent vitae porttitor elit, interdum tincidunt tellus. Duis interdum in purus pellentesque eleifend. Nullam luctus auctor ex sed congue.</p>
                    </label>
                    <img src="/about_1.svg" alt="" />
                </div>

                <div className={styles.location}>
                    <label>
                        <p>Localização</p>
                        <p>Planaltina, Mestre D’armas Módulo 19 Conjunto A casa 5A.</p>
                        <div></div>
                    </label>
                    <img src="/location.svg" alt="" />
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
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    );
}