import Link from 'next/link'

import styles from 'styles/components/profile/contacts/Contacts.module.scss'
import ContactItem from "./contactItem";

export default function Contacts({type = 'follower', count, data = [], ...rest}) {
    return (
        <div className={styles.contactsContainer}>
            <div className={styles.title}>
                {type === 'follower' ? `${count ?? '0'} نفر دنبال کننده` : `${count ?? 0} نفر را دنبال می کنید`}
            </div>
            <div className={styles.itemsContainer}>
                {
                    data.map((item, index) => {
                        return (
                            <Link key={index} href={`/user/${item.targetAccount?._id || item.user._id}`}>
                                <a>
                                    <div className={styles.item}>
                                        <ContactItem info={item.user}/>
                                    </div>
                                </a>
                            </Link>
                        )
                    })
                }
                {/*<Link href="/">*/}
                {/*    <a>*/}
                {/*        <div className={styles.item}>*/}
                {/*            <ContactItem />*/}
                {/*        </div>*/}
                {/*    </a>*/}
                {/*</Link>*/}
            </div>
            {
                count > 4 ?
                    (
                        <div className={styles.showAll}>
                            <Link href="/">
                                <a>
                                    همه موارد
                                </a>
                            </Link>
                        </div>
                    ) : ''
            }
        </div>
    )
}
