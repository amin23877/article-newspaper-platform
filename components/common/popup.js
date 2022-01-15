
import styles from 'styles/common/Popup.module.scss'

import {useEffect} from 'react'

import Image from 'next/image'

export default function Popup({items = [], containerClass, popupSet,  ...rest}) {

    useEffect(() => {
        document.addEventListener('mouseup', function(e) {
            const container = document.querySelector('#popup');
            if (container && !container.contains(e.target)) {
                popupSet(false)
            }
        });
    })

    return (
        <div className={`${styles.popupContainer} ${containerClass}`} id='popup' onClick={(e) => e.stopPropagation()}>
            {items.map((item, index) => {
                return (
                    <div key={index} className={styles.item} onClick={item.action()}>
                        <div className={styles.icon}>
                            <Image src={item.icon}/>
                        </div>
                        <div className={styles.text}>{item.text}</div>
                    </div>
                )
            })}
        </div>
    )
}
