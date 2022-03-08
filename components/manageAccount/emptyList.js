import React from 'react';
import Image from "next/image";

import styles from 'styles/components/manageAccount/EmptyList.module.scss'

const EmptyList = ({image, text}) => {
    return (
        <div className={styles.container}>
            {text}
            <Image src={image} width={520} height={320} alt='empty-list'/>
        </div>
    );
};

export default EmptyList;