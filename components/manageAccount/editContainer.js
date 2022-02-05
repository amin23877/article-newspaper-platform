import styles from 'styles/components/manageAccount/EditContainer.module.scss'
import {useForm} from "react-hook-form";
import { useEffect, useState } from 'react';

export default function EditContainer ({providerType, ...rest}) {
    
    return (
        <div 
        className={styles.container}
         >
            <div className={styles.personalTitle}>
                {providerType ===  'ناشر حقیقی'? 
                'اطلاعات شخصی'
                : 
                'اطلاعات حقوقی'
                }
            </div>
            {rest.children}
        </div>
    )
}