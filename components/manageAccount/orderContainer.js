import styles from 'styles/components/manageAccount/OrderContainer.module.scss'
import Image from 'next/image'
import Button from 'components/common/button'
import Link from 'next/link'

export default function OrderContainer ({key, order}) {
    return (
        <div className={styles.container} key={key}>
            <div className={styles.right}>
                {order.type.image !== undefined ? 
                <>
                    <div className={styles.rightSide}>
                        <div className={styles.postImage}>
                            <Image src={order.type.image} alt={order.type.title}/>
                        </div>
                    </div>
                    <div className={`${styles.leftSide} ${styles.postLeftSide}`}>
                        <div className={styles.postUser}>
                            <div className={styles.smallUser}><Image src={order.userAvatar} alt=''/></div>
                            <div className={styles.username}>{order.username}</div>
                        </div>
                        <div className={styles.title}>{order.type.title}</div>
                        <div className={styles.payment}>{order.payment}</div>
                    </div>
                </>
                : 
                <>
                    <div className={styles.rightSide}>
                        <div className={styles.avatar}>
                            <Image src={order.userAvatar} alt=''/>
                        </div>
                        <div className={styles.username}>{order.username}</div>
                    </div>
                    <div className={styles.leftSide}>
                        <div className={styles.title}>{order.type}</div>
                        <div className={styles.payment}>{order.payment}</div>
                    </div> 
                </>
                }
                
                
            </div>
            <div className={styles.left}>
                <div className={styles.time}>{order.time}</div>
                {order.type.title === undefined ? 
                    order.validUntil === 0 ? 
                    <Link href={{ pathname: '/user/1/purchase', query: {paymentType: 'اشتراک', title: 'عنوان'}}} passHref>
                        <Button>
                            تمدید
                        </Button>
                    </Link>
                    :<div className={styles.expiration}>{`${order.validUntil} روز اعتبار`}</div>
                :null
                }
            </div>
        </div>
    )
}