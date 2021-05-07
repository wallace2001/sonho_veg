import React from 'react'
import { Button_Global } from '../Button';
import styles from './index.module.scss';

interface InformationProps{
    title: string;
    image: string;
    buttonText: string;
    description: string;
    reverse?:boolean;
}

export const Information = (props: InformationProps) => {
    return (
        <div className={styles.contentContact}>
          <div style={props.reverse && {flexDirection: "row-reverse"}}>
              <label>
                <p className={styles.title}>{ props.title }</p>
                <p className={styles.description}>{ props.description }</p>
                <Button_Global 
                    textButton={props.buttonText}
                    color="pink"    
                    marginTop={5}
                />
              </label>
            <img src={props.image} alt="" />
            </div>
        </div>
    )
}
