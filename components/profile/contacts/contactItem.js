
import Image from "next/image";
import MockAvatar from "assets/images/mock-avatar.png";
import Star from "assets/svg/common/star.svg";

import styles from 'styles/components/profile/contacts/ContactItem.module.scss'

export default function ContactItem (props) {
    return (
        <div className={styles.contactItemContainer}>
            <div className={styles.avatar}>
                <Image src={MockAvatar}/>
            </div>
            <div className={styles.desc}>
                <div className={styles.name}>Mehdi Azad</div>
                <div className={styles.stars}>
                    <div className={styles.star}>
                        <Image src={Star}/>
                    </div>
                    <div className={styles.star}>
                        <Image src={Star}/>
                    </div>
                    <div className={styles.star}>
                        <Image src={Star}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
