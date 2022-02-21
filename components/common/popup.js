
import styles from 'styles/common/Popup.module.scss'

import {useEffect} from 'react'
import Link from 'next/link'

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
            {rest.children}
            {items.map((item, index) => {
                return (
                    // <Link href={(item.link !== undefined) ? item.link : '/'} key={index} passHref>
                    <div className={styles.item} onClick={()=>item.action()}>
                        <div className={styles.icon}>
                            <Image src={item.icon} alt=''/>
                        </div>
                        <div className={styles.text}>{item.text}</div>
                    </div>
                    // </Link>
                )
            })}
        </div>
    )
}
