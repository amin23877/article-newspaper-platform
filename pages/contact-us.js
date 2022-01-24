import Link from 'next/link'
import Image from 'next/image'
import MockAvatar from 'assets/images/contact/mock-avatar.png'
import BronzePlan from 'assets/images/contact/bronze-plan.svg'
import SilverPlan from 'assets/images/contact/silver-plan.svg'
import GoldPlan from 'assets/images/contact/gold-plan.svg'
import styles from 'styles/pages/ContactUs.module.scss'
import Card from "components/common/card";
import Accordion from "components/common/accordion";
import Categories from "components/homepage/categories";
import Button from "components/common/button";
import {useRouter} from "next/router";
import {useUser} from "hooks/useUser";
import {useEffect} from "react";
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
                            {/* <div className={`${styles.buttonContainer} container`}> */}
                                <Button classes={styles.addContentButton}>
                                    <Link href='/'>
                                        <a>
                                            <span>ملحق شوید</span>
                                        </a>
                                    </Link>
                                </Button>
                            {/* </div> */}
                        </div>
                    )))}
                </div>
        
            </div>
        </div>
    )
}


