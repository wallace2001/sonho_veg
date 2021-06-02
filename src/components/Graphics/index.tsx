import React from 'react'
import styles from './index.module.scss';

interface Props{
    title: string;
}

export const Graphics = (props: Props) => {
    return (
        <div className={styles.contentGraphicsViewer}>
            <h4>{props.title}</h4>
        </div>
    )
}
