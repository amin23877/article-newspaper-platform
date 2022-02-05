import styles from 'styles/components/manageAccount/EditContainer.module.scss'
import {useForm} from "react-hook-form";
import { useEffect, useState } from 'react';

export default function EditContainer ({providerType,title, ...rest}) {
    
    return (
        <div 
        className={styles.container}
         >
            <div className={styles.personalTitle}>
                {title}
            </div>
            {rest.children}
        </div>
    )
}