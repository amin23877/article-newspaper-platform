import Link from 'next/link'
import Image from 'next/image'
import MockAvatar from 'assets/images/contact/mock-avatar.png'
import BronzePlan from 'assets/images/contact/bronze-plan.svg'
import SilverPlan from 'assets/images/contact/silver-plan.svg'
import GoldPlan from 'assets/images/contact/gold-plan.svg'
import styles from 'styles/pages/ContactUs.module.scss'
import Button from "components/common/button";
import {useRouter} from "next/router";
import {useUser} from "hooks/useUser";
import {useEffect} from "react";
import Instagram from "assets/svg/social-media/instagram-greeen-circle.svg";
import Twitter from "assets/svg/social-media/twitter-green-circle.svg";
import Facebook from "assets/svg/social-media/facebook-green-circle.svg";
import Linkedin from "assets/svg/social-media/linkedin-greeen-circle.svg";
import Dots from "assets/svg/common/dots.svg";
import cookie from "cookie";

export default function Index() {

    const [user, getUser, hasInitialized] = useUser()

    const memberships = [
        {
            title: 'اشتراک برنزی',
            image: BronzePlan,
            cost : '10 هزار تومان ماهیانه',
            subtitle: 'اشتراک عادی',
            features: ['مشاهده محتوا', 'نظرات']
        },
        {
            title: 'اشتراک نقره ای',
            image: SilverPlan,
            cost: '30 هزار تومان ماهیانه',
            subtitle: 'اشتراک معمولی',
            features: ['مشاهده محتوا', 'نظرات', 'اشتراک گذاری محتوا']
        },
        {
            title: 'اشتراک طلایی',
            image: GoldPlan,
            cost: '60 هزار تومان ماهیانه',
            subtitle: 'اشتراک VIP',
            features: ['مشاهده محتوا', 'نظرات', 'اشتراک گذاری محتوا', 'دانلود محتوا']
        }
    ]

    useEffect(() => {

        if (!hasInitialized)
            getUser()
        return
    })

    console.log(user)

    return (
        <div className={styles.profileContainer}>
            <div className={styles.headerContainer}>
                <div className={`${styles.buttonContainer} container`}>
                    <Button classes={styles.addContentButton}>
                        <Link href='/'>
                            <a>
                                <span>دنبال کردن</span>
                            </a>
                        </Link>
                    </Button>
                </div>
                <div className={styles.avatarContainer}>
                    <Image src={MockAvatar}/>
                </div>
            </div>
            <div className={styles.contentContainer}>
                {user ? 
                <>
                <div className={styles.name}>
                    {user.username ?? 'کاربر میهمان'}
                </div>
                <div className={styles.status}>
                    در حال ایجاد دوره های هنری، تصاویر و پادکست های آموزشی ویدیویی است
                </div>
                <div className={styles.title}>
                    انتخاب عضویت
                </div>
                </>
                :null
                }

                <div className={styles.membershipContainer}>
                    {memberships.map((membership => (
                        <div className={styles.membership}>
                            <div className={styles.membershipTitle}>
                                {membership.title}
                            </div>
                            <div className={styles.image}>
                                <Image src={membership.image}/>
                            </div>
                            <div className={styles.cost}>
                                {membership.cost}
                            </div>
                            <div className={styles.subtitle}>
                                {membership.subtitle}
                            </div>
                            <ul className={styles.features}>
                                {membership.features.map((feature => (
                                    <li>{feature}</li>
                                )))}
                            </ul>
                            <Button classes={styles.addContentButton}>
                                <Link href='/'>
                                    <a>
                                        <span>ملحق شوید</span>
                                    </a>
                                </Link>
                            </Button>
                        </div>
                    )))}
                </div>

                <div className={styles.followersSection}>
                    {user ? 
                    <span>{user.followersCount} نفر دنبال کننده</span>
                    :null
                    }

                    <div className={styles.social}>
                        <a href='https://google.com'>
                            <Image src={Instagram} alt=""/>
                        </a>
                        <a href='https://google.com'>
                            <Image src={Twitter} alt=""/>
                        </a>
                        <a href='https://google.com'>
                            <Image src={Facebook} alt=""/>
                        </a>
                        <a href='https://google.com'>
                            <Image src={Linkedin} alt=""/>
                        </a>
                    </div>
                </div>

                {user ?
                <div className={styles.bar}>
                    <div className={styles.user}>
                        <div className={styles.barImage}>
                            <Image src={MockAvatar}/>
                        </div>
                        <span>{user.username}</span>
                    </div>
                    <a href='https://google.com'>
                        <Image src={Dots} alt=""/>
                    </a>
                </div>
                :null
                }
        
            </div>
        </div>
    )
}


