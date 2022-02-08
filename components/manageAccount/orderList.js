import styles from 'styles/components/manageAccount/OrderList.module.scss'
import OrderContainer from './orderContainer'
import SearchIcon from 'assets/svg/common/search.svg'
import MockUser from 'assets/images/contact/mock-avatar.png'
import Jamejam from 'assets/images/manage-account/jamejam.png'
import PostImage from 'assets/images/manage-account/post-image.png'
import Image from 'next/image'

export default function OrderList () {

    const orders = [
        {
            username: 'Ali Sahari',
            userAvatar: MockUser,
            type: 'اشتراک طلایی 3 ماهه',
            payment: '16 هزار تومان پرداخت از درگاه',
            time: '11 ساعت پیش',
            validUntil: 10
        },
        {
            username: 'Ali Sahari',
            userAvatar: MockUser,
            type: {
                title: 'مطالعات کارشناسی ارشد رنگ',
                image: PostImage
            },
            payment: '10 هزار تومان پرداخت از کیف پول',
            time: '11 ساعت پیش',
            validUntil: null
        },
        {
            username: 'جام جم',
            userAvatar: Jamejam,
            type: 'اشتراک طلایی 3 ماهه',
            payment: '16 هزار تومان پرداخت از درگاه',
            time: 'یک هفته پیش',
            validUntil: 20
        },
        {
            username: 'Ali Sahari',
            userAvatar: MockUser,
            type: 'اشتراک طلایی 3 ماهه',
            payment: '16 هزار تومان پرداخت از درگاه',
            time: '11 ساعت پیش',
            validUntil: 0
        },
        {
            username: 'Ali Sahari',
            userAvatar: MockUser,
            type: {
                title: 'مطالعات کارشناسی ارشد رنگ',
                image: PostImage
            },
            payment: '10 هزار تومان پرداخت از کیف پول',
            time: '11 ساعت پیش',
            validUntil: null
        },
        {
            username: 'جام جم',
            userAvatar: Jamejam,
            type: 'اشتراک طلایی 3 ماهه',
            payment: '16 هزار تومان پرداخت از درگاه',
            time: 'یک هفته پیش',
            validUntil: 0
        },
    ]
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <div className={styles.searchIcon}>
                    <Image src={SearchIcon} alt=""/>
                </div>
                <input className={styles.searchInput} placeholder='جستجو' />
            </div>
            {orders.map((order, index) => {
                return (
                    <OrderContainer key={index} order={order}/>
                )
            })}
        </div>
    )
}