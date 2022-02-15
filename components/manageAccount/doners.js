import styles from 'styles/components/manageAccount/Doners.module.scss'
import DonerAvatar from 'assets/images/manage-account/doner.png'
import Star from 'assets/svg/common/star.svg'
import Image from 'next/image'

export default function Doners () {

    const doners = [
        {
            image: DonerAvatar,
            username: 'Mahdi Azad',
            rate: 3,
            income: 100
        },
        {
            image: DonerAvatar,
            username: 'Mahdi Azad',
            rate: 0,
            income: 0
        },
        {
            image: DonerAvatar,
            username: 'Mahdi Azad',
            rate: 5,
            income: 250
        },
        {
            image: DonerAvatar,
            username: 'Mahdi Azad',
            rate: 3,
            income: 100
        },
        {
            image: DonerAvatar,
            username: 'Mahdi Azad',
            rate: 5,
            income: 250
        },
        {
            image: DonerAvatar,
            username: 'Mahdi Azad',
            rate: 5,
            income: 100
        },
        {
            image: DonerAvatar,
            username: 'Mahdi Azad',
            rate: 1,
            income: 50
        },

    ]

    const showStars = (number) => {
        let stars = []
        for (var i = 0; i < number ; i ++) {
            stars.push(Star)
        }

        return stars
    }
    return (
        <>
        <div className={styles.box}>
            <div className={styles.content}>
                <div style={{textAlign: 'initial'}}>دنبال کننده</div>
                <div>حمایت</div>
                <div>درآمد زایی</div>
            </div>
        </div>

        {doners.map((doner, index) => {
            return (
                <div key={index} className={styles.doner}>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            <Image src={doner.image} alt=''/>
                        </div>
                        <div>{doner.username}</div>
                    </div>
                    <div className={styles.starContainer}>
                        {showStars(doner.rate).map((star, index) => {
                            return (
                                <Image key={index} src={star} alt=''/>
                            )
                        })}
                    </div>
                    <div className={styles.income}>
                        {`${doner.income} هزار تومان`}
                    </div>
                </div>
            )
        })}

        </>
    )
}