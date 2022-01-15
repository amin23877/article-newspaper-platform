
import Image from 'next/image'

import styles from 'styles/components/profile/addContent/WrapperCard.module.scss'

import InfoIcon from 'assets/svg/common/info.svg'

export default function WrapperCard({children, title, description, className}) {

    return (
        <div className={`${styles.cardContainer} ${className}`}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>{title}:</div>
                <div className={styles.infoIcon}>
                    <Image src={InfoIcon} />
                </div>
            </div>
            {description ?
                (
                    <div className={styles.description}>
                        {description}
                    </div>
                ) : ''
            }
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
